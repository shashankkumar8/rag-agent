import { Link, useLocation } from 'react-router-dom'
import { Bot, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">RAG Agent</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className={`text-sm font-medium ${location.pathname === '/' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'} transition`}>Home</Link>
              <Link to="/app" className={`text-sm font-medium ${location.pathname === '/app' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'} transition`}>Launch App</Link>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-400">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Home</Link>
              <Link to="/app" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Launch App</Link>
            </div>
          </div>
        )}
      </nav>
      <main className="flex-grow">{children}</main>
      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 RAG Agent. Built with FastAPI, Qdrant & React.</p>
        </div>
      </footer>
    </div>
  )
}