import { motion } from 'motion/react';
import { VoiceWidget } from './components/VoiceWidget/VoiceWidget';
import { Toaster } from './components/ui/sonner';
import { ArrowRight, CheckCircle2, Globe2, Zap, Shield, BarChart3 } from 'lucide-react';
import { Button } from './components/ui/button';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      <Toaster position="top-center" richColors />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">A</div>
            <span className="text-xl font-bold text-white tracking-tight">ARIA<span className="text-blue-500">.AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>
          <Button variant="outline" className="border-slate-800 hover:bg-slate-900 text-blue-400">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-900/20 to-transparent -z-10" />
        
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Zap className="h-3 w-3" />
            Next-Gen Voice Intelligence
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]"
          >
            Human-Like Voice Agents <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">For Every Website</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Engage your visitors with Aria, the multilingual voice assistant that handles inquiries, captures leads, and provides expert support in real-time.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 text-lg rounded-xl">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-800 hover:bg-slate-900 text-blue-400 px-8 h-14 text-lg rounded-xl">
              Book a Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe2 className="h-6 w-6 text-blue-400" />,
                title: "Multilingual Support",
                desc: "Automatically detect and respond in 12+ languages including Tamil, Hindi, and Arabic."
              },
              {
                icon: <Zap className="h-6 w-6 text-yellow-400" />,
                title: "Real-time Interaction",
                desc: "Powered by Gemini 2.0 Flash Live for sub-second latency and natural conversation flow."
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-purple-400" />,
                title: "Lead Intelligence",
                desc: "Smartly extract business details and intent from voice conversations for your CRM."
              },
              {
                icon: <Shield className="h-6 w-6 text-green-400" />,
                title: "Enterprise Secure",
                desc: "Production-ready security with session management and encrypted data handling."
              },
              {
                icon: <CheckCircle2 className="h-6 w-6 text-blue-400" />,
                title: "Easy Integration",
                desc: "Embed Aria on any website with a single line of code or use our full-stack SDK."
              },
              {
                icon: <ArrowRight className="h-6 w-6 text-slate-400" />,
                title: "Custom Training",
                desc: "Upload your business docs and Aria becomes an expert on your products instantly."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-slate-800 bg-slate-950/50 hover:border-blue-500/50 transition-colors group"
              >
                <div className="mb-4 p-3 rounded-2xl bg-slate-900 w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to transform your visitor experience?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join 500+ businesses using Aria to automate support and drive sales with the power of AI voice.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-10 h-14 text-lg rounded-xl relative z-10">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-xs">A</div>
            <span className="font-bold text-white tracking-tight">ARIA.AI</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Aria Intelligence Inc. All rights reserved.</p>
          <div className="flex gap-6 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>

      {/* The Magic Voice Widget */}
      <VoiceWidget />
    </div>
  );
}
