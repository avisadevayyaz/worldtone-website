"use client";

import { useThemeStore } from "../stores/theme-store";
import { ThemeConfig } from "../types/theme.types";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/src/components/ui/select";

export function ThemeSelector(): React.ReactElement {
  const { themes, activeThemeId, setActiveTheme } = useThemeStore();

  return (
    <Select value={activeThemeId} onValueChange={setActiveTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme: ThemeConfig) => (
          <SelectItem key={theme.id} value={theme.id}>
            {theme.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

