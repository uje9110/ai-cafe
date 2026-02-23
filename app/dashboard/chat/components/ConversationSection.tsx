import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { UIMessage } from "ai";
import { MessageSquareIcon } from "lucide-react";

export const ConversationSection = ({
  messages,
}: {
  messages: UIMessage[];
}) => {
  return (
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
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("")}
              </MessageContent>
            </Message>
          ))
        )}
      </ConversationContent>

      <ConversationScrollButton />
    </Conversation>
  );
};
