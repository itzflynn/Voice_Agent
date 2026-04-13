import { motion, AnimatePresence } from 'motion/react';
import { AgentState } from '../../hooks/useGeminiLive';

interface VoiceOrbProps {
  state: AgentState;
}

export function VoiceOrb({ state }: VoiceOrbProps) {
  const variants = {
    idle: {
      scale: [1, 1.02, 1],
      opacity: 0.5,
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    listening: {
      scale: [1, 1.1, 1],
      opacity: 0.8,
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    thinking: {
      rotate: 360,
      scale: [1, 0.95, 1],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    speaking: {
      scale: [1, 1.15, 1.05, 1.2, 1],
      opacity: 1,
      transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Background Glow */}
      <AnimatePresence>
        <motion.div
          key={state}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1.2 }}
          exit={{ opacity: 0, scale: 1.5 }}
          className={`absolute inset-0 rounded-full blur-2xl ${
            state === 'speaking' ? 'bg-blue-500' : 
            state === 'listening' ? 'bg-green-500' : 
            state === 'thinking' ? 'bg-purple-500' : 'bg-slate-500'
          }`}
        />
      </AnimatePresence>

      {/* Main Orb */}
      <motion.div
        variants={variants}
        animate={state}
        className={`relative w-24 h-24 rounded-full border-2 shadow-2xl flex items-center justify-center overflow-hidden ${
          state === 'speaking' ? 'border-blue-400 bg-blue-950/50' : 
          state === 'listening' ? 'border-green-400 bg-green-950/50' : 
          state === 'thinking' ? 'border-purple-400 bg-purple-950/50' : 'border-slate-400 bg-slate-900/50'
        }`}
      >
        {/* Inner Waveform Effect */}
        <div className="absolute inset-0 flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={state === 'speaking' || state === 'listening' ? {
                height: [8, 30, 15, 40, 8],
              } : { height: 8 }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
              className={`w-1 rounded-full ${
                state === 'speaking' ? 'bg-blue-400' : 
                state === 'listening' ? 'bg-green-400' : 'bg-slate-400'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
