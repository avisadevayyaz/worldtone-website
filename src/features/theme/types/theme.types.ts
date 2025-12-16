export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  radius: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DefaultTheme extends ThemeConfig {
  isDefault: true;
}

export type CustomTheme = ThemeConfig & { isDefault: false };
