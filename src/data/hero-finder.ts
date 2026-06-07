/**
 * hero-finder.ts — Pure State Machine für den Hero-Inline-Produktfinder
 *
 * Kein DOM, keine Seiteneffekte → vollständig testbar.
 * Wird von Hero.astro per <script> verwendet.
 */

// ─── Types ────────────────────────────────────────────────────────

export type TileId = "address" | "locker" | "coworking" | "plus";

export type PackageId =
  | "vo-basic"
  | "vo-plus"
  | "schliessfach"
  | "coworking-flex"
  | "coworking-regular";

export type FinderState =
  | { stage: "tiles" }
  | { stage: "intermediate"; tileId: TileId }
  | { stage: "result"; packageId: PackageId };

export interface Package {
  id: PackageId;
  name: string;
  price: string;
  priceNote: string;
  personaText: string;
  features: string[];
  cta: string;
  ctaHref: string;
  recommended?: boolean;
}

// ─── Initial State ────────────────────────────────────────────────

export const INITIAL_STATE: FinderState = { stage: "tiles" };

// ─── State Transitions ────────────────────────────────────────────

/** Direkte Tiles → Intermediate oder sofort Result */
export function selectTile(tileId: TileId): FinderState {
  switch (tileId) {
    case "locker":
      return { stage: "result", packageId: "schliessfach" };
    case "plus":
      return { stage: "result", packageId: "vo-plus" };
    case "address":
      return { stage: "intermediate", tileId: "address" };
    case "coworking":
      return { stage: "intermediate", tileId: "coworking" };
  }
}

/** Intermediate → Result */
export function selectOption(
  state: Extract<FinderState, { stage: "intermediate" }>,
  option: string
): FinderState {
  if (state.tileId === "address") {
    return {
      stage: "result",
      packageId: option === "basic" ? "vo-basic" : "vo-plus",
    };
  }
  if (state.tileId === "coworking") {
    return {
      stage: "result",
      packageId: option === "flex" ? "coworking-flex" : "coworking-regular",
    };
  }
  return INITIAL_STATE;
}

/** Zurück zur Tile-Auswahl */
export function back(_state: FinderState): FinderState {
  return INITIAL_STATE;
}

// ─── Package Data ─────────────────────────────────────────────────

const PACKAGES: Record<PackageId, Package> = {
  "vo-basic": {
    id: "vo-basic",
    name: "Virtual Office Basic",
    price: "ab 79 €",
    priceNote: "/Monat",
    personaText: "Für Gründer & Freelancer, die eine seriöse Adresse brauchen – ohne Schnickschnack.",
    features: [
      "Ladungsfähige Geschäftsadresse Berlin",
      "Briefkastenservice inklusive",
      "Post-Scan & digitale Bereitstellung",
      "Für GmbH, UG & Einzelunternehmen",
    ],
    cta: "Jetzt anfragen",
    ctaHref: "#contact",
  },
  "vo-plus": {
    id: "vo-plus",
    name: "Virtual Office Plus",
    price: "ab 99 €",
    priceNote: "/Monat",
    personaText: "Für alle, die Adresse und Arbeitsplatz kombinieren wollen – das Rundum-Paket.",
    features: [
      "Alles aus Virtual Office Basic",
      "Post-Weiterleitung inklusive",
      "Regelmäßige Coworking-Nutzung",
      "Dedizierter Ansprechpartner",
    ],
    cta: "Empfohlenes Paket anfragen",
    ctaHref: "#contact",
    recommended: true,
  },
  "schliessfach": {
    id: "schliessfach",
    name: "Schließfach",
    price: "ab 19 €",
    priceNote: "/Monat",
    personaText: "Für alle, die regelmäßig in Berlin sind und ihr Material sicher verwahren wollen.",
    features: [
      "Sicheres Schließfach für Laptop & Unterlagen",
      "Zugang Mo–Fr, 08:00–20:00 Uhr",
      "Ohne Mitgliedschaft buchbar",
      "Kombinierbar mit allen Paketen",
    ],
    cta: "Schließfach anfragen",
    ctaHref: "#contact",
  },
  "coworking-flex": {
    id: "coworking-flex",
    name: "Coworking – Flex",
    price: "ab 24 €",
    priceNote: "/Slot",
    personaText: "Für alle, die gelegentlich einen ruhigen Arbeitsplatz in Berlin brauchen.",
    features: [
      "Einzelslot 24 € (4h) oder Tagespass 39 €",
      "5er-Paket 110 €, 10er-Paket 210 €",
      "8 ruhige Plätze, 500 Mbit/s WLAN",
      "Keine Mitgliedschaft nötig",
    ],
    cta: "Slot buchen",
    ctaHref: "#contact",
  },
  "coworking-regular": {
    id: "coworking-regular",
    name: "Coworking – Mitgliedschaft",
    price: "ab 169 €",
    priceNote: "/Monat",
    personaText: "Für alle, die täglich fokussiert arbeiten und ein zweites Zuhause suchen.",
    features: [
      "Täglicher Zugang, freie Tischwahl",
      "Basic 169 €, Flex 249 €, Pro 349 €/Mo",
      "500 Mbit/s WLAN, Drucker & Küche",
      "Kaffeeflatrate für 19 €/Mo zubuchbar",
    ],
    cta: "Mitgliedschaft anfragen",
    ctaHref: "#contact",
  },
};

