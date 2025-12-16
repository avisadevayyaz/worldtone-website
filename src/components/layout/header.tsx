"use client";

import Link from "next/link";
import { useUiStore } from "@/src/stores/ui-store";
import { ThemeEditor } from "@/src/features/theme/components/theme-editor";
import { UserProfile } from "@/src/features/theme/components/user-profile";
import { Button } from "@/src/components/ui/button";
import { Menu } from "lucide-react";
import { brandConfig } from "@/src/config/brand";

export function Header(): React.ReactElement {
  const { setSidebarOpen } = useUiStore();

  return (
    <header className="flex h-16 items-center justify-between border-b px-2 sm:px-4 shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0"
          onClick={() => setSidebarOpen(true)}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/" className="flex items-center gap-2 cursor-pointer min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground font-bold">
            {brandConfig.logoInitial}
          </div>
          <div className="flex-col min-w-0 hidden sm:flex">
            <span className="text-base sm:text-lg font-semibold truncate">{brandConfig.name}</span>
            <span className="text-xs text-muted-foreground truncate">
              {brandConfig.tagline}
            </span>
          </div>
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-10">
          <li className="cursor-pointer text-sm font-medium hover:text-primary-foreground hover:underline bg-primary text-primary-foreground p-2 px-4 rounded-md"><Link href="/">Home</Link></li>
          <li className="cursor-pointer text-sm font-medium  hover:underline "><Link href="/chat">Chat</Link></li>
          <li className="cursor-pointer text-sm font-medium  hover:underline "><Link href="/services">Services</Link></li>
        </ul>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <ThemeEditor />
        <UserProfile />
      </div>
    </header>
  );
}
