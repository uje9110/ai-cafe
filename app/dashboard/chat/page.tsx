"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ConversationSection } from "./components/ConversationSection";
import PromptSection from "./components/PromptSection";

export default function ChatPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await sendMessage({
      text: input,
    });
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Conversation */}
      <ConversationSection messages={messages} />

      {/* Prompt Input */}
      <PromptSection
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        status={status}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