export function getPackage(id: PackageId): Package {
  return PACKAGES[id];
}

// ─── Comparison Data (für Tabs-Vergleichstabelle) ────────────────

export interface ComparisonTab {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  recommended?: boolean;
  features: string[];
  cta: string;
  ctaHref: string;
}

export interface ComparisonData {
  tabs: ComparisonTab[];
}

export function getComparisonData(): ComparisonData {
  return {
    tabs: [
      {
        id: "vo-basic",
        name: "Virtual Office Basic",
        price: "ab 79 €",
        priceNote: "/Monat",
        features: [
          "Ladungsfähige Geschäftsadresse in Berlin",
          "Briefkastenservice – Postannahme vor Ort",
          "Post-Scan & digitale Bereitstellung",
          "Für GmbH, UG, Einzelunternehmen & Freiberufler",
          "Keine Mindestlaufzeit",
          "Postweiterleitung auf Anfrage",
        ],
        cta: "Basic anfragen",
        ctaHref: "#contact",
      },
      {
        id: "vo-plus",
        name: "Virtual Office Plus",
        price: "ab 99 €",
        priceNote: "/Monat",
        recommended: true,
        features: [
          "Alles aus Virtual Office Basic",
          "Post-Weiterleitung inklusive",
          "Regelmäßige Coworking-Nutzung (bis zu 4×/Monat)",
          "Dedizierter persönlicher Ansprechpartner",
          "Flexible Laufzeit",
          "Kaffeeflatrate zu vergünstigten Konditionen",
        ],
        cta: "Plus anfragen",
        ctaHref: "#contact",
      },
      {
        id: "schliessfach",
        name: "Schließfach",
        price: "ab 19 €",
        priceNote: "/Monat",
        features: [
          "Sicheres Schließfach für Laptop, Unterlagen & Wertsachen",
          "Zugang während der Öffnungszeiten (Mo–Fr, 08–20 Uhr)",
          "Ohne Mitgliedschaft buchbar",
          "Kombinierbar mit allen anderen Paketen",
          "Schlüsselübergabe direkt bei Vertragsabschluss",
          "Keine versteckten Kosten",
        ],
        cta: "Schließfach anfragen",
        ctaHref: "#contact",
      },
      {
        id: "coworking-regular",
        name: "Coworking",
        price: "ab 24 €",
        priceNote: "/Slot",
        features: [
          "8 bewusst limitierte Plätze – kein Großraum",
          "500 Mbit/s WLAN, Drucker, Küche",
          "Einzelslot 24 € (4h), Tagespass 39 €",
          "Mitgliedschaften: Basic 169 €, Flex 249 €, Pro 349 €",
          "5er-/10er-/20er-Pakete verfügbar",
          "Kaffeeflatrate für 19 €/Monat zubuchbar",
        ],
        cta: "Coworking anfragen",
        ctaHref: "#contact",
      },
    ],
  };
}
