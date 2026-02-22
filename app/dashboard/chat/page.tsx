"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { GlobeIcon, MessageSquareIcon } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";

import {
  Message,
  MessageContent,
} from "@/components/ai-elements/message";

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

export default function ChatPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading =
    status === "submitted" || status === "streaming";

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
      <Conversation className="relative flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Start a conversation"
              description="Ask about your customers, insights, or promotions."
              icon={<MessageSquareIcon className="size-6" />}
            />
          ) : (
            messages.map((m) => (
              <Message key={m.id} from={m.role}>
                <MessageContent>
                  {m.parts
                    .filter((p) => p.type === "text")
                    .map((p) =>
                      p.type === "text" ? p.text : ""
                    )
                    .join("")}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>

      {/* Prompt Input */}
      <div className="border-t p-4">
        <PromptInputProvider>
          <PromptInput
            globalDrop
            multiple
            onSubmit={handleSubmit}
          >
            <PromptInputBody>
              <PromptInputTextarea
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Ask about your customers..."
                disabled={isLoading}
              />
            </PromptInputBody>

            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>

                <PromptInputButton>
                  <GlobeIcon size={16} />
                  <span>Search</span>
                </PromptInputButton>
              </PromptInputTools>

              <PromptInputSubmit status={status} />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </div>
  );
}