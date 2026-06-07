/**
 * themes.ts — Vorgefertigte Design-Presets
 *
 * Jedes Preset definiert Farben, Typografie und Layout-Werte.
 * In site.ts wählt man einfach: theme: "warm-craft" — fertig.
 * Individuelle Overrides sind optional möglich.
 */

export interface ThemePreset {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    onPrimary: string;
    border: string;
  };
  typography: {
    fontBody: string;
    fontHeading: string;
    sizeBase: string;
    fontWeightNormal: string;
    fontWeightMedium: string;
    fontWeightSemibold: string;
    fontWeightBold: string;
    fontWeightExtrabold: string;
    trackingTight: string;
    trackingNormal: string;
    trackingWide: string;
  };
  layout: {
    containerMax: string;
    containerPadding: string;
    sectionSpacing: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
  border: {
    radius: string;
    radiusLg: string;
  };
  shadow: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

const systemFont =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const baseTypography: ThemePreset["typography"] = {
  fontBody: systemFont,
  fontHeading: systemFont,
  sizeBase: "16px",
  fontWeightNormal: "400",
  fontWeightMedium: "500",
  fontWeightSemibold: "600",
  fontWeightBold: "700",
  fontWeightExtrabold: "800",
  trackingTight: "-0.02em",
  trackingNormal: "0em",
  trackingWide: "0.025em",
};

const baseLayout: ThemePreset["layout"] = {
  containerMax: "1120px",
  containerPadding: "1.25rem",
  sectionSpacing: "5rem",
};

const baseSpacing: ThemePreset["spacing"] = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "5rem",
};

const baseBorder: ThemePreset["border"] = {
  radius: "0.5rem",
  radiusLg: "1rem",
};

// Default shadow scale for light themes (elegant-dark overrides with stronger values)
const baseShadow: ThemePreset["shadow"] = {
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
};

export const themes: Record<string, ThemePreset> = {
  /** Seriöses Blau — Handwerk, Dienstleister, Beratung */
  "professional-blue": {
    colors: {
      primary: "#2563eb",
      primaryDark: "#1d4ed8",
      secondary: "#f0f4ff",
      accent: "#f59e0b",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#0f172a",
      textMuted: "#64748b",
      onPrimary: "#ffffff",
      border: "#e2e8f0",
    },
    typography: baseTypography,
    layout: baseLayout,
    spacing: baseSpacing,
    border: baseBorder,
    shadow: baseShadow,
  },

  /** Warme Töne — Schreinerei, Bäckerei, Handwerk */
  "warm-craft": {
    colors: {
      primary: "#b45309",
      primaryDark: "#92400e",
      secondary: "#fef3c7",
      accent: "#d97706",
      background: "#fffbf5",
      surface: "#fef9f0",
      text: "#1c1917",
      textMuted: "#78716c",
      onPrimary: "#ffffff",
      border: "#e7e5e4",
    },
    typography: {
      ...baseTypography,
      fontBody: "Georgia, 'Times New Roman', Times, serif",
    },
    layout: baseLayout,
    spacing: baseSpacing,
    border: { radius: "0.375rem", radiusLg: "0.75rem" },
    shadow: baseShadow,
  },

  /** Frisches Grün — Gesundheit, Natur, Bio, Gartenbau */
  "fresh-green": {
    colors: {
      primary: "#16a34a",
      primaryDark: "#15803d",
      secondary: "#f0fdf4",
      accent: "#0d9488",
      background: "#ffffff",
      surface: "#f0fdf4",
      text: "#0f172a",
      textMuted: "#64748b",
      onPrimary: "#ffffff",
      border: "#d1e7dd",
    },
    typography: baseTypography,
    layout: baseLayout,
    spacing: baseSpacing,
    border: baseBorder,
    shadow: baseShadow,
  },

  /** Elegantes Dunkel — Premium, Fotografie, Architektur */
  "elegant-dark": {
    colors: {
      primary: "#a78bfa",
      primaryDark: "#8b5cf6",
      secondary: "#1e1b2e",
      accent: "#f472b6",
      background: "#0f0d1a",
      surface: "#1a1726",
      text: "#f1f0f5",
      textMuted: "#9ca3af",
      onPrimary: "#0f0d1a",
      border: "#2d2a3e",
    },
    typography: baseTypography,
    layout: baseLayout,
    spacing: baseSpacing,
    border: { radius: "0.75rem", radiusLg: "1.25rem" },
    shadow: {
      xs: "0 1px 2px 0 rgb(0 0 0 / 0.25)",
      sm: "0 1px 3px 0 rgb(0 0 0 / 0.35), 0 1px 2px -1px rgb(0 0 0 / 0.35)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.45), 0 4px 6px -4px rgb(0 0 0 / 0.45)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)",
    },
  },

  /** Papier & Tinte — offyx Brand. Ruhig, kultiviert, fokussiert */
  "paper-ink": {
    colors: {
      primary: "#B5632A",
      primaryDark: "#8C471C",
      secondary: "#EFE6DA",
      accent: "#B5632A",
      background: "#F7F1E8",
      surface: "#FBF7F1",
      text: "#352E28",
      textMuted: "#7A6A5E",
      onPrimary: "#FFF7F1",
      border: "rgba(53,46,40,0.14)",
    },
    typography: {
      fontBody: "'Work Sans', Arial, sans-serif",
      fontHeading: "'Playfair Display', Georgia, serif",
      sizeBase: "16px",
      fontWeightNormal: "400",
      fontWeightMedium: "500",
      fontWeightSemibold: "600",
      fontWeightBold: "700",
      fontWeightExtrabold: "800",
      trackingTight: "-0.02em",
      trackingNormal: "0em",
      trackingWide: "0.025em",
    },
    layout: baseLayout,
    spacing: baseSpacing,
    border: { radius: "8px", radiusLg: "14px" },
    shadow: {
      xs: "0 1px 2px 0 rgba(32,24,18,0.04)",
      sm: "0 2px 8px rgba(32,24,18,0.06)",
      md: "0 4px 14px rgba(32,24,18,0.07)",
      lg: "0 2px 10px rgba(32,24,18,0.06), 0 18px 48px rgba(32,24,18,0.08)",
      xl: "0 2px 10px rgba(32,24,18,0.08), 0 24px 64px rgba(32,24,18,0.12)",
    },
  },

  /** Minimalistisch — Clean, modern, universell */
  "minimal-mono": {
    colors: {
      primary: "#18181b",
      primaryDark: "#09090b",
      secondary: "#f4f4f5",
      accent: "#18181b",
      background: "#ffffff",
      surface: "#fafafa",
      text: "#18181b",
      textMuted: "#71717a",
      onPrimary: "#ffffff",
      border: "#e4e4e7",
    },
    typography: baseTypography,
    layout: baseLayout,
    spacing: baseSpacing,
    border: { radius: "0.25rem", radiusLg: "0.5rem" },
    shadow: baseShadow,
  },
};

/** Resolved theme: preset merged with optional overrides */
export function resolveTheme(
  presetName: string,
  overrides?: Partial<ThemePreset>,
): ThemePreset {
  const base = themes[presetName] ?? themes["professional-blue"];
  if (!overrides) return base;

  return {
    colors: { ...base.colors, ...overrides.colors },
    typography: { ...base.typography, ...overrides.typography },
    layout: { ...base.layout, ...overrides.layout },
    spacing: { ...base.spacing, ...overrides.spacing },
    border: { ...base.border, ...overrides.border },
    shadow: { ...base.shadow, ...overrides.shadow },
  };
}

export default themes;
