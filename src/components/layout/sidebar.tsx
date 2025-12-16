"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useUiStore } from "@/src/stores/ui-store";
import { useIsMobile } from "@/src/hooks/use-mobile";
// import { ConversationList } from "@/src/features/conversations/components/conversation-list";
// import { NewConversationButton } from "@/src/features/conversations/components/new-conversation-button";
import { brandConfig } from "@/src/config/brand";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/src/components/ui/sheet";
import { Button } from "../ui/button";

interface SidebarProps {
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
}

function SidebarContent({
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
}: SidebarProps): React.ReactElement {
  return (
    <>
      <div className="p-3 sm:p-4">
        {/* <NewConversationButton /> */}
        <Button>New Conversation</Button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {/* <ConversationList
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
          onDeleteConversation={onDeleteConversation}
        /> */}
        <div>Conversation List</div>
      </div>
    </>
  );
}

export function Sidebar({
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
}: SidebarProps): React.ReactElement {
  const { sidebarOpen, setSidebarOpen } = useUiStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, sidebarOpen, setSidebarOpen]);

  return (
    <>
      <aside className="hidden md:flex h-full w-64 flex-col border-r bg-sidebar shrink-0">
        <SidebarContent
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
          onDeleteConversation={onDeleteConversation}
        />
      </aside>
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent
            side="left"
            className="w-64 p-0 border-r bg-sidebar text-sidebar-foreground sm:w-64 [&>button]:z-10 [&>button]:top-4 [&>button]:right-4"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Navigation sidebar</SheetDescription>
            </SheetHeader>
            <div className="flex h-full flex-col">
              <div className="px-4 pt-4 pb-2 border-b border-sidebar-border">
                <Link
                  href="/"
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground font-bold">
                    {brandConfig.logoInitial}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-base font-semibold truncate">
                      {brandConfig.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {brandConfig.tagline}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="p-3 sm:p-4">
                {/* <NewConversationButton /> */}
                <Button>New Conversation</Button>
              </div>
              <div className="flex-1 overflow-y-auto px-2 pb-4">
                {/* <ConversationList
                  activeConversationId={activeConversationId}
                  onSelectConversation={(id) => {
                    onSelectConversation(id);
                    setSidebarOpen(false);
                  }}
                  onDeleteConversation={onDeleteConversation}
                /> */}

                <div>Conversation List</div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
