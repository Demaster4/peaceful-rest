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

export async function getSermons(limit = 6): Promise<Sermon[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } }); // cache 1hr
    const xml = await res.text();

    const entries = xml.split("<entry>").slice(1);

    return entries.slice(0, limit).map((entry) => {
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
        thumbnail: thumbnail.replace("hqdefault", "maxresdefault"),
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        description: description.split("\n")[0],
        serviceType: getServiceType(rawTitle),
      };
    });
  } catch (e) {
    console.error("Failed to fetch sermons:", e);
    return [];
  }
}
