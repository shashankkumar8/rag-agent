import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Send, Upload, Loader2, FileText, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function ChatApp() {
  const [messages, setMessages] = useState<{role:string; content:string; sources?:any[]}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File|null>(null)
  const [uploading, setUploading] = useState(false)
  const bottom = useRef<HTMLDivElement>(null)

  useEffect(() => bottom.current?.scrollIntoView({behavior:'smooth'}), [messages])

  const handleUpload = async () => {
    if (!file) return
    const fd = new FormData(); fd.append('file', file)
    setUploading(true)
    try {
      const res = await fetch(`${API}/api/ingest`, {method:'POST', body:fd})
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMessages(m=>[...m, {role:'system', content:`✅ Successfully ingested ${data.chunks} chunks from **${file.name}**`}])
      setFile(null)
    } catch { 
      setMessages(m=>[...m, {role:'system', content:'❌ Upload failed. Ensure backend is running.'}]) 
    }
    setUploading(false)
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input
    setMessages(m=>[...m, {role:'user', content:userMsg}, {role:'assistant', content:'', sources:[]}])
    setInput(''); setLoading(true)

    try {
      const res = await fetch(`${API}/api/chat?query=${encodeURIComponent(userMsg)}`, {method:'POST'})
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const {done, value} = await reader.read()
        if (done) break
        buffer += decoder.decode(value, {stream:true})
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              setMessages(m => {
                const copy = [...m]
                const last = copy[copy.length-1]
                last.content += parsed.content
                if (parsed.sources) last.sources = parsed.sources
                return copy
              })
            } catch {}
          }
        }
      }
    } catch {
      setMessages(m=>[...m.slice(0,-1), {role:'assistant', content:'❌ Connection lost. Check backend.'}])
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-6 pr-2 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
            <FileText size={48} className="mb-4" />
            <p>Upload a document to start</p>
          </div>
        )}
        {messages.map((m,i)=>(
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-4 rounded-2xl text-base shadow-sm ${
              m.role==='user' ? 'bg-indigo-600 text-white rounded-br-none' : 
              m.role==='system' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800 w-full text-center text-sm' :
              'bg-slate-800 text-slate-200 rounded-bl-none'
            }`}>
              {m.role==='assistant' ? <ReactMarkdown className="prose prose-invert prose-sm">{m.content}</ReactMarkdown> : m.content}
              {m.sources && m.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-700/50">
                  <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {m.sources.map((s:any, idx:number) => (
                      <span key={idx} className="text-xs bg-slate-900 px-2 py-1 rounded border border-slate-700 text-slate-400">
                        {s.source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {loading && messages[messages.length-1]?.role === 'assistant' && messages[messages.length-1].content === '' && (
          <div className="flex justify-start"><div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none"><Loader2 className="animate-spin text-indigo-400" size={18}/></div></div>
        )}
        <div ref={bottom}/>
      </div>
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl">
        {file && (
          <div className="flex items-center justify-between mb-3 p-2 bg-slate-800 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <FileText size={16} /> {file.name}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-400"><Trash2 size={16}/></button>
              <button onClick={handleUpload} disabled={uploading} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold text-white disabled:opacity-50">
                {uploading ? '...' : 'INGEST'}
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <label className="cursor-pointer p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition">
            <Upload size={20}/>
            <input type="file" accept=".txt,.md" className="hidden" onChange={e=>setFile(e.target.files?.[0]||null)}/>
          </label>
          <input className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" 
            placeholder="Ask anything about your documents..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&handleSend()}/>
          <button onClick={handleSend} disabled={loading||!input.trim()} className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl text-white font-medium transition">
            <Send size={20}/>
          </button>
        </div>
      </div>
    </div>
  )
}