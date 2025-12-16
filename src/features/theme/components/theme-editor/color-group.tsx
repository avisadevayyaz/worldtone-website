import type { ThemeColors } from "../../types/theme.types";
import { ColorPicker } from "./color-picker";
import React from "react";

interface ColorGroupProps {
  colors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
  title: string;
}

export function ColorGroup({
  colors,
  onChange,
  title,
}: ColorGroupProps): React.ReactElement {
  const updateColor = (key: keyof ThemeColors, value: string): void => {
    onChange({ ...colors, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ColorPicker
          label="Background"
          value={colors.background}
          onChange={(v) => updateColor("background", v)}
        />
        <ColorPicker
          label="Foreground"
          value={colors.foreground}
          onChange={(v) => updateColor("foreground", v)}
        />
        <ColorPicker
          label="Card"
          value={colors.card}
          onChange={(v) => updateColor("card", v)}
        />
        <ColorPicker
          label="Card Foreground"
          value={colors.cardForeground}
          onChange={(v) => updateColor("cardForeground", v)}
        />
        <ColorPicker
          label="Primary"
          value={colors.primary}
          onChange={(v) => updateColor("primary", v)}
        />
        <ColorPicker
          label="Primary Foreground"
          value={colors.primaryForeground}
          onChange={(v) => updateColor("primaryForeground", v)}
        />
        <ColorPicker
          label="Secondary"
          value={colors.secondary}
          onChange={(v) => updateColor("secondary", v)}
        />
        <ColorPicker
          label="Secondary Foreground"
          value={colors.secondaryForeground}
          onChange={(v) => updateColor("secondaryForeground", v)}
        />
        <ColorPicker
          label="Muted"
          value={colors.muted}
          onChange={(v) => updateColor("muted", v)}
        />
        <ColorPicker
          label="Muted Foreground"
          value={colors.mutedForeground}
          onChange={(v) => updateColor("mutedForeground", v)}
        />
        <ColorPicker
          label="Accent"
          value={colors.accent}
          onChange={(v) => updateColor("accent", v)}
        />
        <ColorPicker
          label="Accent Foreground"
          value={colors.accentForeground}
          onChange={(v) => updateColor("accentForeground", v)}
        />
        <ColorPicker
          label="Destructive"
          value={colors.destructive}
          onChange={(v) => updateColor("destructive", v)}
        />
        <ColorPicker
          label="Border"
          value={colors.border}
          onChange={(v) => updateColor("border", v)}
        />
        <ColorPicker
          label="Input"
          value={colors.input}
          onChange={(v) => updateColor("input", v)}
        />
        <ColorPicker
          label="Ring"
          value={colors.ring}
          onChange={(v) => updateColor("ring", v)}
        />
      </div>
    </div>
  );
}

