"use client";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
}

export function MainLayout({
  children,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
}: MainLayoutProps): React.ReactElement {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
          onDeleteConversation={onDeleteConversation}
        /> */}
        <main className="flex-1 overflow-hidden w-full">{children}</main>
      </div>
    </div>
  );
}
