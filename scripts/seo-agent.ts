/**
 * SEO/GEO Management Agent for Peaceful Rest Baptist Church
 *
 * Audits the live site, checks AI search visibility, and generates
 * an actionable SEO report. Run manually or via cron.
 *
 * Usage:
 *   npx tsx scripts/seo-agent.ts
 *
 * Requires: ANTHROPIC_API_KEY in environment
 */

import Anthropic from "anthropic";

const SITE_URL = "https://peaceful-rest.vercel.app";
const CHURCH_NAME = "Peaceful Rest Baptist Church";
const LOCATION = "Aurora, CO";

const client = new Anthropic();

// ── Checks ──────────────────────────────────────────────────────────────────

async function fetchSite(url: string): Promise<string> {
  const res = await fetch(url);
  return res.text();
}

async function checkMetaTags(html: string): Promise<Record<string, string | boolean>> {
  const checks: Record<string, string | boolean> = {};

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  checks.title = titleMatch ? titleMatch[1] : "MISSING";

  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  checks.description = descMatch ? descMatch[1] : "MISSING";

  checks.hasOgTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
  checks.hasOgImage = /<meta[^>]+property=["']og:image["']/i.test(html);
  checks.hasTwitterCard = /<meta[^>]+name=["']twitter:card["']/i.test(html);
  checks.hasJsonLd = /<script[^>]+application\/ld\+json/i.test(html);
  checks.hasFaqSchema = html.includes('"FAQPage"');
  checks.hasChurchSchema = html.includes('"Church"');
  checks.hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  checks.hasSitemap = html.includes("sitemap");

  return checks;
}

async function checkSitemap(): Promise<boolean> {
  try {
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    return res.ok;
  } catch {
    return false;
  }
}

async function checkRobots(): Promise<boolean> {
  try {
    const res = await fetch(`${SITE_URL}/robots.txt`);
    return res.ok;
  } catch {
    return false;
  }
}

// ── GEO Check — ask Claude if it knows about the church ──────────────────────

async function geoVisibilityCheck(): Promise<string> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `Without searching the web, what do you know about "${CHURCH_NAME}" in ${LOCATION}?
Include: pastor name, address, service times, website, denomination, anything else you know.
If you don't know it, say so plainly. Be honest about your confidence level.`,
      },
    ],
  });

  return (response.content[0] as { type: string; text: string }).text;
}

// ── AI Analysis & Recommendations ────────────────────────────────────────────

async function generateReport(
  metaChecks: Record<string, string | boolean>,
  sitemapOk: boolean,
  robotsOk: boolean,
  geoVisibility: string,
  html: string
): Promise<void> {
  const checksSummary = JSON.stringify(metaChecks, null, 2);

  const prompt = `You are an SEO/GEO specialist auditing the website for ${CHURCH_NAME} (${SITE_URL}).

## Meta Tag Audit Results
${checksSummary}

## Infrastructure
- sitemap.xml: ${sitemapOk ? "✅ Found" : "❌ Missing"}
- robots.txt: ${robotsOk ? "✅ Found" : "❌ Missing"}

## AI Visibility Check (what Claude knows about this church without web search)
${geoVisibility}

## Page Content Snippet (first 3000 chars of HTML)
${html.slice(0, 3000)}

---

Provide a concise SEO/GEO audit report with:
1. **Overall Score** (A-F) with one sentence rationale
2. **Critical Issues** (must fix now)
3. **Quick Wins** (fix this week, < 1 hour each)
4. **GEO Analysis** — based on the AI visibility check, what does this tell us? What content should be added to improve AI citation?
5. **Off-Page Actions** (Google Business Profile, Search Console, directories)
6. **30-Day Roadmap** — 3 prioritized actions

Keep it actionable. Skip theory. Flag the single most impactful thing to do first.`;

  console.log("\n🤖 Generating AI analysis...\n");

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      process.stdout.write(chunk.delta.text);
    }
  }

  console.log("\n");
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍 SEO/GEO Audit — ${CHURCH_NAME}`);
  console.log(`   ${SITE_URL}`);
  console.log(`   ${new Date().toLocaleDateString("en-US", { dateStyle: "full" })}\n`);
  console.log("━".repeat(60));

  console.log("📡 Fetching live site...");
  const html = await fetchSite(SITE_URL);

  console.log("🏷️  Checking meta tags...");
  const metaChecks = await checkMetaTags(html);

  console.log("🗺️  Checking sitemap...");
  const sitemapOk = await checkSitemap();

  console.log("🤖 Checking robots.txt...");
  const robotsOk = await checkRobots();

  console.log("🧠 Running GEO visibility check (AI knowledge probe)...\n");
  const geoVisibility = await geoVisibilityCheck();

  console.log("━".repeat(60));
  console.log("\n📊 SEO AUDIT REPORT\n");
  console.log("━".repeat(60));

  await generateReport(metaChecks, sitemapOk, robotsOk, geoVisibility, html);

  console.log("━".repeat(60));
  console.log("\n✅ Audit complete.");
  console.log(
    "💡 Run this monthly, or set up a cron: `0 9 1 * * npx tsx scripts/seo-agent.ts`\n"
  );
}

main().catch(console.error);
