import assert from "node:assert/strict";
import { test } from "node:test";
import { getSermons } from "./sermons.ts";

function lockup(id: string, title: string) {
  return {
    richItemRenderer: {
      content: {
        lockupViewModel: {
          contentId: id,
          contentType: "LOCKUP_CONTENT_TYPE_VIDEO",
          metadata: { lockupMetadataViewModel: { title: { content: title } } },
        },
      },
    },
  };
}

const livePage = (...items: object[]) =>
  `<html><script>var ytInitialData = ${JSON.stringify({ contents: items })};</script></html>`;

const LIVE_PAGE = livePage(
  lockup("nov", "Communion Sunday: 11/1/2026 - Stumbling Blocks for Fools"),
  lockup("oct1", "Sunday Service: 10/11/2026 - Ability isn't Destiny"),
  lockup("oct2", "Sunday Service: 10/11/2026 - Ability isn't Destiny"),
  lockup("sep", "Sunday Service: 9/27/2026 - Constant Conflict"),
);

const FEED = `<feed><entry>
<yt:videoId>abc123</yt:videoId>
<title>Sunday Service: 6/14/2026 - Meet ME, on The Mountain</title>
<published>2026-06-14T17:00:00+00:00</published>
<media:thumbnail url="https://i1.ytimg.com/vi/abc123/hqdefault.jpg" width="480" height="360"/>
</entry></feed>`;

const response = (body: string, status = 200) => new Response(body, { status });
const noWait = async () => {};

function site(live: Array<Response | Error>, feed: Array<Response | Error> = [response("", 404)]) {
  const counts = { live: 0, feed: 0 };
  const fetchUrl = async (url: string) => {
    const name = url.includes("/feeds/") ? "feed" : "live";
    const steps = name === "feed" ? feed : live;
    const step = steps[Math.min(counts[name]++, steps.length - 1)];
    if (step instanceof Error) throw step;
    return step.clone();
  };
  return { fetchUrl, counts };
}

test("reads the newest services from the channel's Live tab", async () => {
  const yt = site([response(LIVE_PAGE)]);
  const sermons = await getSermons(2, yt.fetchUrl, noWait);
  assert.equal(yt.counts.live, 1);
  assert.equal(yt.counts.feed, 0);
  assert.equal(sermons[0].id, "nov");
  assert.equal(sermons[0].title, "Stumbling Blocks for Fools");
  assert.equal(sermons[0].dateFormatted, "November 1, 2026");
  assert.equal(sermons[0].youtubeUrl, "https://www.youtube.com/watch?v=nov");
  assert.equal(sermons[0].thumbnail, "https://i.ytimg.com/vi/nov/hqdefault.jpg");
});

test("lists a service once when it was streamed twice", async () => {
  const yt = site([response(LIVE_PAGE)]);
  const sermons = await getSermons(3, yt.fetchUrl, noWait);
  assert.deepEqual(sermons.map((s) => s.id), ["nov", "oct1", "sep"]);
});

test("skips services dated in the future", async () => {
  const page = livePage(
    lockup("later", "Sunday Service: 1/1/2099 - Not Yet"),
    lockup("nov", "Communion Sunday: 11/1/2026 - Stumbling Blocks for Fools"),
  );
  const sermons = await getSermons(1, site([response(page)]).fetchUrl, noWait);
  assert.equal(sermons[0].id, "nov");
});

test("retries the Live tab after an error", async () => {
  const yt = site([response("busy", 503), response(LIVE_PAGE)]);
  const sermons = await getSermons(1, yt.fetchUrl, noWait);
  assert.equal(yt.counts.live, 2);
  assert.equal(sermons[0].id, "nov");
});

test("uses the feed when the Live tab has changed shape", async () => {
  const yt = site([response("<html>new layout</html>")], [response(FEED)]);
  const sermons = await getSermons(1, yt.fetchUrl, noWait);
  assert.equal(sermons[0].id, "abc123");
  assert.equal(sermons[0].title, "Meet ME, on The Mountain");
});

test("shows the saved sermons when YouTube returns only errors", async () => {
  const sermons = await getSermons(3, site([response("", 404)]).fetchUrl, noWait);
  assert.equal(sermons.length, 3);
  assert.ok(sermons.every((s) => s.id && s.title && s.thumbnail));
});

test("shows the saved sermons when the network is down", async () => {
  const down = new Error("network down");
  const sermons = await getSermons(2, site([down], [down]).fetchUrl, noWait);
  assert.equal(sermons.length, 2);
});
