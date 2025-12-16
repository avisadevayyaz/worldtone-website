import { getPresetThemes, isPresetTheme } from "@/src/features/theme/constants/theme-presets";
import type { ThemeConfig } from "@/src/features/theme/types/theme.types";
import { secureStorageUtils } from "@/src/lib/secure-storage";
import { getStorageKey } from "@/src/config/brand";

const STORAGE_KEY = getStorageKey("themes");

export function loadThemes(): ThemeConfig[] {
  const stored = secureStorageUtils.getItem<ThemeConfig[]>(STORAGE_KEY);
  const presets = getPresetThemes();

  if (!stored || stored.length === 0) {
    return presets;
  }

  const customThemes = stored
    .filter((theme: ThemeConfig) => !presets.some((p: ThemeConfig) => p.id === theme.id))
    .map((theme: ThemeConfig) => ({
      ...theme,
      createdAt: new Date(theme.createdAt),
      updatedAt: new Date(theme.updatedAt),
    }));

  return [...presets, ...customThemes];
}

export function saveThemes(themes: ThemeConfig[]): void {
  const customThemes = themes.filter((theme) => !isPresetTheme(theme.id));
  secureStorageUtils.setItem(STORAGE_KEY, customThemes);
}
