import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Sparkles, Moon, Sun, Search, FileText, ClipboardList, 
  History, Mail, Database, Save, Layers, Camera, CheckSquare, Globe2
} from 'lucide-react';
import WebAnalyzer from './components/WebAnalyzer';
import ProposalEstimator from './components/ProposalEstimator';
import LegalContract from './components/LegalContract';
import OutreachEmail from './components/OutreachEmail';
import HistoryTracker from './components/HistoryTracker';
import ClientDatabase from './components/ClientDatabase';
import AssetExtractor from './components/AssetExtractor';
import TeaserStudio from './components/TeaserStudio';
import ClientIntake from './components/ClientIntake';
import SeoStudio from './components/SeoStudio';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedAudits, setSelectedAudits] = useState([]);
  const [prefilledDomain, setPrefilledDomain] = useState('');

  // Lifted Client Details State
  const [activeClientId, setActiveClientId] = useState(null);
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');
  const [address, setAddress] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [mockupUrl, setMockupUrl] = useState('');

  // Lifted Project Scope Config
  const [pages, setPages] = useState(5);
  const [packageType, setPackageType] = useState('rescue'); // 'rescue', 'new-build', 'overhaul'
  const [bookingFeature, setBookingFeature] = useState(false);
  const [seoFeature, setSeoFeature] = useState(false);
  const [logoFeature, setLogoFeature] = useState(false);
  const [careFeature, setCareFeature] = useState(false);

  // Lifted Contract Specific Configurations
  const [depositPercent, setDepositPercent] = useState(50);
  const [timelineDays, setTimelineDays] = useState(14);
  const [warrantyDays, setWarrantyDays] = useState(30);
  const [jurisdictionState, setJurisdictionState] = useState('Minnesota');

  const [saveStatus, setSaveStatus] = useState('');

  // Handle theme switching
  useEffect(() => {
    const savedTheme = localStorage.getItem('retrofit_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;

    setDarkMode(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem('retrofit_theme', nextDark ? 'dark' : 'light');
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAddAuditToScope = (auditTitle) => {
    setSelectedAudits(prev =>
      prev.includes(auditTitle)
        ? prev.filter(t => t !== auditTitle)
        : [...prev, auditTitle]
    );
  };

  const handleSelectDomainFromHistory = (domain) => {
    setPrefilledDomain(domain);
    setUrl(domain);
    setActiveClientId(null);
    setAddress('');
    setClientNotes('');
    
    // Guess a business name from domain
    const guess = domain.split('.')[0]
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setBusinessName(guess);
    setActiveTab('analyzer');
  };

  const handleAuditCompleted = (normalizedUrl, resultData = {}) => {
    const plainDomain = normalizedUrl.replace(/^(https?:\/\/)?(www\.)?/i, '');
    setUrl(plainDomain);
    
    const { failedAudits = [], scrapedInfo = {} } = resultData;

    // Reset active database client context for new scan session
    setActiveClientId(null);
    setClientName(scrapedInfo.clientName || '');
    setEmail(scrapedInfo.email || '');
    setPhone(scrapedInfo.phone || '');
    setAddress(scrapedInfo.address || '');
    setClientNotes('');
    setMockupUrl('');
    
    // Auto-populate the scope with failed audits/test results
    setSelectedAudits(failedAudits.map(a => a.title));

    // Reset project scope config to defaults
    setPages(5);
    setBookingFeature(false);
    setSeoFeature(false);
    setLogoFeature(false);
    setCareFeature(false);

    // Reset contract specific configurations to defaults
    setDepositPercent(50);
    setTimelineDays(14);
    setWarrantyDays(30);
    setJurisdictionState('Minnesota');
    
    // Set company business name - use scraped, fallback to domain guess
    if (scrapedInfo.businessName) {
      setBusinessName(scrapedInfo.businessName);
    } else {
      const guess = plainDomain.split('.')[0]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setBusinessName(guess);
    }
  };

  // Auto-sync checks when new audits are selected
  const prevAuditsRef = useRef([]);

  useEffect(() => {
    const addedAudits = selectedAudits.filter(x => !prevAuditsRef.current.includes(x));
    if (addedAudits.length > 0) {
      const hasNewSeo = addedAudits.some(title => /seo|alt attributes|viewport|hsts|https redirect/i.test(title));
      if (hasNewSeo) setSeoFeature(true);
    }
    prevAuditsRef.current = selectedAudits;
  }, [selectedAudits]);

  // Save/Update Client in Database
  const handleSaveClient = async () => {
    if (!url) {
      alert('Please perform an audit scan or enter a website domain before saving.');
      return;
    }

    setSaveStatus('saving');
    try {
      const clientRecord = {
        id: activeClientId,
        clientName,
        businessName,
        email,
        phone,
        url,
        address,
        pages,
        packageType: packageType || 'rescue',
        bookingFeature: bookingFeature ? 1 : 0,
        seoFeature: seoFeature ? 1 : 0,
        logoFeature: logoFeature ? 1 : 0,
        careFeature: careFeature ? 1 : 0,
        depositPercent,
        timelineDays,
        warrantyDays,
        governingState: jurisdictionState,
        selectedAudits: JSON.stringify(selectedAudits),
        notes: clientNotes,
        mockupUrl
      };

      if (window.api && window.api.saveClient) {
        const saved = await window.api.saveClient(clientRecord);
        setActiveClientId(saved.id);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(''), 2000);
      } else {
        // Fallback to browser localStorage
        const localData = JSON.parse(localStorage.getItem('retrofit_clients') || '[]');
        let savedRecord = { ...clientRecord };
        
        let existingIndex = -1;
        if (savedRecord.id) {
          existingIndex = localData.findIndex(c => c.id === savedRecord.id);
        } else {
          existingIndex = localData.findIndex(c => c.url.toLowerCase() === savedRecord.url.toLowerCase());
        }

        if (existingIndex !== -1) {
          savedRecord.id = localData[existingIndex].id;
          savedRecord.createdAt = localData[existingIndex].createdAt || new Date().toISOString();
          localData[existingIndex] = savedRecord;
        } else {
          const maxId = localData.reduce((max, c) => (c.id > max ? c.id : max), 0);
          savedRecord.id = maxId + 1;
          savedRecord.createdAt = new Date().toISOString();
          localData.push(savedRecord);
        }

        localStorage.setItem('retrofit_clients', JSON.stringify(localData));
        setActiveClientId(savedRecord.id);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(''), 2000);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save client: ' + err.message);
      setSaveStatus('');
    }
  };

  const handleLoadProfile = (client) => {
    setActiveClientId(client.id);
    setClientName(client.clientName || '');
    setBusinessName(client.businessName || '');
    setEmail(client.email || '');
    setPhone(client.phone || '');
    setUrl(client.url || '');
    setAddress(client.address || '');
    setClientNotes(client.notes || '');
    setMockupUrl(client.mockupUrl || '');

    setPages(client.pages || 5);
    setPackageType(client.packageType || 'rescue');
    setBookingFeature(client.bookingFeature === 1);
    setSeoFeature(client.seoFeature === 1);
    setLogoFeature(client.logoFeature === 1);
    setCareFeature(client.careFeature === 1);

    setDepositPercent(client.depositPercent ?? 50);
    setTimelineDays(client.timelineDays ?? 14);
    setWarrantyDays(client.warrantyDays ?? 30);
    setJurisdictionState(client.governingState || 'Minnesota');

    try {
      const audits = client.selectedAudits
        ? (typeof client.selectedAudits === 'string' ? JSON.parse(client.selectedAudits) : client.selectedAudits)
        : [];
      setSelectedAudits(audits);
    } catch (err) {
      console.error(err);
      setSelectedAudits([]);
    }

    // Redirect to Proposal Estimator view once loaded
    setActiveTab('proposal');
  };

  const handleApplyClientData = (data) => {
    if (data.businessName) setBusinessName(data.businessName);
    if (data.url) setUrl(data.url);
    if (data.email) setEmail(data.email);
    if (data.phone) setPhone(data.phone);
    if (data.address) setAddress(data.address);
    if (data.clientNotes) {
      setClientNotes(prev => (prev ? `${prev}\n\n${data.clientNotes}` : data.clientNotes));
    }
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const handleSaveClientFromIntake = async (intakeData) => {
    handleApplyClientData(intakeData);
    const fullRecord = {
      id: activeClientId,
      clientName: clientName || intakeData.businessName,
      businessName: intakeData.businessName || businessName,
      email: intakeData.email || email,
      phone: intakeData.phone || phone,
      url: intakeData.url || url,
      address: intakeData.address || address,
      clientNotes: intakeData.clientNotes || clientNotes,
      mockupUrl,
      packageType,
      pages,
      bookingFeature,
      seoFeature,
      logoFeature,
      careFeature,
      selectedAudits: JSON.stringify(selectedAudits)
    };

    try {
      if (window.api && window.api.saveClient) {
        const saved = await window.api.saveClient(fullRecord);
        if (saved && saved.id) setActiveClientId(saved.id);
      }
    } catch (err) {
      console.error('Error auto-saving client from intake:', err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">

      {/* Header Shell */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] sticky top-0 z-30 no-print">
        <div className="max-w-[1440px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight flex items-center gap-2">
                RetroFit Web Design Suite
                <span className="text-[10px] font-bold uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" /> Pro Agency Suite
                </span>
              </h1>
              <p className="text-[11px] text-zinc-500">Website Rescue, Asset Extraction, Teasers, SEO & Contract Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {url && (
              <button
                onClick={handleSaveClient}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm ${
                  saveStatus === 'success'
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : saveStatus === 'saving'
                    ? 'bg-zinc-100 dark:bg-zinc-850 text-zinc-400 border-zinc-200 dark:border-zinc-800 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 hover:border-blue-600'
                }`}
                disabled={saveStatus === 'saving'}
              >
                <Save className="h-3.5 w-3.5" />
                {saveStatus === 'success' ? 'Profile Saved!' : saveStatus === 'saving' ? 'Saving...' : 'Save Client Profile'}
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title="Toggle theme mode"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">

        {/* Navigation Tabs bar - Clean segmented pill bar with no ugly scrollbars */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl mb-8 no-print no-scrollbar">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'analyzer'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Search className="h-3.5 w-3.5" /> Site Audit
          </button>

          <button
            onClick={() => setActiveTab('extractor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'extractor'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Layers className="h-3.5 w-3.5" /> Asset Extractor
          </button>

          <button
            onClick={() => setActiveTab('teaser')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'teaser'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Camera className="h-3.5 w-3.5" /> Teaser Studio
          </button>

          <button
            onClick={() => setActiveTab('intake')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'intake'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <ClipboardList className="h-3.5 w-3.5" /> Client Intake
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'seo'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Globe2 className="h-3.5 w-3.5" /> SEO & Schema
          </button>
          
          <button
            onClick={() => setActiveTab('proposal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'proposal'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <FileText className="h-3.5 w-3.5" /> Proposal
            {selectedAudits.length > 0 && (
              <span className="h-4.5 w-4.5 px-1 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {selectedAudits.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('contract')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'contract'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" /> Contract
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'email'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Mail className="h-3.5 w-3.5" /> Outreach Email
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Database className="h-3.5 w-3.5" /> Client CRM
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/80 dark:border-zinc-700/60'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
            }`}
          >
            <History className="h-3.5 w-3.5" /> History
          </button>
        </div>

        {/* Tab View Switcher */}
        <div className="animate-fade-in">
          {activeTab === 'analyzer' && (
            <WebAnalyzer
              onAddAuditToScope={handleAddAuditToScope}
              selectedAudits={selectedAudits}
              prefilledUrl={prefilledDomain}
              clearPrefilled={() => setPrefilledDomain('')}
              onAuditCompleted={handleAuditCompleted}
            />
          )}

          {activeTab === 'extractor' && (
            <AssetExtractor
              currentDomain={url}
              onApplyClientData={handleApplyClientData}
              darkMode={darkMode}
            />
          )}

          {activeTab === 'teaser' && (
            <TeaserStudio
              currentDomain={url}
              businessName={businessName}
              darkMode={darkMode}
            />
          )}

          {activeTab === 'intake' && (
            <ClientIntake
              activeClient={{
                businessName,
                url,
                phone,
                email,
                address
              }}
              onSaveToDatabase={handleSaveClientFromIntake}
              darkMode={darkMode}
            />
          )}

          {activeTab === 'seo' && (
            <SeoStudio
              currentDomain={url}
              businessName={businessName}
              phone={phone}
              email={email}
              address={address}
              darkMode={darkMode}
            />
          )}

          {activeTab === 'proposal' && (
            <ProposalEstimator
              selectedAudits={selectedAudits}
              clientName={clientName}
              setClientName={setClientName}
              businessName={businessName}
              setBusinessName={setBusinessName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              url={url}
              setUrl={setUrl}
              address={address}
              setAddress={setAddress}
              pages={pages}
              setPages={setPages}
              packageType={packageType}
              setPackageType={setPackageType}
              bookingFeature={bookingFeature}
              setBookingFeature={setBookingFeature}
              seoFeature={seoFeature}
              setSeoFeature={setSeoFeature}
              logoFeature={logoFeature}
              setLogoFeature={setLogoFeature}
              careFeature={careFeature}
              setCareFeature={setCareFeature}
            />
          )}

          {activeTab === 'contract' && (
            <LegalContract
              selectedAudits={selectedAudits}
              clientName={clientName}
              setClientName={setClientName}
              businessName={businessName}
              setBusinessName={setBusinessName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              url={url}
              setUrl={setUrl}
              address={address}
              setAddress={setAddress}
              pages={pages}
              setPages={setPages}
              packageType={packageType}
              setPackageType={setPackageType}
              bookingFeature={bookingFeature}
              setBookingFeature={setBookingFeature}
              seoFeature={seoFeature}
              setSeoFeature={setSeoFeature}
              logoFeature={logoFeature}
              setLogoFeature={setLogoFeature}
              careFeature={careFeature}
              setCareFeature={setCareFeature}
              depositPercent={depositPercent}
              setDepositPercent={setDepositPercent}
              timelineDays={timelineDays}
              setTimelineDays={setTimelineDays}
              warrantyDays={warrantyDays}
              setWarrantyDays={setWarrantyDays}
              jurisdictionState={jurisdictionState}
              setJurisdictionState={setJurisdictionState}
            />
          )}

          {activeTab === 'email' && (
            <OutreachEmail
              clientName={clientName}
              setClientName={setClientName}
              businessName={businessName}
              setBusinessName={setBusinessName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              url={url}
              setUrl={setUrl}
              mockupUrl={mockupUrl}
              setMockupUrl={setMockupUrl}
              packageType={packageType}
              selectedAudits={selectedAudits}
            />
          )}

          {activeTab === 'history' && (
            <HistoryTracker
              onSelectDomain={handleSelectDomainFromHistory}
            />
          )}

          {activeTab === 'database' && (
            <ClientDatabase
              onLoadProfile={handleLoadProfile}
            />
          )}
        </div>

      </main>

    </div>
  );
}
