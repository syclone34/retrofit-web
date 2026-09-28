import { Search, Globe, AlertTriangle } from 'lucide-react';

export default function ProspectingPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Search className="text-cyan-500" size={24} />
            </div>
            <h1 className="text-3xl font-bold">Prospecting Engine</h1>
          </div>
          <p className="text-secondary text-sm">Find small businesses without websites, or analyze current sites for speed flaws.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mt-4">
        {/* Missing Website Scanner */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary flex flex-col">
          <Globe className="text-primary mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">Missing Website Scanner</h3>
          <p className="text-secondary mb-6 text-sm">
            Scan Google Maps or local directories for contractors and small businesses that do not have a website listed. These are prime targets for a new build.
          </p>
          <div className="mt-auto space-y-4">
            <input type="text" placeholder="e.g. Plumbers in Minneapolis" className="w-full bg-black/20 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
            <button className="w-full bg-primary hover:bg-primary-dark transition-colors py-2 rounded-lg font-medium text-sm">Start Scan</button>
          </div>
        </div>

        {/* Speed & Mobile Flaw Analyzer */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-amber-500 flex flex-col">
          <AlertTriangle className="text-amber-500 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">Speed & UX Analyzer</h3>
          <p className="text-secondary mb-6 text-sm">
            Enter a competitor or prospect's URL. The engine will ping it for load speed, mobile responsiveness, and click-to-call buttons to generate a Rescue Score.
          </p>
          <div className="mt-auto space-y-4">
            <input type="text" placeholder="https://..." className="w-full bg-black/20 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors" />
            <button className="w-full bg-amber-500 hover:bg-amber-600 transition-colors text-black py-2 rounded-lg font-bold text-sm">Analyze Site</button>
          </div>
        </div>
      </div>
    </div>
  );
}
