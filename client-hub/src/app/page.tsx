import { BarChart3, Users, Zap, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">RetroFit Command Center</h1>
          <p className="text-secondary text-lg">Your website doesn't need a rebuild — it needs a rescue.</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/clients" className="glass-panel px-6 py-2.5 rounded-xl font-medium text-sm hover-glow flex items-center space-x-2 text-primary">
            <Users size={16} />
            <span>Manage Clients</span>
          </Link>
          <Link href="/prospecting" className="bg-primary hover:bg-primary-dark transition-colors px-6 py-2.5 rounded-xl font-medium text-sm text-white flex items-center space-x-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Zap size={16} />
            <span>Find Prospects</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total Tracked Leads', value: '1,248', icon: Users, color: 'text-blue-400' },
          { label: 'Pitched Outreaches', value: '342', icon: Mail, color: 'text-cyan-400' },
          { label: 'Prime Targets (Score ≥70)', value: '89', icon: Zap, color: 'text-amber-400' },
          { label: 'Rescue Package Offer', value: '$299', icon: BarChart3, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
              <stat.icon size={64} />
            </div>
            <p className="text-sm text-secondary font-medium mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="glass-panel p-8 rounded-2xl flex flex-col items-start border-l-4 border-l-primary hover-glow">
          <div className="p-3 bg-primary/10 rounded-xl mb-4">
            <Users className="text-primary" size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Robust Client CRM</h3>
          <p className="text-secondary mb-6 leading-relaxed">
            Manage your entire pipeline safely. Select multiple records for batch actions, edit details instantly via side-panels, and track outreach status without slow page reloads.
          </p>
          <Link href="/clients" className="mt-auto flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
            Open Client CRM <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="glass-panel p-8 rounded-2xl flex flex-col items-start border-l-4 border-l-cyan-500 hover-glow">
          <div className="p-3 bg-cyan-500/10 rounded-xl mb-4">
            <Search className="text-cyan-500" size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Prospecting Engine</h3>
          <p className="text-secondary mb-6 leading-relaxed">
            Instantly identify local businesses with missing or painfully slow websites. Harvest direct leads that are perfectly primed for the $299 Rescue Package.
          </p>
          <Link href="/prospecting" className="mt-auto flex items-center text-cyan-500 font-medium hover:text-cyan-600 transition-colors">
            Start Prospecting <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
      
    </div>
  );
}

// Just for icon typing in the block above
import { Search } from 'lucide-react';
