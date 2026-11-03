const CHANNEL_ID = "UCnGWqkgS_j0n2bGEwldnXTA";
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

// Shown when YouTube's feed is unavailable, which happens often. Newest first.
const SAVED_SERMONS: Sermon[] = [
  savedSermon("1V6NyYyOvrc", "Meet ME, on The Mountain", "2026-06-14"),
  savedSermon("2RcKrdob8J8", "BUT Caleb", "2026-06-07"),
  savedSermon("u1kbnw1Iu9s", "Settling for Separation", "2025-12-14"),
];

function savedSermon(id: string, title: string, day: string): Sermon {
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

const FEED_ATTEMPTS = 3;
const fetchFeedFromYouTube = () => fetch(RSS_URL, { next: { revalidate: 3600 } });
const pause = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function getSermons(
  limit = 6,
  fetchFeed: () => Promise<Response> = fetchFeedFromYouTube,
  wait: (ms: number) => Promise<void> = pause,
): Promise<Sermon[]> {
  for (let attempt = 1; attempt <= FEED_ATTEMPTS; attempt++) {
    try {
      const res = await fetchFeed();
      if (res.ok) {
        const sermons = parseFeed(await res.text(), limit);
        if (sermons.length > 0) return sermons;
      }
      console.error(`Sermon feed attempt ${attempt} failed with status ${res.status}`);
    } catch (e) {
      console.error(`Sermon feed attempt ${attempt} failed:`, e);
    }
    if (attempt < FEED_ATTEMPTS) await wait(attempt * 1000);
  }
  return SAVED_SERMONS.slice(0, limit);
}
