import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Sliders, Smartphone, Monitor, Download, Copy, Check, 
  Sparkles, AlertTriangle, CheckCircle2, RefreshCw, Upload, Image as ImageIcon, Zap
} from 'lucide-react';

export default function TeaserStudio({ 
  currentDomain, 
  businessName: initialBusinessName,
  darkMode 
}) {
  const [businessName, setBusinessName] = useState(initialBusinessName || 'Local Service Pro');
  const [targetDomain, setTargetDomain] = useState(currentDomain || '');
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side', 'slider', 'devices'
  const [deviceType, setDeviceType] = useState('desktop'); // 'desktop', 'mobile'

  // Image states (data URLs or URLs)
  const [beforeImage, setBeforeImage] = useState('https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=75');
  const [afterImage, setAfterImage] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=75');

  // Slider position (percentage)
  const [sliderPos, setSliderPos] = useState(50);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureMsg, setCaptureMsg] = useState('');
  const [copiedStatus, setCopiedStatus] = useState('');

  // Badges state
  const [beforeBadges, setBeforeBadges] = useState([
    '❌ Broken Mobile Menu',
    '❌ 8.4s Slow Load Time',
    '❌ Missing Tap-to-Call'
  ]);
  const [afterBadges, setAfterBadges] = useState([
    '⚡ 98 Google Speed Score',
    '📱 100% Mobile Responsive',
    '📞 Instant Click-To-Call Hero'
  ]);
  const [beforeScore, setBeforeScore] = useState(34);
  const [afterScore, setAfterScore] = useState(98);

  const canvasRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleSliderMouseDown = (e) => {
    e.preventDefault();
    setIsDraggingSlider(true);
    handleSliderMove(e.clientX);
  };

  const handleSliderTouchStart = (e) => {
    setIsDraggingSlider(true);
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDraggingSlider) {
        handleSliderMove(e.clientX);
      }
    };
    const handleGlobalTouchMove = (e) => {
      if (isDraggingSlider && e.touches && e.touches[0]) {
        handleSliderMove(e.touches[0].clientX);
      }
    };
    const handleGlobalMouseUp = () => {
      if (isDraggingSlider) {
        setIsDraggingSlider(false);
      }
    };

    if (isDraggingSlider) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove);
      window.addEventListener('touchend', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDraggingSlider]);

  useEffect(() => {
    if (initialBusinessName) {
      setBusinessName(initialBusinessName);
    }
  }, [initialBusinessName]);

  useEffect(() => {
    if (currentDomain) {
      setTargetDomain(currentDomain);
    }
  }, [currentDomain]);

  // Handle live URL screenshot capture via Electron IPC
  const handleCaptureLive = async (isBefore = true) => {
    if (!targetDomain.trim()) return;
    if (!window.api || !window.api.captureUrl) {
      setCaptureMsg('Live screenshot capture requires the desktop Electron app.');
      return;
    }

    setIsCapturing(true);
    setCaptureMsg(`Capturing ${deviceType} screenshot of ${targetDomain}...`);
    try {
      const isMobile = deviceType === 'mobile';
      const width = isMobile ? 390 : 1440;
      const height = isMobile ? 844 : 900;
      const dataUrl = await window.api.captureUrl({ url: targetDomain, width, height, mobile: isMobile });
      if (isBefore) {
        setBeforeImage(dataUrl);
      } else {
        setAfterImage(dataUrl);
      }
      setCaptureMsg('Captured successfully!');
      setTimeout(() => setCaptureMsg(''), 2500);
    } catch (err) {
      console.error(err);
      setCaptureMsg(`Capture failed: ${err.message || 'Check domain'}`);
    } finally {
      setIsCapturing(false);
    }
  };

  // Handle local file uploads
  const handleFileUpload = (e, isBefore = true) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (isBefore) {
        setBeforeImage(ev.target.result);
      } else {
        setAfterImage(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Export high-res PNG teaser via Canvas
  const generateCanvasTeaser = () => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) return resolve(null);
      const ctx = canvas.getContext('2d');
      const width = 1600;
      const height = 900;
      canvas.width = width;
      canvas.height = height;

      // Dark modern background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#09090b');
      bgGrad.addColorStop(1, '#18181b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Top Header
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 38px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`${businessName} — Website Rescue Transformation`, 60, 70);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '20px sans-serif';
      ctx.fillText(`Target Domain: ${targetDomain || 'clientdomain.com'}  •  48-Hour Rapid Modernization Sprint`, 60, 105);

      // Load images and draw side by side
      const imgBefore = new Image();
      imgBefore.crossOrigin = 'anonymous';
      const imgAfter = new Image();
      imgAfter.crossOrigin = 'anonymous';

      let loadedCount = 0;
      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === 2) {
          // Draw Left Card (Before)
          const cardW = 710;
          const cardH = 680;
          const cardY = 140;

          // Before Card Container
          ctx.fillStyle = '#141417';
          ctx.strokeStyle = '#27272a';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(60, cardY, cardW, cardH, 16);
          ctx.fill();
          ctx.stroke();

          // Before Image Preview
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(80, cardY + 70, cardW - 40, 420, 10);
          ctx.clip();
          ctx.drawImage(imgBefore, 80, cardY + 70, cardW - 40, 420);
          ctx.restore();

          // Before Header Bar
          ctx.fillStyle = '#ef4444';
          ctx.font = 'bold 22px sans-serif';
          ctx.fillText('❌ BEFORE: Outdated & Slow', 80, cardY + 45);

          // Before Score Badge
          ctx.fillStyle = '#7f1d1d';
          ctx.beginPath();
          ctx.roundRect(cardW - 120, cardY + 20, 120, 36, 18);
          ctx.fill();
          ctx.fillStyle = '#fca5a5';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText(`Score: ${beforeScore}/100`, cardW - 105, cardY + 44);

          // Before Badges
          let badgeX = 80;
          let badgeY = cardY + 530;
          beforeBadges.forEach((b) => {
            ctx.fillStyle = '#27272a';
            ctx.beginPath();
            ctx.roundRect(badgeX, badgeY, ctx.measureText(b).width + 30, 32, 8);
            ctx.fill();
            ctx.fillStyle = '#f87171';
            ctx.font = '14px sans-serif';
            ctx.fillText(b, badgeX + 15, badgeY + 21);
            badgeX += ctx.measureText(b).width + 45;
          });

          // Draw Right Card (After)
          const afterX = 830;

          ctx.fillStyle = '#141417';
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(afterX, cardY, cardW, cardH, 16);
          ctx.fill();
          ctx.stroke();

          // After Image Preview
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(afterX + 20, cardY + 70, cardW - 40, 420, 10);
          ctx.clip();
          ctx.drawImage(imgAfter, afterX + 20, cardY + 70, cardW - 40, 420);
          ctx.restore();

          // After Header Bar
          ctx.fillStyle = '#10b981';
          ctx.font = 'bold 22px sans-serif';
          ctx.fillText('✅ AFTER: RetroFit Modernized Rescue', afterX + 20, cardY + 45);

          // After Score Badge
          ctx.fillStyle = '#064e3b';
          ctx.beginPath();
          ctx.roundRect(afterX + cardW - 140, cardY + 20, 120, 36, 18);
          ctx.fill();
          ctx.fillStyle = '#6ee7b7';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText(`Score: ${afterScore}/100`, afterX + cardW - 125, cardY + 44);

          // After Badges
          let aBadgeX = afterX + 20;
          afterBadges.forEach((b) => {
            ctx.fillStyle = '#0f291e';
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(aBadgeX, badgeY, ctx.measureText(b).width + 30, 32, 8);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#34d399';
            ctx.font = '14px sans-serif';
            ctx.fillText(b, aBadgeX + 15, badgeY + 21);
            aBadgeX += ctx.measureText(b).width + 45;
          });

          // Bottom Offer Strip
          ctx.fillStyle = '#4f46e5';
          ctx.beginPath();
          ctx.roundRect(afterX + 20, cardY + 600, cardW - 40, 50, 10);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 18px sans-serif';
          ctx.fillText('🚀 $299 Website Rescue  •  48-72h Guaranteed Turnaround  •  $49/mo Care', afterX + 50, cardY + 632);

          resolve(canvas.toDataURL('image/png'));
        }
      };

      imgBefore.onload = onImageLoad;
      imgAfter.onload = onImageLoad;
      imgBefore.onerror = onImageLoad;
      imgAfter.onerror = onImageLoad;
      imgBefore.src = beforeImage;
      imgAfter.src = afterImage;
    });
  };

  const handleDownloadTeaser = async () => {
    const dataUrl = await generateCanvasTeaser();
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `${businessName.toLowerCase().replace(/\s+/g, '-')}-website-rescue-teaser.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopyTeaser = async () => {
    const dataUrl = await generateCanvasTeaser();
    if (!dataUrl) return;
    try {
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopiedStatus('Copied image to clipboard!');
      setTimeout(() => setCopiedStatus(''), 2500);
    } catch {
      handleDownloadTeaser();
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden Canvas for High Res Rendering */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Controls Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-500" />
              Before & After Teaser & Mockup Studio
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Generate persuasive visual comparison graphics, interactive drag sliders, and device frames for your cold pitch emails.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyTeaser}
              className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors"
            >
              {copiedStatus ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copiedStatus || 'Copy Teaser Graphic'}
            </button>
            <button
              onClick={handleDownloadTeaser}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PNG Teaser
            </button>
          </div>
        </div>

        {/* Configuration Row */}
        <div className="space-y-4 mt-5">
          {/* Inputs Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Client / Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Acme Plumbing Co."
                className="w-full mt-1.5 px-3.5 py-2 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Target Website Domain</label>
              <input
                type="text"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                placeholder="acmeplumbing.com"
                className="w-full mt-1.5 px-3.5 py-2 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Controls Bar: Layout Mode & Viewport */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80">
            {/* Preview Layout Mode */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 whitespace-nowrap">Preview Layout:</span>
              <div className="inline-flex p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700/80 gap-1">
                {[
                  { id: 'side-by-side', label: 'Side-by-Side', icon: Monitor },
                  { id: 'slider', label: 'Drag Slider', icon: Sliders },
                  { id: 'devices', label: 'Device Frames', icon: Smartphone }
                ].map(m => {
                  const Icon = m.icon;
                  const active = viewMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setViewMode(m.id)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                        active
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-700/50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Viewport Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 whitespace-nowrap">Device Viewport:</span>
              <div className="inline-flex p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700/80 gap-1">
                <button
                  type="button"
                  onClick={() => setDeviceType('desktop')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    deviceType === 'desktop'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 shrink-0" /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceType('mobile')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    deviceType === 'mobile'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 shrink-0" /> Mobile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Capture Action & Status */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCaptureLive(true)}
              disabled={isCapturing || !targetDomain}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 disabled:opacity-50 transition-colors"
            >
              {isCapturing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
              Live Capture "Before" (Old Site)
            </button>

            <button
              onClick={() => handleCaptureLive(false)}
              disabled={isCapturing || !targetDomain}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 disabled:opacity-50 transition-colors"
            >
              {isCapturing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
              Live Capture "After" (New Site)
            </button>
          </div>

          {captureMsg && (
            <span className="text-xs text-indigo-500 font-medium">{captureMsg}</span>
          )}
        </div>
      </div>

      {/* Main Teaser Canvas / Display Area */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl text-white">
        {/* Teaser Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> RetroFit Website Rescue Blueprint
            </div>
            <h3 className="text-2xl font-extrabold mt-0.5">{businessName}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
              48-72h Guaranteed Turnaround
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
              $299 Flat Rate Rescue
            </span>
          </div>
        </div>

        {/* View Mode: Side by Side */}
        {viewMode === 'side-by-side' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Left: Before */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-bold text-rose-400 text-sm">BEFORE: Outdated & Slow</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Performance: {beforeScore}/100
                </span>
              </div>

              <div className="relative group flex-1 min-h-[300px] max-h-[440px] overflow-hidden bg-zinc-950 flex items-center justify-center">
                <img src={beforeImage} alt="Before Website" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <label className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium rounded-lg cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" /> Upload Custom Image
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, true)} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 space-y-2">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Identified Flaws</div>
                <div className="flex flex-wrap gap-2">
                  {beforeBadges.map((b, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded bg-rose-950/60 border border-rose-900 text-rose-300">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: After */}
            <div className="bg-zinc-900 border-2 border-indigo-500/50 rounded-xl overflow-hidden shadow-lg flex flex-col">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-indigo-950/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-emerald-400 text-sm">AFTER: Modernized Rescue</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  ⚡ Performance: {afterScore}/100
                </span>
              </div>

              <div className="relative group flex-1 min-h-[300px] max-h-[440px] overflow-hidden bg-zinc-950 flex items-center justify-center">
                <img src={afterImage} alt="After Website" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <label className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-medium rounded-lg cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" /> Upload Redesign Mockup
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, false)} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 space-y-2">
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Rescue Enhancements</div>
                <div className="flex flex-wrap gap-2">
                  {afterBadges.map((b, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Mode: Comparison Slider */}
        {viewMode === 'slider' && (
          <div className="mt-6">
            <div 
              ref={sliderContainerRef}
              onMouseDown={handleSliderMouseDown}
              onTouchStart={handleSliderTouchStart}
              className="relative w-full h-[500px] rounded-xl overflow-hidden select-none border border-zinc-800 cursor-ew-resize group bg-zinc-950 shadow-2xl"
            >
              {/* After Image (Full Background) */}
              <img 
                src={afterImage} 
                alt="After" 
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none" 
              />
              
              {/* Before Image (Clipped with inset clip-path to prevent squishing/distortion) */}
              <img 
                src={beforeImage} 
                alt="Before" 
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
              />

              {/* Badges / Labels */}
              <span className="absolute top-4 left-4 px-3 py-1 bg-rose-600/90 text-white font-bold text-xs rounded-full shadow-lg backdrop-blur-sm pointer-events-none z-10 border border-rose-500/30">
                BEFORE (Old Site)
              </span>

              <span className="absolute top-4 right-4 px-3 py-1 bg-emerald-600/90 text-white font-bold text-xs rounded-full shadow-lg backdrop-blur-sm pointer-events-none z-10 border border-emerald-500/30">
                AFTER (Rescue Redesign)
              </span>

              {/* Vertical Divider Line */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.9)] pointer-events-none z-10"
                style={{ left: `${sliderPos}%` }}
              />

              {/* Circular Drag Handle */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-ew-resize font-black text-sm border-2 border-indigo-600 z-20 select-none group-hover:scale-110 transition-transform active:scale-95"
                style={{ left: `${sliderPos}%` }}
              >
                ↔
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-xs font-semibold text-zinc-400">Before (0%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="flex-1 accent-indigo-500 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
              />
              <span className="text-xs font-semibold text-zinc-400">After (100%)</span>
            </div>
          </div>
        )}

        {/* View Mode: Device Frames */}
        {viewMode === 'devices' && (
          <div className="mt-6 flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
            {/* Desktop MacBook Mockup */}
            <div className="w-full max-w-[560px]">
              <div className="bg-zinc-800 p-2.5 rounded-t-xl border border-zinc-700 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-3 text-[11px] text-zinc-400 font-mono truncate">{targetDomain || 'modern-rescue.com'}</span>
              </div>
              <div className="h-[320px] bg-zinc-900 border-x border-zinc-700 overflow-hidden">
                <img src={afterImage} alt="Desktop Preview" className="w-full h-full object-cover object-top" />
              </div>
              <div className="h-4 bg-zinc-700 rounded-b-xl border border-zinc-600 shadow" />
            </div>

            {/* Mobile iPhone Mockup */}
            <div className="w-[240px] bg-black p-3 rounded-[36px] border-4 border-zinc-700 shadow-2xl">
              <div className="w-20 h-4 bg-zinc-800 rounded-full mx-auto mb-2" />
              <div className="h-[380px] rounded-[24px] overflow-hidden bg-zinc-900">
                <img src={afterImage} alt="Mobile Preview" className="w-full h-full object-cover object-top" />
              </div>
              <div className="w-28 h-1 bg-zinc-700 rounded-full mx-auto mt-2" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
