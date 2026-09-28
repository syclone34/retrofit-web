import { getLeads } from '@/lib/db';
import ClientList from './ClientList';
import { Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
  const leads = getLeads();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-bold">Client CRM</h1>
          </div>
          <p className="text-secondary text-sm">Select multiple clients, bulk edit, and manage your pipeline safely.</p>
        </div>
      </div>
      
      <div className="flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col">
        <ClientList initialLeads={leads} />
      </div>
    </div>
  );
}
