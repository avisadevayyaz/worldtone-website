"use client";

import { useIsMounted } from "@/src/hooks/use-is-mounted";
import { Button } from "@/src/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle(): React.ReactElement {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  const toggleTheme = (): void => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const showMoon = mounted ? theme === "light" : true;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="cursor-pointer"
    >
      {showMoon ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
