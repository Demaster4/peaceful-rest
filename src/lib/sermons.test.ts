import assert from "node:assert/strict";
import { test } from "node:test";
import { getSermons } from "./sermons.ts";

const FEED = `<feed><entry>
<yt:videoId>abc123</yt:videoId>
<title>Sunday Service: 6/14/2026 - Meet ME, on The Mountain</title>
<published>2026-06-14T17:00:00+00:00</published>
<media:thumbnail url="https://i1.ytimg.com/vi/abc123/hqdefault.jpg" width="480" height="360"/>
<media:description>First line
Second line</media:description>
</entry></feed>`;

const response = (body: string, status = 200) => new Response(body, { status });
const noWait = async () => {};

function scripted(...steps: Array<Response | Error>) {
  let calls = 0;
  const fetchFeed = async () => {
    const step = steps[Math.min(calls++, steps.length - 1)];
    if (step instanceof Error) throw step;
    return step.clone();
  };
  return { fetchFeed, calls: () => calls };
}

test("reads sermons from a healthy feed on the first try", async () => {
  const feed = scripted(response(FEED));
  const sermons = await getSermons(3, feed.fetchFeed, noWait);
  assert.equal(feed.calls(), 1);
  assert.equal(sermons.length, 1);
  assert.equal(sermons[0].title, "Meet ME, on The Mountain");
  assert.equal(sermons[0].youtubeUrl, "https://www.youtube.com/watch?v=abc123");
});

test("retries when YouTube answers with a 404", async () => {
  const feed = scripted(response("not found", 404), response(FEED));
  const sermons = await getSermons(3, feed.fetchFeed, noWait);
  assert.equal(feed.calls(), 2);
  assert.equal(sermons[0].id, "abc123");
});

test("retries when a 200 response has no sermons in it", async () => {
  const feed = scripted(response("<feed></feed>"), response(FEED));
  const sermons = await getSermons(3, feed.fetchFeed, noWait);
  assert.equal(sermons[0].id, "abc123");
});

test("shows the saved sermons when the feed keeps returning errors", async () => {
  const feed = scripted(response("not found", 404));
  const sermons = await getSermons(3, feed.fetchFeed, noWait);
  assert.equal(feed.calls(), 3);
  assert.equal(sermons.length, 3);
  assert.ok(sermons.every((s) => s.id && s.title && s.thumbnail));
});

test("shows the saved sermons when the network is down", async () => {
  const feed = scripted(new Error("network down"));
  const sermons = await getSermons(2, feed.fetchFeed, noWait);
  assert.equal(sermons.length, 2);
});
