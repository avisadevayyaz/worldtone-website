"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import type { ThemeConfig, ThemeColors } from "../../types/theme.types";
import { isPresetTheme } from "../../constants/theme-presets";
import { useThemeStore } from "../../stores/theme-store";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import { Palette, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { CustomTab } from "./custom-tab";
import { PresetTab } from "./preset-tab";
import { useTheme } from "next-themes";
import {
  DialogDescription,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/src/components/ui/dialog";

export function ThemeEditor(): React.ReactElement {
  const {
    themes,
    activeThemeId,
    setActiveTheme,
    createTheme,
    updateTheme,
    deleteTheme,
    getActiveTheme,
    applyTheme,
  } = useThemeStore();
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<ThemeConfig | null>(null);
  const [themeName, setThemeName] = useState("");
  const [radius, setRadius] = useState(0.625);
  const [lightColors, setLightColors] = useState<ThemeColors | null>(null);
  const [darkColors, setDarkColors] = useState<ThemeColors | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("presets");

  useEffect(() => {
    if (isOpen) {
      const activeTheme = getActiveTheme();
      if (activeTheme) {
        setEditingTheme(activeTheme);
        setThemeName(activeTheme.name);
        setRadius(activeTheme.radius);
        setLightColors(activeTheme.colors.light);
        setDarkColors(activeTheme.colors.dark);
        setIsCreating(false);
        setActiveTab(isPresetTheme(activeTheme.id) ? "presets" : "custom");
      } else {
        const defaultTheme = themes.find((t: ThemeConfig) => t.id === "default");
        if (defaultTheme) {
          setLightColors(defaultTheme.colors.light);
          setDarkColors(defaultTheme.colors.dark);
        }
        setActiveTab("custom");
        setIsCreating(true);
      }
    }
  }, [isOpen, getActiveTheme, themes]);

  const handleSave = (): void => {
    if (!lightColors || !darkColors) return;

    const isPreset = editingTheme ? isPresetTheme(editingTheme.id) : false;

    if (isPreset) {
      const newTheme = createTheme(
        `${editingTheme?.name} Copy`,
        {
          light: lightColors,
          dark: darkColors,
        },
        radius
      );
      setActiveTheme(newTheme.id);
      setIsOpen(false);
    } else if (isCreating) {
      const newTheme = createTheme(
        themeName,
        {
          light: lightColors,
          dark: darkColors,
        },
        radius
      );
      setActiveTheme(newTheme.id);
      setIsOpen(false);
    } else if (editingTheme) {
      updateTheme(editingTheme.id, {
        name: themeName,
        colors: {
          light: lightColors,
          dark: darkColors,
        },
        radius,
      });
      setIsOpen(false);
    }
  };

  const handleNewTheme = (): void => {
    const activeTheme = getActiveTheme();
    if (activeTheme) {
      setEditingTheme(null);
      setThemeName(`Theme ${themes.length}`);
      setRadius(0.625);
      setLightColors(activeTheme.colors.light);
      setDarkColors(activeTheme.colors.dark);
      setIsCreating(true);
      setActiveTab("custom");
    }
  };

  const handleRandomPreset = (): void => {
    const presetThemes = themes.filter(
      (theme: ThemeConfig) => isPresetTheme(theme.id) && theme.id !== "default"
    );
    if (presetThemes.length > 0) {
      const randomTheme =
        presetThemes[Math.floor(Math.random() * presetThemes.length)];
      if (randomTheme) {
        setActiveTheme(randomTheme.id);
        setEditingTheme(randomTheme);
        setThemeName(randomTheme.name);
        setRadius(randomTheme.radius);
        setLightColors(randomTheme.colors.light);
        setDarkColors(randomTheme.colors.dark);
        setIsCreating(false);
      }
    }
  };

  const handleDelete = (): void => {
    if (editingTheme && !isPresetTheme(editingTheme.id)) {
      deleteTheme(editingTheme.id);
      setIsOpen(false);
    }
  };

  const handleSelectPresetTheme = (theme: ThemeConfig): void => {
    setActiveTheme(theme.id);
    setEditingTheme(theme);
    setThemeName(theme.name);
    setRadius(theme.radius);
    setLightColors(theme.colors.light);
    setDarkColors(theme.colors.dark);
    setIsCreating(false);
  };

  const handleSelectCustomTheme = (theme: ThemeConfig): void => {
    setActiveTheme(theme.id);
    setEditingTheme(theme);
    setThemeName(theme.name);
    setRadius(theme.radius);
    setLightColors(theme.colors.light);
    setDarkColors(theme.colors.dark);
    setIsCreating(false);
  };

  useEffect(() => {
    if (lightColors && darkColors && editingTheme) {
      const previewTheme: ThemeConfig = {
        ...editingTheme,
        name: themeName,
        colors: {
          light: lightColors,
          dark: darkColors,
        },
        radius,
      };
      applyTheme(previewTheme);
    }
  }, [lightColors, darkColors, radius, editingTheme, themeName, applyTheme]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Theme Editor">
          <Palette className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`max-w-[95vw] max-h-[90vh] overflow-y-auto w-full ${
          activeTab === "presets" ? "sm:max-w-md" : "sm:max-w-4xl"
        }`}
      >
        <DialogHeader>
          <DialogTitle>Theme Editor</DialogTitle>
          <DialogDescription>
            Customize your theme colors and settings. Changes are applied in
            real-time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              if (
                value === "custom" &&
                !isCreating &&
                (!editingTheme || isPresetTheme(editingTheme.id))
              ) {
                const defaultTheme = themes.find((t: ThemeConfig) => t.id === "default");
                if (defaultTheme) {
                  setEditingTheme(null);
                  setThemeName(`Theme ${themes.length}`);
                  setRadius(0.625);
                  setLightColors(defaultTheme.colors.light);
                  setDarkColors(defaultTheme.colors.dark);
                  setIsCreating(true);
                }
              }
            }}
            className="w-full"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="presets">Preset Themes</TabsTrigger>
                <TabsTrigger value="custom">Create Your Theme</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 shrink-0">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light");
                  }}
                  aria-label="Toggle theme"
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <TabsContent value="presets">
              <PresetTab
                themes={themes}
                activeThemeId={activeThemeId}
                onSelectTheme={handleSelectPresetTheme}
                onRandomTheme={handleRandomPreset}
              />
            </TabsContent>
            <TabsContent value="custom">
              <CustomTab
                themes={themes}
                activeThemeId={activeThemeId}
                editingTheme={editingTheme}
                themeName={themeName}
                radius={radius}
                lightColors={lightColors}
                darkColors={darkColors}
                isCreating={isCreating}
                onSelectTheme={handleSelectCustomTheme}
                onThemeNameChange={setThemeName}
                onRadiusChange={setRadius}
                onLightColorsChange={setLightColors}
                onDarkColorsChange={setDarkColors}
                onNewTheme={handleNewTheme}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
