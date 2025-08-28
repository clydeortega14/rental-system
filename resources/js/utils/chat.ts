import { router } from "@inertiajs/react";
import { Conversation, Message } from "@/types/chat";

interface SendMessageParams {
    activeConversation: Conversation | null;
    activeConversationId: number | null;
    newMessage: string;
    attachment: File | null;
    currentUserId?: number;
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    setAttachment: React.Dispatch<React.SetStateAction<File | null>>;
}

export const handleLesseeSendMessage = ({
    activeConversation,
    activeConversationId,
    newMessage,
    attachment,
    currentUserId,
    setConversations,
    setNewMessage,
    setAttachment,
}: SendMessageParams) => {
    if (!activeConversation || (!newMessage.trim() && !attachment)) return;
    const formData = new FormData();
    const senderRole =
        currentUserId === activeConversation?.lessee?.id ? "lessee" : "lessor";
    formData.append("conversation_id", activeConversation.id.toString());
    formData.append("sender_id", (currentUserId ?? 0).toString());
    formData.append("sender_role", senderRole);

    let tempMsg: Message = {
        id: Date.now(),
        sender_id: currentUserId ?? 0,
        sender_role: senderRole,
        message: newMessage,
        type: "text",
        is_read: 0,
        created_at: new Date().toISOString(),
        sending: true,
    };

    if (attachment) {
        formData.append("file", attachment);
        if (attachment.type.startsWith("image/")) {
            tempMsg.message = URL.createObjectURL(attachment);
            tempMsg.type = "image";
            formData.append("type", "image");
        } else {
            tempMsg.message = attachment.name;
            tempMsg.type = "pdf";
            formData.append("type", "pdf");
        }
    } else {
        formData.append("message", newMessage);
        formData.append("type", "text");
    }

    // Add temp message
    setConversations((prev) =>
        prev.map((conv) =>
            conv.id === activeConversationId
                ? { ...conv, messages: [...conv.messages, tempMsg] }
                : conv
        )
    );
    setNewMessage("");
    setAttachment(null);

    // Send to backend
    router.post(route("conversations.store.lessee"), formData, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: (page: any) => {
            const newMsg = page.props.flash?.message ?? null;
            if (newMsg) {
                setConversations((prev) =>
                    prev.map((conv) =>
                        conv.id === activeConversationId
                            ? {
                                ...conv,
                                messages: conv.messages.map((m) =>
                                    m.id === tempMsg.id
                                        ? { ...newMsg, sending: false, delivered: true }
                                        : m
                                ),
                                latest_message: newMsg.message,
                                last_message_at: newMsg.created_at,
                            }
                            : conv
                    )
                );
            }
        },
        onError: () => {
            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === activeConversationId
                        ? {
                            ...conv,
                            messages: conv.messages.filter((m) => m.id !== tempMsg.id),
                        }
                        : conv
                )
            );
            alert("Failed to send message.");
        },
    });
};
