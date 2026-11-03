const CHANNEL_ID = "UCnGWqkgS_j0n2bGEwldnXTA";
const LIVE_TAB_URL = "https://www.youtube.com/@prbcaurora/streams";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export interface Sermon {
  id: string;
  title: string;
  date: string;
  dateFormatted: string;
  thumbnail: string;
  youtubeUrl: string;
  description: string;
}

function parseSermonTitle(raw: string): string {
  // "Sunday Service: 3/15/2026 - A Father's Love" → "A Father's Love"
  const match = raw.match(/[-–]\s*(.+)$/);
  return match ? match[1].trim() : raw;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getServiceType(raw: string): string {
  if (raw.toLowerCase().includes("communion")) return "Communion Service";
  if (raw.toLowerCase().includes("bible study")) return "Bible Study";
  if (raw.toLowerCase().includes("special")) return "Special Service";
  return "Sunday Service";
}

// Last resort when YouTube can't be read. Newest first.
const SAVED_SERMONS: Sermon[] = [
  sermonFromVideo("zOKp2f_F4zY", "Stumbling Blocks for Fools", "2026-11-01"),
  sermonFromVideo("Dxw0xcn2AmU", "12 Years of Kingdom Impact", "2026-10-18"),
  sermonFromVideo("tDAy7yvVa6Q", "The Power of Grace", "2026-10-18"),
];

function sermonFromVideo(id: string, title: string, day: string): Sermon {
  const date = `${day}T17:00:00Z`;
  return {
    id,
    title,
    date,
    dateFormatted: formatDate(date),
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
    description: "",
  };
}

function parseFeed(xml: string, limit: number): Sermon[] {
  return xml.split("<entry>").slice(1, limit + 1).map((entry) => {
    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
    const rawTitle = entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
    const thumbnail = entry.match(/<media:thumbnail url="([^"]+)"/)?.[1] ?? "";
    const description = entry.match(/<media:description>([^<]+)<\/media:description>/)?.[1] ?? "";

    return {
      id: videoId,
      title: parseSermonTitle(rawTitle),
      date: published,
      dateFormatted: formatDate(published),
      thumbnail,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      description: description.split("\n")[0],
      serviceType: getServiceType(rawTitle),
    };
  });
}

function findLockups(node: unknown, found: LiveTabLockup[] = []): LiveTabLockup[] {
  if (Array.isArray(node)) {
    for (const item of node) findLockups(item, found);
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (key === "lockupViewModel") found.push(value as LiveTabLockup);
      else findLockups(value, found);
    }
  }
  return found;
}

interface LiveTabLockup {
  contentId?: string;
  metadata?: { lockupMetadataViewModel?: { title?: { content?: string } } };
}

// The church's services are listed under the channel's Live tab, in titles
// like "Sunday Service: 11/1/2026 - Sermon Title".
function parseLiveTab(html: string, limit: number): Sermon[] {
  const json = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/)?.[1];
  if (!json) return [];

  const sermons: Sermon[] = [];
  const seenTitles = new Set<string>();
  for (const lockup of findLockups(JSON.parse(json))) {
    const id = lockup.contentId;
    const rawTitle = lockup.metadata?.lockupMetadataViewModel?.title?.content;
    const day = rawTitle?.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!id || !rawTitle || !day || seenTitles.has(rawTitle)) continue;

    const date = `${day[3]}-${day[1].padStart(2, "0")}-${day[2].padStart(2, "0")}T17:00:00Z`;
    if (new Date(date).getTime() > Date.now() + 86_400_000) continue;

    seenTitles.add(rawTitle);
    sermons.push(sermonFromVideo(id, parseSermonTitle(rawTitle), date.slice(0, 10)));
    if (sermons.length === limit) break;
  }
  return sermons;
}

const SOURCES = [
  { url: LIVE_TAB_URL, parse: parseLiveTab },
  { url: RSS_URL, parse: parseFeed },
];
const ATTEMPTS_PER_SOURCE = 2;
const fetchFromYouTube = (url: string) => fetch(url, { next: { revalidate: 3600 } });
const pause = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function getSermons(
  limit = 6,
  fetchUrl: (url: string) => Promise<Response> = fetchFromYouTube,
  wait: (ms: number) => Promise<void> = pause,
): Promise<Sermon[]> {
  for (const { url, parse } of SOURCES) {
    for (let attempt = 1; attempt <= ATTEMPTS_PER_SOURCE; attempt++) {
      try {
        const res = await fetchUrl(url);
        if (res.ok) {
          const sermons = parse(await res.text(), limit);
          if (sermons.length > 0) return sermons;
        }
        console.error(`Sermon source ${url} attempt ${attempt} failed with status ${res.status}`);
      } catch (e) {
        console.error(`Sermon source ${url} attempt ${attempt} failed:`, e);
      }
      if (attempt < ATTEMPTS_PER_SOURCE) await wait(1000);
    }
  }
  return SAVED_SERMONS.slice(0, limit);
}
