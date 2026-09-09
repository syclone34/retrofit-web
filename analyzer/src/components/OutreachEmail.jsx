import React, { useState, useMemo } from 'react';
import { 
  Mail, Copy, Check, Send, Sparkles, Phone, ShieldCheck, 
  Clock, CheckCircle2, Zap, AlertCircle, Eye,
  HelpCircle, RefreshCw
} from 'lucide-react';

export default function OutreachEmail({
  clientName = '',
  setClientName,
  businessName = '',
  setBusinessName,
  email = '',
  setEmail,
  phone: _clientPhone = '',
  setPhone: _setClientPhone,
  url: _url = '',
  setUrl: _setUrl,
  mockupUrl: _mockupUrl = '',
  setMockupUrl: _setMockupUrl,
  packageType = 'rescue',
  selectedAudits = []
}) {
  // Outreach Strategy / Pitch Type
  const [strategy, setStrategy] = useState('getting-name-out'); // 'getting-name-out', 'mockup-visual', 'casual-intro', 'video-walkthrough', 'followup-3day', 'followup-7day'
  
  // Customization Toggles
  const [includePricing, setIncludePricing] = useState(true);
  const [includeGuarantee, setIncludeGuarantee] = useState(true);
  const [includeMobileFocus, setIncludeMobileFocus] = useState(true);

  // Sender details
  const [senderName, setSenderName] = useState('Cole Fuller');
  const [senderPhone, setSenderPhone] = useState('612-516-3145');
  const [senderCompany, setSenderCompany] = useState('RetroFit Web Design');
  const [senderLocation, setSenderLocation] = useState('the Twin Cities / Minnesota');

  // Copy status
  const [copyStatus, setCopyStatus] = useState(''); // 'all', 'subject', 'body'

  // Package Price & Name
  const packageDetails = useMemo(() => {
    if (packageType === 'new-build') {
      return { name: 'Brand New Website Build', price: '$499 flat rate', timeline: '3 to 5 days' };
    }
    if (packageType === 'overhaul') {
      return { name: 'Custom Site Overhaul', price: '$599 flat rate', timeline: '3 to 5 days' };
    }
    return { name: 'Website Rescue', price: '$299 flat rate', timeline: '48 to 72 hours' };
  }, [packageType]);

  // Generate dynamic email components based on strategy
  const emailDraft = useMemo(() => {
    const biz = businessName || '[Business Name]';
    const client = clientName || 'there';
    const priceSnippet = includePricing ? ` starting at a ${packageDetails.price}` : '';
    const timelineSnippet = includeGuarantee ? ` within ${packageDetails.timeline}` : '';
    const mobileSnippet = includeMobileFocus 
      ? 'Whether you need a quick website refresh, faster mobile load times with tap-to-call buttons, or a brand new site from scratch, ' 
      : 'Whether you are looking to refresh an existing website or need a brand new site built from the ground up, ';

    let subject = '';
    let body = '';

    switch (strategy) {
      case 'getting-name-out':
      default:
        subject = `quick hello from a local web developer (${biz})`;
        body = `Hi ${client},

My name is ${senderName} with ${senderCompany}—I'm a local website developer based right here in ${senderLocation}.

I'm currently trying to get my name out there in our local community, and I'm reaching out to local businesses to see if I can help you out with any of your web development needs.

${mobileSnippet}I specialize in building clean, fast-loading websites for local small businesses${priceSnippet}${timelineSnippet}—with zero monthly retainer traps, no tech headaches, and direct one-on-one communication with me.

If you don't need anything right now, no worries at all—please just keep me in mind if you or another small business you know is ever in need of a website that won't break the bank.

Wishing you and everyone at ${biz} continued success!

Best regards,

${senderName}
${senderCompany}
Direct / Text: ${senderPhone}`;
        break;

      case 'casual-intro':
        subject = `quick question from a local web developer`;
        body = `Hi ${client},

My name is ${senderName} with ${senderCompany} here in ${senderLocation}.

I'm trying to get my name out there and reaching out to local businesses to see if I can help you out with your web development needs.

I build fast, clean, mobile-friendly websites for local businesses${priceSnippet} with zero ongoing agency fees or hidden surprises.

If you're all set right now, no worries at all—please keep me in mind if a small business is in need of a website that won't break the bank!

Thanks for your time,

${senderName}
${senderCompany}
Direct / Text: ${senderPhone}`;
        break;

      case 'mockup-visual':
        subject = `quick intro & idea for ${biz} (local web developer)`;
        body = `Hi ${client},

My name is ${senderName}. I run a small, family-owned web development business right here in ${senderLocation} (${senderCompany}).

I'm working on getting my name out there locally, and I wanted to reach out to see if I can help you out with any of your web development needs at ${biz}.

Rather than just sending a sales pitch, I put together a quick, clean mobile preview showing what a modern, fast-loading, tap-to-call website could look like for your business.

We build dependable, high-converting websites for local businesses${priceSnippet}${timelineSnippet}—straightforward pricing, no complicated contracts, and personal local support.

Would you be open to me sending over the before-and-after preview so you can take a look? If not, no problem at all—please just keep me in mind if a small business is in need of a website that won't break the bank.

Warm regards,

${senderName}
${senderCompany}
Direct / Text: ${senderPhone}`;
        break;

      case 'video-walkthrough':
        subject = `quick hello & 60-second video idea for ${biz}`;
        body = `Hi ${client},

My name is ${senderName} with ${senderCompany}—I'm a local website developer here in ${senderLocation}.

I'm reaching out to local businesses to get my name out there and see if I can help you out with your web development or mobile layout needs.

I recorded a quick 60-second video sharing a couple of practical ideas that make it easier for local customers to find and call your business from their smartphones, alongside a working prototype.

I work directly with local trades and small businesses${priceSnippet}${timelineSnippet} with honest flat-rate pricing and personal support.

Mind if I send over the 60-second video? If you're happy with everything as-is, no worries whatsoever—just keep me in mind if a small business you know is ever in need of a website that won't break the bank.

Best,

${senderName}
${senderCompany}
Direct / Text: ${senderPhone}`;
        break;

      case 'followup-3day':
        subject = `Re: quick hello from a local web developer (${biz})`;
        body = `Hi ${client},

Hope your week is going great!

Just following up briefly on my note from a few days ago. I'm reaching out to fellow small businesses in the area to introduce my web development services and get my name out there.

If you ever need a hand modernizing your website, fixing mobile layouts, or building a fast new site${priceSnippet}, I'd be more than happy to help.

And if you're all set for now, absolutely no pressure! Please keep me in mind if you or another small business is ever in need of a website that won't break the bank.

Best,

${senderName}
${senderCompany}
Direct / Text: ${senderPhone}`;
        break;

      case 'followup-7day':
        subject = `staying in touch / ${biz}`;
        body = `Hi ${client},

I know how busy things get running ${biz} and taking care of your customers, so I won't take up any more of your time!

Just wanted to thank you for your time and let you know I'm always right here in the area if you ever need help with web development, domain updates, or mobile improvements down the road.
 
Even if you're completely set right now, please keep me in mind if you or another small business is ever in need of a website that won't break the bank.
 
Wishing you, your family, and everyone at ${biz} continued success and a great season ahead!

Warm regards,

${senderName}
${senderCompany}
Direct / Text: ${senderPhone}`;
        break;
    }

    return { subject, body };
  }, [
    strategy, clientName, businessName, includeMobileFocus,
    includePricing, includeGuarantee, packageDetails,
    senderName, senderCompany, senderPhone, senderLocation
  ]);

  const handleCopy = async (type = 'all') => {
    let textToCopy = '';
    if (type === 'subject') {
      textToCopy = emailDraft.subject;
    } else if (type === 'body') {
      textToCopy = emailDraft.body;
    } else {
      textToCopy = `Subject: ${emailDraft.subject}\n\n${emailDraft.body}`;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyStatus(type);
      setTimeout(() => setCopyStatus(''), 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleMailto = () => {
    const targetEmail = email || '';
    const subjectEncoded = encodeURIComponent(emailDraft.subject);
    const bodyEncoded = encodeURIComponent(emailDraft.body);
    window.open(`mailto:${targetEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`, '_self');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-zinc-900 dark:text-zinc-100 font-sans">
      
      {/* Side Panel Controls */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Strategy Selector Card */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" /> Outreach Strategy
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
              Neighborly Intro
            </span>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'getting-name-out',
                title: 'Getting My Name Out (Local Intro)',
                badge: 'Recommended',
                desc: 'Humble, neighborly message reaching out to see if you can help, or keep you in mind if a business needs a site that won\'t break the bank.'
              },
              {
                id: 'casual-intro',
                title: 'Short & Casual Intro',
                badge: 'Quick Read',
                desc: 'Ultra-concise 4-sentence neighborly note getting straight to the point.'
              },
              {
                id: 'mockup-visual',
                title: 'Local Intro + Free Mockup Offer',
                badge: 'High Interest',
                desc: 'Friendly introduction mentioning you created a fast mobile preview if they\'d like to see it.'
              },
              {
                id: 'video-walkthrough',
                title: 'Local Intro + 60s Video Offer',
                badge: 'High Reply',
                desc: 'Personal offer to share a 60-second screen recording with mobile layout ideas.'
              },
              {
                id: 'followup-3day',
                title: '3-Day Follow-Up (Gentle Bump)',
                badge: 'Polite',
                desc: 'Zero-pressure check-in asking to keep you in mind for future website needs.'
              },
              {
                id: 'followup-7day',
                title: '7-Day Final Check-In',
                badge: 'Keep In Mind',
                desc: 'Warm closeout wishing their team success and asking them to keep you in mind.'
              }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setStrategy(item.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex flex-col gap-1 ${
                  strategy === item.id
                    ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 text-blue-950 dark:text-blue-200 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    {strategy === item.id ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border border-zinc-400 dark:border-zinc-600 shrink-0" />
                    )}
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.badge === 'Recommended'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pl-5 leading-snug">
                  {item.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Spam-Shield & Deliverability Card */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" /> 100% Spam-Safe (Zero Links Mode)
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            All URLs and hyperlinks have been removed from these outreach templates. Unsolicited emails containing links are heavily penalized by Gmail, Outlook, and Yahoo spam filters.
          </p>
          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 rounded-lg text-[11px] text-emerald-900 dark:text-emerald-300 leading-relaxed space-y-1">
            <span className="font-bold block">💡 Best Practice Strategy:</span>
            <span>These templates use low-friction permission CTAs (e.g. <em>"Would you be open to me sending over the before/after preview?"</em>). Once a prospect replies, their mail provider automatically whitelists your address, allowing you to send your preview link safely.</span>
          </div>

          {/* Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors">
                Include Starting Price (<span className="font-bold text-emerald-600 dark:text-emerald-400">starting at a {packageDetails.price}</span>)
              </span>
              <input
                type="checkbox"
                checked={includePricing}
                onChange={(e) => setIncludePricing(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors">
                Include Speed Guarantee (<span className="font-semibold text-zinc-500">{packageDetails.timeline}</span>)
              </span>
              <input
                type="checkbox"
                checked={includeGuarantee}
                onChange={(e) => setIncludeGuarantee(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors">
                Highlight Mobile & Smartphone Tap-to-Call
              </span>
              <input
                type="checkbox"
                checked={includeMobileFocus}
                onChange={(e) => setIncludeMobileFocus(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Value-In-Advance Cold Outreach Best Practices Card */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/70 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl border border-emerald-200/80 dark:border-emerald-900/40 p-4 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300">
            <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Humble Local Outreach Tips
          </div>
          <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-500 font-bold">•</span>
              <span><strong>"Getting My Name Out":</strong> Framing your outreach as a local neighbor introducing yourself removes sales resistance and doesn't offend owners about their existing site.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-500 font-bold">•</span>
              <span><strong>"Keep me in mind":</strong> Giving them an easy out creates good will and often results in referrals to their friends and fellow local business owners.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-500 font-bold">•</span>
              <span><strong>"Won't break the bank":</strong> Small businesses fear $5,000+ agency quotes. Transparent flat rates ($299–$499) make reaching back out a no-brainer.</span>
            </li>
          </ul>
        </div>

        {/* Sender Profile Settings (Collapsible or compact) */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm space-y-3">
          <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Your Local Sender Signature
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-zinc-400 block mb-0.5">Your Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs text-zinc-800 dark:text-zinc-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-0.5">Direct Phone</label>
              <input
                type="text"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs text-zinc-800 dark:text-zinc-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-0.5">Company Name</label>
              <input
                type="text"
                value={senderCompany}
                onChange={(e) => setSenderCompany(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs text-zinc-800 dark:text-zinc-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-0.5">Local Area / Metro</label>
              <input
                type="text"
                value={senderLocation}
                onChange={(e) => setSenderLocation(e.target.value)}
                placeholder="the Twin Cities / Minnesota"
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs text-zinc-800 dark:text-zinc-200"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Email Display & Actions Column */}
      <div className="lg:col-span-7 flex flex-col h-[750px]">
        
        {/* Email Window Mockup */}
        <div className="flex-1 bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg flex flex-col overflow-hidden">
          
          {/* Header block of email client */}
          <div className="bg-zinc-50 dark:bg-[#0e0e12] border-b border-zinc-200 dark:border-zinc-800 px-5 py-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-zinc-400">
                  {strategy.toUpperCase()} PITCH
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-zinc-500">
              <span className="font-semibold text-zinc-400 w-14">To:</span>
              <span className="bg-zinc-200/70 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2 py-0.5 rounded font-mono text-[11px] max-w-sm truncate">
                {email ? `${clientName || 'Owner'} <${email}>` : '[No recipient configured]'}
              </span>
              {!email && (
                <span className="text-[10px] text-amber-500 italic ml-2">
                  (Configure email in Estimates tab)
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-zinc-500 border-t border-zinc-100 dark:border-zinc-900 pt-2">
              <div className="flex items-center gap-2 flex-1 mr-2 overflow-hidden">
                <span className="font-semibold text-zinc-400 w-14 shrink-0">Subject:</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold truncate">
                  {emailDraft.subject}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('subject')}
                className="text-[11px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 shrink-0 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
              >
                {copyStatus === 'subject' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                {copyStatus === 'subject' ? 'Copied' : 'Copy Subject'}
              </button>
            </div>
          </div>

          {/* Email Body text */}
          <div className="flex-1 p-6 overflow-y-auto font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap select-text selection:bg-blue-500 selection:text-white">
            {emailDraft.body}
          </div>

          {/* Action buttons bar */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0c0c0f] px-5 py-3.5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleCopy('body')}
              className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              {copyStatus === 'body' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-zinc-400" />}
              {copyStatus === 'body' ? 'Copied Body!' : 'Copy Body Only'}
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleCopy('all')}
                className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold py-2 px-4 rounded-lg text-xs transition-colors shadow-sm"
              >
                {copyStatus === 'all' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied Full Email!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-zinc-500" /> Copy Full Draft
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleMailto}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all shadow-sm active:scale-98"
              >
                <Send className="h-3.5 w-3.5" /> Send via Mail Client
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
