/**
 * RetroFit Client Tracking Snippet (retrofit-tracker.js)
 * Version: 1.0.0
 * 
 * Lightweight, zero-dependency tracking snippet for RetroFit client websites.
 * Captures click-to-call events, quote form submissions, and UTM attribution.
 * 
 * Usage:
 * Add to client website before </body>:
 * <script src="retrofit-tracker.js" data-client-id="client_slug" data-endpoint="https://your-webhook-endpoint.com"></script>
 */
(function () {
    'use strict';

    // 1. Configuration Extraction
    const scriptTag = document.currentScript || document.querySelector('script[data-client-id]');
    const clientId = scriptTag ? scriptTag.getAttribute('data-client-id') : (window.RETROFIT_CLIENT_ID || 'retrofit-client');
    const endpoint = scriptTag ? scriptTag.getAttribute('data-endpoint') : (window.RETROFIT_ENDPOINT || '');
    const isDebug = window.location.hostname === 'localhost' || window.location.search.includes('debug=true');

    // 2. Parse UTM & Marketing Parameters
    function getMarketingParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_term: params.get('utm_term') || '',
            utm_content: params.get('utm_content') || '',
            gclid: params.get('gclid') || ''
        };
    }

    // 3. Dispatch Event Payload
    function sendEvent(eventType, eventData) {
        const payload = {
            client_id: clientId,
            event_type: eventType,
            timestamp: new Date().toISOString(),
            page_url: window.location.href,
            page_path: window.location.pathname,
            referrer: document.referrer || 'direct',
            marketing: getMarketingParams(),
            device: {
                is_mobile: /Mobi|Android/i.test(navigator.userAgent),
                screen_width: window.innerWidth,
                screen_height: window.innerHeight
            },
            data: eventData || {}
        };

        if (isDebug) {
            console.log('[RetroFit Tracker] Event logged:', eventType, payload);
        }

        if (!endpoint) {
            return;
        }

        const jsonString = JSON.stringify(payload);

        // Try sendBeacon first for reliable delivery during navigation
        if (navigator.sendBeacon) {
            const blob = new Blob([jsonString], { type: 'application/json' });
            navigator.sendBeacon(endpoint, blob);
        } else {
            fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: jsonString,
                keepalive: true
            }).catch(function (err) {
                if (isDebug) console.error('[RetroFit Tracker] Send error:', err);
            });
        }
    }

    // 4. Listen for Click-to-Call (tel: links)
    document.addEventListener('click', function (e) {
        const telLink = e.target.closest('a[href^="tel:"]');
        if (telLink) {
            const phoneNumber = telLink.getAttribute('href').replace('tel:', '').trim();
            sendEvent('phone_call_click', {
                phone_number: phoneNumber,
                link_text: (telLink.innerText || '').trim()
            });
        }
    }, true);

    // 5. Listen for Form Submissions
    document.addEventListener('submit', function (e) {
        const form = e.target;
        if (!form) return;

        const formData = {};
        const elements = form.elements;

        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            const name = el.name || el.id;
            const type = (el.type || '').toLowerCase();

            // Skip sensitive or unnecessary fields
            if (!name || type === 'password' || type === 'hidden' || type === 'submit') continue;

            if (type === 'checkbox') {
                formData[name] = el.checked;
            } else if (type === 'radio') {
                if (el.checked) formData[name] = el.value;
            } else {
                formData[name] = el.value;
            }
        }

        sendEvent('form_submission', {
            form_id: form.id || 'quote_form',
            form_fields: formData
        });
    }, true);

    // 6. Log Initial Page View
    sendEvent('page_view', {});

    // Expose global helper for manual event logging if needed
    window.RetroFitTracker = {
        track: sendEvent
    };
})();
