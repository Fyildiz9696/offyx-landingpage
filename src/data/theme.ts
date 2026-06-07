/**
 * theme.ts — Resolved Theme
 *
 * Liest das gewählte Preset aus site.ts und merged optionale Overrides.
 * Wird von BaseLayout.astro importiert um CSS Custom Properties zu setzen.
 */

import site from "./site";
import { resolveTheme, type ThemePreset } from "./themes";

const theme: ThemePreset = resolveTheme(site.theme, site.themeOverrides);

export default theme;
