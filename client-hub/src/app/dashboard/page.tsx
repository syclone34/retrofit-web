import DashboardClient from './DashboardClient';
import { getLeads, getAnalytics } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function RealDashboardPage() {
  // Fetch real data from the SQLite database
  let leads = [];
  let analytics = [];
  try {
    leads = getLeads();
    analytics = getAnalytics();
  } catch (error) {
    console.error("Failed to load data from DB:", error);
  }

  // Render the client component, passing down the real data
  return <DashboardClient initialLeads={leads} analyticsData={analytics} />;
}
