import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import React from "react";

function oklchToHex(oklch: string): string {
  if (oklch.startsWith("#")) return oklch;
  if (oklch.startsWith("oklch")) {
    try {
      const match = oklch.match(/oklch\(([^)]+)\)/);
      if (match && match[1]) {
        const values = match[1].split(/\s+/).map(Number.parseFloat);
        if (values.length >= 3) {
          const l = values[0];
          const c = values[1];
          const h = values[2];
          if (
            l !== undefined &&
            c !== undefined &&
            h !== undefined &&
            !Number.isNaN(l) &&
            !Number.isNaN(c) &&
            !Number.isNaN(h)
          ) {
            const rgb = oklchToRgb(l, c, h);
            return `#${rgb
              .map((v) => Math.round(v).toString(16).padStart(2, "0"))
              .join("")}`;
          }
        }
      }
    } catch {
      return "#000000";
    }
  }
  return "#000000";
}

function oklchToRgb(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  const a1 = c * Math.cos(hRad);
  const b1 = c * Math.sin(hRad);
  const l1 = l + 0.3963377774 * a1 + 0.2158037573 * b1;
  const m1 = l - 0.1055613458 * a1 - 0.0638541728 * b1;
  const s1 = l - 0.0894841775 * a1 - 1.291485548 * b1;
  const l2 = l1 * l1 * l1;
  const m2 = m1 * m1 * m1;
  const s2 = s1 * s1 * s1;
  const r = +4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s2;
  const g = -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s2;
  const b = -0.0041960863 * l2 - 0.7034186147 * m2 + 1.707614701 * s2;
  return [
    Math.max(0, Math.min(255, r * 255)),
    Math.max(0, Math.min(255, g * 255)),
    Math.max(0, Math.min(255, b * 255)),
  ];
}

function hexToOklch(hex: string): string {
  if (!hex.startsWith("#")) return hex;
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255;
  const [l, c, h] = rgbToOklch(r, g, b);
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l1 = Math.cbrt(l);
  const m1 = Math.cbrt(m);
  const s1 = Math.cbrt(s);
  const l2 = 0.2104542553 * l1 + 0.793617785 * m1 - 0.0040720468 * s1;
  const a1 = 1.9779984951 * l1 - 2.428592205 * m1 + 0.4505937099 * s1;
  const b1 = 0.0259040371 * l1 + 0.7827717662 * m1 - 0.808675766 * s1;
  const c = Math.sqrt(a1 * a1 + b1 * b1);
  const h = (Math.atan2(b1, a1) * 180) / Math.PI;
  return [l2, c, h < 0 ? h + 360 : h];
}

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({
  label,
  value,
  onChange,
}: ColorPickerProps): React.ReactElement {
  const hexValue = oklchToHex(value);

  const handleColorChange = (hex: string): void => {
    const oklch = hexToOklch(hex);
    onChange(oklch);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs">{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 text-xs font-mono flex-1 min-w-0"
        />
        <Input
          type="color"
          value={hexValue}
          onChange={(e) => handleColorChange(e.target.value)}
          className="h-8 w-12 sm:w-16 p-1 cursor-pointer shrink-0"
        />
        <div
          className="h-8 w-10 sm:w-12 rounded border shrink-0"
          style={{ backgroundColor: value }}
        />
      </div>
    </div>
  );
}

