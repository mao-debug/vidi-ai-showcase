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

  it("shows USB serial at 115200 baud", () => {
    expect(copy.transport.baud).toBe(115200);
  });
});
