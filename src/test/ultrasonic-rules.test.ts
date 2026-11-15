import { describe, expect, it } from "vitest";
import { ultrasonicExplanation as copy } from "@/lib/vidi-content";

describe("Phase 6 ultrasonic presentation", () => {
  it("shows the request, sequential measurements, and response", () => {
    expect(copy.timing.steps.map(step => step.title)).toEqual([
      "Request a pair", "Measure left", "Measure right", "Return both readings",
    ]);
    expect(copy.timing.triggerGapMs).toBe(100);
    expect(copy.timing.echoDeadlineMs).toBe(30);
  });

  it("shows a Phase 6 sample response at 115200 baud", () => {
    expect(copy.transport.baud).toBe(115200);
    expect(copy.transport.packet).toEqual({
      v: 1, type: "sample", id: "0123456789abcdef", boot: "1234abcd", seq: 0,
      left: { status: "ok", distance_mm: 1200, age_ms: 122 },
      right: { status: "no_echo", distance_mm: null, age_ms: 0 },
    });
  });
});
