import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, PhoneOff, MessageSquare, X, Globe, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { VoiceOrb } from './VoiceOrb';
import { TranscriptView } from './TranscriptView';
import { LeadCaptureForm } from './LeadCaptureForm';
import { useGeminiLive } from '../../hooks/useGeminiLive';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'Tamil' },
  { code: 'hi', name: 'Hindi' },
  { code: 'te', name: 'Telugu' },
  { code: 'ar', name: 'Arabic' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'id', name: 'Indonesian' },
];

export function VoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [transcripts, setTranscripts] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const onTranscriptUpdate = useCallback((newTranscript: { role: 'user' | 'model', text: string }) => {
    setTranscripts(prev => [...prev, newTranscript]);
  }, []);

  const { connectionState, agentState, error, connect, disconnect } = useGeminiLive({
    apiKey: process.env.GEMINI_API_KEY || '',
    onTranscriptUpdate
  });

  const toggleWidget = () => {
    if (isOpen && connectionState === 'connected') {
      disconnect();
    }
    setIsOpen(!isOpen);
    setShowLeadForm(false);
  };

  const startCall = () => {
    connect();
  };

  const endCall = () => {
    disconnect();
    setTranscripts([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Main Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[320px] max-w-[90vw] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-bottom border-slate-800 bg-slate-900/50 p-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  {connectionState === 'connected' && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-green-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Aria</h3>
                  <p className="text-[10px] text-slate-400">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="h-7 w-[90px] bg-slate-800 border-slate-700 text-[10px] px-2">
                    <Globe className="h-2.5 w-2.5 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang.code} value={lang.code} className="text-xs">{lang.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={toggleWidget} className="h-7 w-7 text-slate-400 hover:text-white">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4">
              {showLeadForm ? (
                <div className="space-y-4">
                  <LeadCaptureForm />
                  <Button variant="ghost" className="w-full text-slate-400" onClick={() => setShowLeadForm(false)}>
                    Back to Conversation
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  {connectionState === 'idle' || connectionState === 'error' ? (
                    <div className="flex flex-col items-center gap-4 py-6 text-center">
                      <div className="h-16 w-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                        <Mic className="h-6 w-6 text-slate-600" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-medium text-white">Ready to talk?</h4>
                        <p className="text-xs text-slate-400 max-w-[200px]">
                          Start a voice conversation with Aria to get instant business insights.
                        </p>
                      </div>
                      {error && (
                        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-2 text-[10px] text-red-400 border border-red-500/20">
                          <AlertCircle className="h-3 w-3" />
                          {error}
                        </div>
                      )}
                      <Button onClick={startCall} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 text-base">
                        Start Conversation
                      </Button>
                    </div>
                  ) : connectionState === 'connecting' ? (
                    <div className="flex flex-col items-center gap-4 py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                      <p className="text-xs text-slate-400 animate-pulse">Connecting to Aria...</p>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="flex justify-center">
                        <VoiceOrb state={agentState} />
                      </div>
                      
                      <div className="flex justify-center">
                        <Badge variant="outline" className="bg-slate-900/50 border-slate-800 text-slate-400 capitalize text-[10px] px-2 py-0">
                          {agentState}
                        </Badge>
                      </div>

                      <TranscriptView messages={transcripts} />

                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="flex-1 border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 h-9 text-xs" onClick={() => setShowLeadForm(true)}>
                          <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                          Inquiry
                        </Button>
                        <Button variant="destructive" className="flex-1 rounded-xl h-9 text-xs" onClick={endCall}>
                          <PhoneOff className="h-3.5 w-3.5 mr-1.5" />
                          End Call
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-slate-900/30 p-3 text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                Powered by Gemini 2.0 Flash Live
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleWidget}
        className={`group relative flex h-12 w-12 items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-blue-600 text-white'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <Mic className="h-6 w-6" />
            <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-sm group-hover:bg-blue-500/30" />
            {/* Pulse effect when idle */}
            {!isOpen && (
              <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/20" />
            )}
          </>
        )}
      </motion.button>
    </div>
  );
}
