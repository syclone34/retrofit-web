import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const apiKey = process.env.PAGESPEED_API_KEY;
    if (!apiKey) {
       return NextResponse.json({ performanceScore: 0 });
    }

    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=desktop&key=${apiKey}`;
    const psiRes = await fetch(psiUrl);
    
    if (!psiRes.ok) {
       return NextResponse.json({ performanceScore: 0 });
    }
    
    const psiData = await psiRes.json();
    const score = psiData?.lighthouseResult?.categories?.performance?.score;
    const performanceScore = score !== undefined ? Math.round(score * 100) : 0;

    return NextResponse.json({
      performanceScore
    });

  } catch (error: any) {
    return NextResponse.json({ performanceScore: 0 });
  }
}
