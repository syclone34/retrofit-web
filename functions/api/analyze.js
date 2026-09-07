// Cloudflare Pages Function: Secure Serverless Proxy for Google PageSpeed Insights
// Keeps your Google API key 100% hidden on the server side
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return new Response(JSON.stringify({ error: 'Missing target URL parameter' }), {
            status: 400,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    // Securely pull API key from Cloudflare Pages Environment Variables
    const apiKey = env.GOOGLE_PAGESPEED_API_KEY || '';
    const keyParam = apiKey ? `&key=${encodeURIComponent(apiKey)}` : '';
    const googleEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES&strategy=mobile${keyParam}`;

    try {
        const response = await fetch(googleEndpoint, {
            headers: { 'Accept': 'application/json' }
        });
        const data = await response.text();
        return new Response(data, {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=1800'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message || 'Serverless proxy error' }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}
