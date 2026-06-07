import { describe, it, expect } from "vitest";
import {
  selectTile,
  selectOption,
  back,
  getPackage,
  getComparisonData,
  INITIAL_STATE,
} from "./hero-finder";

// ─── Tracer Bullet ────────────────────────────────────────────────
describe("selectTile", () => {
  it("Schließfach → direkt zum Ergebnis", () => {
    const state = selectTile("locker");
    expect(state).toEqual({ stage: "result", packageId: "schliessfach" });
  });

  it("Virtual Office Plus → direkt zum Ergebnis", () => {
    const state = selectTile("plus");
    expect(state).toEqual({ stage: "result", packageId: "vo-plus" });
  });

  it("Geschäftsadresse → Zwischenschritt", () => {
    const state = selectTile("address");
    expect(state).toEqual({ stage: "intermediate", tileId: "address" });
  });

  it("Coworking → Zwischenschritt", () => {
    const state = selectTile("coworking");
    expect(state).toEqual({ stage: "intermediate", tileId: "coworking" });
  });
});

// ─── Intermediate → Result ────────────────────────────────────────
describe("selectOption", () => {
  it("Adresse + nur Adresse → Virtual Office Basic", () => {
    const state = selectOption({ stage: "intermediate", tileId: "address" }, "basic");
    expect(state).toEqual({ stage: "result", packageId: "vo-basic" });
  });

  it("Adresse + mit Coworking → Virtual Office Plus", () => {
    const state = selectOption({ stage: "intermediate", tileId: "address" }, "plus");
    expect(state).toEqual({ stage: "result", packageId: "vo-plus" });
  });

  it("Coworking + gelegentlich → Coworking Flex", () => {
    const state = selectOption({ stage: "intermediate", tileId: "coworking" }, "flex");
    expect(state).toEqual({ stage: "result", packageId: "coworking-flex" });
  });

  it("Coworking + täglich → Coworking Regular", () => {
    const state = selectOption({ stage: "intermediate", tileId: "coworking" }, "regular");
    expect(state).toEqual({ stage: "result", packageId: "coworking-regular" });
  });
});

// ─── Back-Navigation ──────────────────────────────────────────────
describe("back", () => {
  it("von Result → tiles", () => {
    const state = back({ stage: "result", packageId: "vo-basic" });
    expect(state).toEqual(INITIAL_STATE);
  });

  it("von Intermediate → tiles", () => {
    const state = back({ stage: "intermediate", tileId: "address" });
    expect(state).toEqual(INITIAL_STATE);
  });
});

// ─── Package-Daten ────────────────────────────────────────────────
describe("getPackage", () => {
  it("jedes Paket hat name, price, personaText, features, cta", () => {
    const ids = ["vo-basic", "vo-plus", "schliessfach", "coworking-flex", "coworking-regular"] as const;
    for (const id of ids) {
      const pkg = getPackage(id);
      expect(pkg.name).toBeTruthy();
      expect(pkg.price).toBeTruthy();
      expect(pkg.personaText).toBeTruthy();
      expect(pkg.features.length).toBeGreaterThanOrEqual(3);
      expect(pkg.cta).toBeTruthy();
    }
  });

  it("Virtual Office Plus ist als empfohlen markiert", () => {
    expect(getPackage("vo-plus").recommended).toBe(true);
  });

  it("nur ein Paket ist empfohlen", () => {
    const ids = ["vo-basic", "vo-plus", "schliessfach", "coworking-flex", "coworking-regular"] as const;
    const recommended = ids.filter((id) => getPackage(id).recommended);
    expect(recommended).toHaveLength(1);
  });
});

// ─── Comparison Table ─────────────────────────────────────────────
describe("getComparisonData", () => {
  it("liefert Tab-Daten für alle 4 Kategorien", () => {
    const data = getComparisonData();
    expect(data.tabs).toHaveLength(4);
    expect(data.tabs.map((t: any) => t.id)).toEqual(["vo-basic", "vo-plus", "schliessfach", "coworking-regular"]);
  });

  it("jeder Tab hat name, price, features, cta", () => {
    const data = getComparisonData();
    data.tabs.forEach((tab: any) => {
      expect(tab.name).toBeTruthy();
      expect(tab.price).toBeTruthy();
      expect(tab.features.length).toBeGreaterThanOrEqual(5);
      expect(tab.cta).toBeTruthy();
    });
  });

  it("features pro Tab sind Strings (keine Leerzeichen)", () => {
    const data = getComparisonData();
    data.tabs.forEach((tab: any) => {
      tab.features.forEach((f: string) => {
        expect(typeof f).toBe("string");
        expect(f.length).toBeGreaterThan(0);
      });
    });
  });

  it("Virtual Office Plus hat recommended flag", () => {
    const data = getComparisonData();
    const plus = data.tabs.find((t: any) => t.id === "vo-plus");
    expect(plus.recommended).toBe(true);
  });
});
