import { isPresetTheme } from "../../constants/theme-presets";
import type { ThemeConfig } from "../../types/theme.types";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Shuffle } from "lucide-react";
import React from "react";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/src/components/ui/select";

interface PresetTabProps {
  themes: ThemeConfig[];
  activeThemeId: string;
  onSelectTheme: (theme: ThemeConfig) => void;
  onRandomTheme: () => void;
}

export function PresetTab({
  themes,
  activeThemeId,
  onSelectTheme,
  onRandomTheme,
}: PresetTabProps): React.ReactElement {
  const presetThemes = themes.filter((theme) => isPresetTheme(theme.id));

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label>Select Preset Theme</Label>
        <Select
          value={activeThemeId}
          onValueChange={(id) => {
            const theme = presetThemes.find((t) => t.id === id);
            if (theme) {
              onSelectTheme(theme);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select preset theme" />
          </SelectTrigger>
          <SelectContent>
            {presetThemes.map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onRandomTheme} variant="outline" className="w-full">
        <Shuffle className="h-4 w-4 mr-2" />
        Pick for Me (Random Theme)
      </Button>
    </div>
  );
}

