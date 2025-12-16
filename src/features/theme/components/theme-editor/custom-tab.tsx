import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import type { ThemeConfig, ThemeColors } from "../../types/theme.types";
import { isPresetTheme } from "../../constants/theme-presets";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Plus, Trash2, Save } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { ColorGroup } from "./color-group";
import React from "react";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/src/components/ui/select";

interface CustomTabProps {
  themes: ThemeConfig[];
  activeThemeId: string;
  editingTheme: ThemeConfig | null;
  themeName: string;
  radius: number;
  lightColors: ThemeColors | null;
  darkColors: ThemeColors | null;
  isCreating: boolean;
  onSelectTheme: (theme: ThemeConfig) => void;
  onThemeNameChange: (name: string) => void;
  onRadiusChange: (radius: number) => void;
  onLightColorsChange: (colors: ThemeColors) => void;
  onDarkColorsChange: (colors: ThemeColors) => void;
  onNewTheme: () => void;
  onSave: () => void;
  onDelete: () => void;
}

export function CustomTab({
  themes,
  activeThemeId,
  editingTheme,
  themeName,
  radius,
  lightColors,
  darkColors,
  isCreating,
  onSelectTheme,
  onThemeNameChange,
  onRadiusChange,
  onLightColorsChange,
  onDarkColorsChange,
  onNewTheme,
  onSave,
  onDelete,
}: CustomTabProps): React.ReactElement {
  const customThemes = themes.filter((theme) => !isPresetTheme(theme.id));
  const canDelete =
    editingTheme && !isPresetTheme(editingTheme.id) && !isCreating;

  return (
    <div className="space-y-4 mt-4">
      {customThemes.length > 0 && (
        <div className="space-y-2">
          <Label>Select Custom Theme</Label>
          <Select
            value={activeThemeId}
            onValueChange={(id) => {
              const theme = customThemes.find((t) => t.id === id);
              if (theme) {
                onSelectTheme(theme);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select custom theme" />
            </SelectTrigger>
            <SelectContent>
              {customThemes.map((theme) => (
                <SelectItem key={theme.id} value={theme.id}>
                  {theme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-4 pt-4 border-t">
        <div className="flex flex-col sm:flex-row gap-2 items-end">
          <div className="flex-1 w-full sm:w-auto space-y-2">
            <Label>Theme Name</Label>
            <Input
              value={themeName}
              onChange={(e) => onThemeNameChange(e.target.value)}
              placeholder="My Theme"
              disabled={editingTheme ? isPresetTheme(editingTheme.id) : false}
            />
          </div>
          <div className="w-full sm:w-32 space-y-2">
            <Label>Border Radius</Label>
            <Input
              type="number"
              step="0.1"
              value={radius}
              onChange={(e) =>
                onRadiusChange(Number.parseFloat(e.target.value))
              }
              min="0"
              max="2"
              disabled={editingTheme ? isPresetTheme(editingTheme.id) : false}
            />
          </div>
          <Button onClick={onNewTheme} variant="outline" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>

        <Tabs defaultValue="light" className="w-full">
          <TabsList>
            <TabsTrigger value="light">Light Mode</TabsTrigger>
            <TabsTrigger value="dark">Dark Mode</TabsTrigger>
          </TabsList>
          <TabsContent value="light">
            {lightColors && (
              <ColorGroup
                colors={lightColors}
                onChange={onLightColorsChange}
                title="Light Mode Colors"
              />
            )}
          </TabsContent>
          <TabsContent value="dark">
            {darkColors && (
              <ColorGroup
                colors={darkColors}
                onChange={onDarkColorsChange}
                title="Dark Mode Colors"
              />
            )}
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 justify-end pt-4 border-t">
          {canDelete && (
            <Button onClick={onDelete} variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            {editingTheme && isPresetTheme(editingTheme.id)
              ? "Save as Copy"
              : isCreating
                ? "Create Theme"
                : "Save Theme"}
          </Button>
        </div>
      </div>
    </div>
  );
}
