import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UploadCloud, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react'

const features = [
  { icon: UploadCloud, title: "Secure Ingestion", desc: "Upload .txt or .md files. We chunk and embed them securely." },
  { icon: MessageSquare, title: "Instant Answers", desc: "Streamed responses powered by GPT-4o mini." },
  { icon: ShieldCheck, title: "Cited Sources", desc: "Every answer includes references to original documents." },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] -z-10" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Talk to your data with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Precision & Speed</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Production-ready RAG agent. Upload documents, ask questions, and get cited answers instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app" className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition flex items-center justify-center gap-2">
              Start Chatting <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
      <section className="w-full max-w-7xl px-4 py-20 grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition group">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600/20 group-hover:text-indigo-400 transition">
              <f.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-slate-400">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}