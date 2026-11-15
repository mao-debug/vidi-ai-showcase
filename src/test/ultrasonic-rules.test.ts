import { describe, expect, it } from "vitest";
import { ultrasonicExplanation as copy, sensorUpdateHz, sensorUpdateIntervalMs } from "@/lib/vidi-content";

describe("Presentation sensor rules", () => {
  it("alternates sensor firings at 0, 40, 80 and 120 ms", () => {
    expect(copy.timing.slots).toEqual([0, 40, 80, 120]);
    expect(copy.timing.firingIntervalMs).toBe(40);
  });
  it("updates each sensor every 80 ms", () => { expect(sensorUpdateIntervalMs(copy.timing.firingIntervalMs)).toBe(80); });
  it("updates each sensor at 12.5 Hz", () => { expect(sensorUpdateHz(copy.timing.firingIntervalMs)).toBe(12.5); });
  it("uses 115200 baud for USB serial", () => { expect(copy.transport.baud).toBe(115200); });
  it("specifies a 6.4 W peak system draw", () => { expect(copy.power.peakWatts).toBe(6.4); });
  it("does not publish an unconfirmed battery capacity", () => { expect(copy.power.capacityWh).toBeNull(); });
  it("does not publish an unconfirmed runtime", () => { expect(copy.power.measuredRuntimeHours).toBeNull(); });
});