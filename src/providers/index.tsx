"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";
import { useIsMounted } from "@/src/hooks/use-is-mounted";
import { getStorageKey, getCookieKey } from "@/src/config/brand";
import { secureStorageUtils } from "@/src/lib/secure-storage";
import { useThemeStore } from "@/src/features/theme/stores/theme-store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function ThemeSync() {
  const { getActiveTheme, applyTheme, activeThemeId, themes } = useThemeStore();
  const mounted = useIsMounted();

  useEffect(() => {
    if (!mounted) return;

    const cookieThemeId = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${getCookieKey("active_theme_id")}=`))
      ?.split("=")[1];

    const storedId = secureStorageUtils.getItem<string>(
      getStorageKey("active_theme_id")
    );

    let themeIdToUse = "default";
    if (cookieThemeId && themes.some((t) => t.id === cookieThemeId)) {
      themeIdToUse = cookieThemeId;
      if (storedId !== cookieThemeId) {
        secureStorageUtils.setItem(
          getStorageKey("active_theme_id"),
          cookieThemeId
        );
      }
    } else if (storedId && themes.some((t) => t.id === storedId)) {
      themeIdToUse = storedId;
      if (cookieThemeId !== storedId) {
        document.cookie = `${getCookieKey(
          "active_theme_id"
        )}=${storedId}; path=/; max-age=${60 * 60 * 24 * 365}`;
      }
    }

    const activeTheme = themes.find((t) => t.id === themeIdToUse);
    if (activeTheme) {
      applyTheme(activeTheme);
      if (cookieThemeId !== themeIdToUse) {
        document.cookie = `${getCookieKey("theme_config")}=${JSON.stringify(
          activeTheme
        )}; path=/; max-age=${60 * 60 * 24 * 365}`;
      }
    }

    const cookieTheme = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${getCookieKey("theme")}=`))
      ?.split("=")[1];

    const storedTheme = secureStorageUtils.getItem<string>(
      getStorageKey("theme")
    );
    if (cookieTheme && cookieTheme !== storedTheme) {
      secureStorageUtils.setItem(getStorageKey("theme"), cookieTheme);
    }

    const handleThemeChange = (theme: string) => {
      document.cookie = `${getCookieKey("theme")}=${theme}; path=/; max-age=${
        60 * 60 * 24 * 365
      }`;
      secureStorageUtils.setItem(getStorageKey("theme"), theme);
      const currentActiveTheme = getActiveTheme();
      if (currentActiveTheme) {
        applyTheme(currentActiveTheme);
      }
    };

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      handleThemeChange(currentTheme);
      const currentActiveTheme = getActiveTheme();
      if (currentActiveTheme) {
        applyTheme(currentActiveTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [mounted, getActiveTheme, applyTheme, activeThemeId, themes]);

  return null;
}

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
        storageKey={getCookieKey("theme")}
        enableColorScheme={false}
      >
        <ThemeSync />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
