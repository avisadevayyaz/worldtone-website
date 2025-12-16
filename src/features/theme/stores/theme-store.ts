import { isPresetTheme, getDefaultTheme } from "@/src/features/theme/constants/theme-presets";
import { loadThemes, saveThemes } from "@/src/features/theme/utils/theme-storage";
import { brandConfig, getStorageKey, getCookieKey } from "@/src/config/brand";
import type { ThemeConfig } from "@/src/features/theme/types/theme.types";
import { secureStorageUtils } from "@/src/lib/secure-storage";
import { create } from "zustand";

const ACTIVE_THEME_KEY = getStorageKey("active_theme_id");

interface ThemeState {
  themes: ThemeConfig[];
  activeThemeId: string;
  setActiveTheme: (id: string) => void;
  createTheme: (
    name: string,
    colors: ThemeConfig["colors"],
    radius?: number
  ) => ThemeConfig;
  updateTheme: (id: string, updates: Partial<ThemeConfig>) => void;
  deleteTheme: (id: string) => void;
  getActiveTheme: () => ThemeConfig | null;
  resetToDefault: () => void;
  applyTheme: (theme: ThemeConfig) => void;
  getPresetThemes: () => ThemeConfig[];
  getCustomThemes: () => ThemeConfig[];
  getRandomPresetTheme: () => ThemeConfig | null;
}

export const useThemeStore = create<ThemeState>((set: (state: ThemeState) => void, get: () => ThemeState) => {
  const themes = loadThemes();
  let activeThemeId = "default";

  if (typeof window !== "undefined") {
    const cookieThemeId = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${getCookieKey("active_theme_id")}=`))
      ?.split("=")[1];

    const storedId = secureStorageUtils.getItem<string>(ACTIVE_THEME_KEY);

    if (cookieThemeId && themes.some((t) => t.id === cookieThemeId)) {
      activeThemeId = cookieThemeId;
      if (storedId !== cookieThemeId) {
        secureStorageUtils.setItem(ACTIVE_THEME_KEY, cookieThemeId);
      }
    } else if (storedId && themes.some((t) => t.id === storedId)) {
      activeThemeId = storedId;
      if (cookieThemeId !== storedId) {
        document.cookie = `${getCookieKey("active_theme_id")}=${storedId}; path=/; max-age=${60 * 60 * 24 * 365
          }`;
      }
    }
  }

  return {
    themes,
    activeThemeId,
    setActiveTheme: (id: string) => {
      const theme = get().themes.find((t) => t.id === id);
      if (theme) {
        secureStorageUtils.setItem(ACTIVE_THEME_KEY, id);
        set({ activeThemeId: id } as ThemeState);
        get().applyTheme(theme);
        if (typeof document !== "undefined") {
          document.cookie = `stitch_active_theme_id=${id}; path=/; max-age=${60 * 60 * 24 * 365
            }`;
          document.cookie = `${getCookieKey("theme_config")}=${JSON.stringify(
            theme
          )}; path=/; max-age=${60 * 60 * 24 * 365}`;
        }
      }
    },
    createTheme: (
      name: string,
      colors: ThemeConfig["colors"],
      radius = 0.625
    ) => {
      const newTheme: ThemeConfig = {
        id: `theme-${Date.now()}`,
        name,
        colors,
        radius,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedThemes = [...get().themes, newTheme];
      saveThemes(updatedThemes);
      set({ themes: updatedThemes } as ThemeState);
      if (typeof document !== "undefined") {
        document.cookie = `stitch_theme_config=${JSON.stringify(
          newTheme
        )}; path=/; max-age=${60 * 60 * 24 * 365}`;
      }
      return newTheme;
    },
    updateTheme: (id: string, updates: Partial<ThemeConfig>) => {
      const updatedThemes = get().themes.map((theme) =>
        theme.id === id
          ? { ...theme, ...updates, updatedAt: new Date() }
          : theme
      );
      saveThemes(updatedThemes);
      set({ themes: updatedThemes } as ThemeState);
      const activeTheme = updatedThemes.find(
        (t) => t.id === get().activeThemeId
      );
      if (activeTheme) {
        get().applyTheme(activeTheme);
        if (typeof document !== "undefined") {
          document.cookie = `stitch_theme_config=${JSON.stringify(
            activeTheme
          )}; path=/; max-age=${60 * 60 * 24 * 365}`;
        }
      }
    },
    deleteTheme: (id: string) => {
      if (id === "default") return;
      const updatedThemes = get().themes.filter((theme) => theme.id !== id);
      saveThemes(updatedThemes);
      const newActiveId =
        get().activeThemeId === id ? "default" : get().activeThemeId;
      secureStorageUtils.setItem(ACTIVE_THEME_KEY, newActiveId);
      set({ themes: updatedThemes, activeThemeId: newActiveId } as ThemeState);
      const activeTheme = updatedThemes.find((t) => t.id === newActiveId);
      if (activeTheme) {
        get().applyTheme(activeTheme);
      }
    },
    getActiveTheme: () => {
      return get().themes.find((t) => t.id === get().activeThemeId) || null;
    },
    resetToDefault: () => {
      get().setActiveTheme("default");
      const defaultTheme = getDefaultTheme();
      get().applyTheme(defaultTheme);
    },
    applyTheme: (theme: ThemeConfig) => {
      if (typeof document === "undefined") return;

      const styleId = `${brandConfig.storagePrefix}-theme-styles`;
      let styleElement = document.getElementById(styleId);
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }

      const root = document.documentElement;
      const isDark = root.classList.contains("dark");

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

      styleElement.textContent = css;

      if (typeof document !== "undefined") {
        document.cookie = `${getCookieKey("active_theme_id")}=${theme.id
          }; path=/; max-age=${60 * 60 * 24 * 365}`;
        document.cookie = `${getCookieKey("theme_config")}=${JSON.stringify(
          theme
        )}; path=/; max-age=${60 * 60 * 24 * 365}`;
      }
    },
    getPresetThemes: () => {
      return get().themes.filter((theme) => isPresetTheme(theme.id));
    },
    getCustomThemes: () => {
      return get().themes.filter((theme) => !isPresetTheme(theme.id));
    },
    getRandomPresetTheme: () => {
      const presetThemes = get()
        .getPresetThemes()
        .filter((theme) => theme.id !== "default");
      if (presetThemes.length === 0) return null;
      return (
        presetThemes[Math.floor(Math.random() * presetThemes.length)] || null
      );
    },
  };
});

export { isPresetTheme };
