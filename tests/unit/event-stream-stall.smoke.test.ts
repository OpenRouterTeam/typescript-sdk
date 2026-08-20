import { describe, expect, it, vi, afterEach } from "vitest";
import {
  EventStream,
  setEventStreamStallTimeout,
} from "../../src/lib/event-streams.js";
import { StreamStalledError } from "../../src/models/errors/httpclienterrors.js";

function enc(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

function streamFrom(chunks: (Uint8Array | "hang")[]): ReadableStream<Uint8Array> {
  let i = 0;
  return new ReadableStream<Uint8Array>({
    async pull(c) {
      const next = chunks[i++];
      if (next === undefined) return c.close();
      if (next === "hang") return new Promise(() => {}); // never resolves
      c.enqueue(next as Uint8Array);
    },
  });
}

describe("EventStream stall detection", () => {
  afterEach(() => setEventStreamStallTimeout(undefined));

  it("errors with StreamStalledError when no bytes arrive within the window", async () => {
    const es = new EventStream(streamFrom(["hang"]), (m) => ({ done: false, value: m.data as any }), { stallTimeoutMs: 50 });
    const reader = es.getReader();
    const r = reader.read();
    await expect(r).rejects.toBeInstanceOf(StreamStalledError);
    const err = await r.catch((e) => e);
    expect(err.stallTimeoutMs).toBe(50);
    expect(err.eventsDelivered).toBe(0);
    expect(err.elapsedMs).toBeGreaterThanOrEqual(45);
    expect(err.message).toContain("no data received for 50ms");
    expect(err.message).toContain("Retry the request");
  });

  it("delivers earlier chunks, then fails fast on a mid-stream stall", async () => {
    const es = new EventStream(
      streamFrom([enc('data: {"a":1}\n\n'), "hang"]),
      (m) => ({ done: false, value: JSON.parse(m.data!) }),
      { stallTimeoutMs: 60 },
    );
    const reader = es.getReader();
    const first = await reader.read();
    expect(first).toEqual({ done: false, value: { a: 1 } });
    const err = await reader.read().catch((e) => e);
    expect(err).toBeInstanceOf(StreamStalledError);
    expect(err.eventsDelivered).toBe(1);
  });

  it("keep-alive bytes reset the stall timer", async () => {
    const body = new ReadableStream<Uint8Array>({
      async start(c) {
        c.enqueue(enc(": ping\n"));
        setTimeout(() => c.enqueue(enc(": ping\n")), 40);
        setTimeout(() => c.enqueue(enc('data: {"ok":true}\n\n')), 80);
        setTimeout(() => c.close(), 100);
      },
    });
    const es = new EventStream(body, (m) => ({ done: false, value: m.data as any }), { stallTimeoutMs: 70 });
    const out: unknown[] = [];
    for await (const v of es) out.push(v);
    expect(out).toEqual(['{"ok":true}']);
  });

  it("stallTimeoutMs <= 0 disables detection (clean close works)", async () => {
    const es = new EventStream(
      streamFrom([enc('data: 1\n\n'), enc('data: 2\n\n')]),
      (m) => ({ done: false, value: Number(m.data) }),
      { stallTimeoutMs: 0 },
    );
    const out: number[] = [];
    for await (const v of es) out.push(v);
    expect(out).toEqual([1, 2]);
  });

  it("module-level fallback applies when no constructor option is set", async () => {
    setEventStreamStallTimeout(40);
    const es = new EventStream(streamFrom(["hang"]), (m) => ({ done: false, value: m }));
    const err = await es.getReader().read().catch((e) => e);
    expect(err).toBeInstanceOf(StreamStalledError);
    expect(err.stallTimeoutMs).toBe(40);
  });

  it("setStallTimeoutMs overrides after construction", async () => {
    const es = new EventStream(streamFrom(["hang"]), (m) => ({ done: false, value: m }));
    es.setStallTimeoutMs(35);
    const err = await es.getReader().read().catch((e) => e);
    expect(err).toBeInstanceOf(StreamStalledError);
    expect(err.stallTimeoutMs).toBe(35);
  });

  it("cancels the upstream on stall (no dangling connection)", async () => {
    let cancelled: unknown = null;
    const body = new ReadableStream<Uint8Array>({
      pull() { return new Promise(() => {}); },
      cancel(reason) { cancelled = reason; },
    });
    const es = new EventStream(body, (m) => ({ done: false, value: m }), { stallTimeoutMs: 30 });
    const err = await es.getReader().read().catch((e) => e);
    expect(err).toBeInstanceOf(StreamStalledError);
    await vi.waitFor(() => expect(cancelled).toBe(err));
  });
});
