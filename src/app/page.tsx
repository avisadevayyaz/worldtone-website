"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MainLayout } from "@/src/components/layout/main-layout";
// import { ChatInput } from "@/src/features/chat/components/chat-input";
// import { ChatMessages } from "@/src/features/chat/components/chat-messages";
// import { ChatSkeleton } from "@/src/features/chat/components/chat-skeleton";
// import { ChatWelcome } from "@/src/features/chat/components/chat-welcome";
// import {
//   useConversationMessages,
//   useSendMessage,
// } from "@/src/features/chat/hooks/use-chat";
// import type { ChatSource } from "@/features/chat/types/chat.types";
// import { useCreateConversation } from "@/src/features/conversations/hooks/use-conversations";
import { useScrollToBottom } from "@/src/hooks/use-scroll-to-bottom";
import { brandConfig } from "@/src/config/brand";
import Link from "next/link";

export default function HomePage(): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const conversationIdParam = searchParams.get("conversation");
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(conversationIdParam);

  // const {
  //   data: conversation,
  //   isLoading,
  //   isFetching,
  // } = useConversationMessages(activeConversationId);
  // const createConversation = useCreateConversation();
  // const sendMessage = useSendMessage();
  // const [lastSources, setLastSources] = useState<ChatSource[]>([]);

  // useEffect(() => {
  //   if (conversationIdParam) {
  //     setActiveConversationId(conversationIdParam);
  //     setLastSources([]);
  //   } else {
  //     setActiveConversationId(null);
  //     setLastSources([]);
  //   }
  // }, [conversationIdParam]);

  // const handleSelectConversation = (id: string): void => {
  //   setActiveConversationId(id);
  //   router.push(`/?conversation=${id}`);
  // };

  // useEffect(() => {
  //   if (sendMessage.data?.sources) {
  //     setLastSources(sendMessage.data.sources);
  //   }
  // }, [sendMessage.data]);

  // const handleExampleClick = async (example: string): Promise<void> => {
  //   const newConv = await createConversation.mutateAsync({});
  //   setActiveConversationId(newConv.id);
  //   router.push(`/?conversation=${newConv.id}`);

  //   await sendMessage.mutateAsync({
  //     conversation_id: newConv.id,
  //     content: example,
  //   });
  // };

  // const handleDeleteConversation = async (id: string): Promise<void> => {
  //   if (id === activeConversationId) {
  //     setActiveConversationId(null);
  //     router.push("/");
  //   }
  // };

  // const messages = conversation?.messages || [];
  // const hasMessages = messages.length > 0;
  // const hasActiveConversationId = !!activeConversationId;
  // const scrollRef = useScrollToBottom([messages.length, sendMessage.isPending]);

  // const shouldShowSkeleton =
  //   hasActiveConversationId && (isLoading || isFetching);

  return (
    <MainLayout
      activeConversationId={activeConversationId}
      onSelectConversation={(id: string) => { }}
      onDeleteConversation={() => { }}
    >

      <div className="min-h-screen flex gap-5 flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">This is worldtone Website</h1>
        <div className="flex gap-4">
          <Link href="/auth/login" className="bg-primary text-white p-2 px-10 rounded-md">Login</Link>
          <Link href="/auth/signup" className="bg-primary text-white  p-2 px-10 rounded-md">Signup</Link>
        </div>
      </div>

    </MainLayout>
  );
}

