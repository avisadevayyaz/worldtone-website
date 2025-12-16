import { brandConfig, getCookieKey } from "@/src/config/brand";
import { getDefaultTheme } from "../constants/theme-presets";
import type { ThemeConfig } from "../types/theme.types";
import { cookies } from "next/headers";

export async function ThemeScript(): Promise<React.ReactElement> {
  const cookieStore = await cookies();
  const activeThemeIdCookie = cookieStore.get(getCookieKey("active_theme_id"));
  const themeConfigCookie = cookieStore.get(getCookieKey("theme_config"));
  const isDarkCookie = cookieStore.get(getCookieKey("theme"));
  const isDark = isDarkCookie?.value === "dark";

  let theme: ThemeConfig = getDefaultTheme();

  if (themeConfigCookie && themeConfigCookie.value) {
    try {
      const parsed = JSON.parse(themeConfigCookie.value) as ThemeConfig;
      if (
        parsed &&
        parsed.colors &&
        parsed.radius !== undefined &&
        (!activeThemeIdCookie || parsed.id === activeThemeIdCookie.value)
      ) {
        theme = parsed;
      }
    } catch {
      theme = getDefaultTheme();
    }
  }

  const colors = isDark ? theme.colors.dark : theme.colors.light;

  const css = `
    :root {
      --radius: ${theme.radius}rem;
      --background: ${colors.background};
      --foreground: ${colors.foreground};
      --card: ${colors.card};
      --card-foreground: ${colors.cardForeground};
      --popover: ${colors.popover};
      --popover-foreground: ${colors.popoverForeground};
      --primary: ${colors.primary};
      --primary-foreground: ${colors.primaryForeground};
      --secondary: ${colors.secondary};
      --secondary-foreground: ${colors.secondaryForeground};
      --muted: ${colors.muted};
      --muted-foreground: ${colors.mutedForeground};
      --accent: ${colors.accent};
      --accent-foreground: ${colors.accentForeground};
      --destructive: ${colors.destructive};
      --border: ${colors.border};
      --input: ${colors.input};
      --ring: ${colors.ring};
      --chart-1: ${colors.chart1};
      --chart-2: ${colors.chart2};
      --chart-3: ${colors.chart3};
      --chart-4: ${colors.chart4};
      --chart-5: ${colors.chart5};
      --sidebar: ${colors.sidebar};
      --sidebar-foreground: ${colors.sidebarForeground};
      --sidebar-primary: ${colors.sidebarPrimary};
      --sidebar-primary-foreground: ${colors.sidebarPrimaryForeground};
      --sidebar-accent: ${colors.sidebarAccent};
      --sidebar-accent-foreground: ${colors.sidebarAccentForeground};
      --sidebar-border: ${colors.sidebarBorder};
      --sidebar-ring: ${colors.sidebarRing};
    }
  `;

  return (
    <style id={`${brandConfig.storagePrefix}-theme-styles`} dangerouslySetInnerHTML={{ __html: css }} />
  );
}
