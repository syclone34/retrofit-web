import Link from 'next/link';
import { Home, Users, Settings, PlusCircle, Search } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 glass-panel border-r border-border/50 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold gradient-text mb-2">Client Hub</h1>
        <p className="text-xs text-secondary uppercase tracking-widest font-semibold">Command Center</p>
      </div>
      
      <nav className="flex-1 px-4 mt-6 space-y-2">
        <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-foreground transition-colors group">
          <Home size={18} className="text-secondary group-hover:text-primary transition-colors" />
          <span className="font-medium text-sm">Command Center</span>
        </Link>
        <Link href="/clients" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-foreground transition-colors group">
          <Users size={18} className="text-secondary group-hover:text-primary transition-colors" />
          <span className="font-medium text-sm">Client CRM</span>
        </Link>
        <Link href="/prospecting" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-foreground transition-colors group">
          <Search size={18} className="text-secondary group-hover:text-primary transition-colors" />
          <span className="font-medium text-sm">Prospecting</span>
        </Link>
        <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-foreground transition-colors group">
          <svg className="w-[18px] h-[18px] text-secondary group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <span className="font-medium text-sm text-[#308882]">Dashboard</span>
        </Link>
      </nav>
      
      <div className="p-4 mt-auto">
        <button className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl shadow-lg transition-colors">
          <PlusCircle size={18} />
          <span className="font-semibold text-sm">New Client</span>
        </button>
      </div>
    </div>
  );
}
