import { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { SYSTEM_PROMPT } from '../prompts/system-prompt';
import { floatTo16BitPCM, arrayBufferToBase64, base64ToArrayBuffer } from '../lib/audio-utils';

export type ConnectionState = 'idle' | 'connecting' | 'connected' | 'error' | 'reconnecting';
export type AgentState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface UseGeminiLiveProps {
  apiKey: string;
  onTranscriptUpdate?: (transcript: { role: 'user' | 'model', text: string }) => void;
}

export function useGeminiLive({ apiKey, onTranscriptUpdate }: UseGeminiLiveProps) {
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
  const [agentState, setAgentState] = useState<AgentState>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const aiRef = useRef<any>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);

  const stopAudio = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  const playNextInQueue = useCallback(async () => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current) return;
    
    isPlayingRef.current = true;
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    const chunk = audioQueueRef.current.shift()!;
    const audioBuffer = audioContext.createBuffer(1, chunk.length, 24000);
    audioBuffer.getChannelData(0).set(chunk);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    
    source.onended = () => {
      isPlayingRef.current = false;
      playNextInQueue();
    };
    
    source.start();
  }, []);

  const connect = useCallback(async () => {
    try {
      setConnectionState('connecting');
      setError(null);

      if (!aiRef.current) {
        aiRef.current = new GoogleGenAI({ apiKey });
      }

      const sessionPromise = aiRef.current.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: SYSTEM_PROMPT,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: async () => {
            setConnectionState('connected');
            setAgentState('idle');
            
            // Setup Audio
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
            processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmData = floatTo16BitPCM(inputData);
              const base64Data = arrayBufferToBase64(pcmData);
              
              sessionRef.current?.sendRealtimeInput({
                audio: { data: base64Data, mimeType: 'audio/pcm;rate=24000' }
              });
            };
            
            source.connect(processorRef.current);
            processorRef.current.connect(audioContextRef.current.destination);

            // Trigger initial greeting
            sessionRef.current?.sendRealtimeInput({
              text: "Hello Aria, please introduce yourself and greet the user."
            });
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const arrayBuffer = base64ToArrayBuffer(base64Audio);
              const float32Data = new Float32Array(arrayBuffer.byteLength / 2);
              const view = new DataView(arrayBuffer);
              for (let i = 0; i < float32Data.length; i++) {
                float32Data[i] = view.getInt16(i * 2, true) / 0x8000;
              }
              audioQueueRef.current.push(float32Data);
              playNextInQueue();
              setAgentState('speaking');
            }

            // Handle Transcripts
            if (message.serverContent?.modelTurn?.parts[0]?.text) {
              onTranscriptUpdate?.({ role: 'model', text: message.serverContent.modelTurn.parts[0].text });
            }

            // Handle Interruption
            if (message.serverContent?.interrupted) {
              audioQueueRef.current = [];
              isPlayingRef.current = false;
              setAgentState('listening');
            }

            // Update Agent State based on server content
            if (message.serverContent?.turnComplete) {
              setAgentState('listening');
            }
          },
          onerror: (err: any) => {
            console.error('Live API Error:', err);
            setError('Connection error. Please try again.');
            setConnectionState('error');
          },
          onclose: () => {
            setConnectionState('idle');
            stopAudio();
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error('Failed to connect:', err);
      setError(err.message || 'Failed to connect to Aria.');
      setConnectionState('error');
    }
  }, [apiKey, onTranscriptUpdate, playNextInQueue, stopAudio]);

  const disconnect = useCallback(() => {
    sessionRef.current?.close();
    stopAudio();
    setConnectionState('idle');
    setAgentState('idle');
  }, [stopAudio]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connectionState,
    agentState,
    error,
    connect,
    disconnect
  };
}
