import React, { useState, useRef, useEffect } from "react";
import { BiSmile, BiPaperclip } from "react-icons/bi";
import Picker from "emoji-picker-react";
import echo from "@/echo";
import { LessorInquiriesProps, Conversation, Message } from "@/types/chat";
import { handleLesseeSendMessage } from "@/utils/chat";

// Utility functions
const getInitials = (name: string) =>
  name
    .trim()
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export default function LessorInquiries({
  conversations: propConversations = [],
  currentUserId,
  currentUserName,
  bookings,

}: LessorInquiriesProps) {
  const [conversations, setConversations] = useState<Conversation[]>(propConversations);
  const [activeShopId, setActiveShopId] = useState<number | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState<{ userId: number; name: string } | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    setConversations(propConversations);
    // ✅ Default to first shop if available
    // if (propConversations.length > 0 && !activeConversationId) {
    //   setActiveConversationId(propConversations[0].id);
    // }
  }, [propConversations]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    }

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);


  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!activeConversationId) return;

    echo.private(`conversations.${activeConversationId}`)
      .whisper("typing", {
        userId: currentUserId,
        name: currentUserName,
      });
  };

  const onEmojiClick = (emojiObject: any) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, or PDF allowed");
      return;
    }
    setAttachment(file);
    e.target.value = "";
  };

  useEffect(() => {
    if (attachment && attachment.type.startsWith("image/")) {
      const url = URL.createObjectURL(attachment);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // cleanup to avoid memory leaks
    } else {
      setPreviewUrl(null);
    }
  }, [attachment]);

  useEffect(() => {
    if (!echo.connector) return;

    const pusher = (echo.connector as any).pusher;
    if (!pusher) return;

    const logError = (err: any) =>
      console.error("❌ Reverb connection error:", err);

    const logDisconnected = () =>
      console.warn("⚠️ Reverb disconnected");

    const logConnecting = () =>
      console.log("🔄 Reverb reconnecting...");

    const logConnected = () => {
      console.log("✅ Connected to Reverb", {
        socketId: pusher.connection.socket_id,
        host: pusher.config.wsHost,
        port: pusher.config.forceTLS
          ? pusher.config.wssPort
          : pusher.config.wsPort,
        secure: pusher.config.forceTLS ?? false,
      });
      console.log("📡 Active channels:", pusher.channels);
    };

    console.log("🔌 Reverb is connecting to:", {
      wsHost: pusher.config.wsHost,
      wsPort: pusher.config.wsPort,
      wssPort: pusher.config.wssPort,
      forceTLS: pusher.config.forceTLS,
    });

    // Bind listeners
    pusher.connection.bind("error", logError);
    pusher.connection.bind("disconnected", logDisconnected);
    pusher.connection.bind("connecting", logConnecting);
    pusher.connection.bind("connected", logConnected);

    // ✅ Cleanup on unmount
    return () => {
      pusher.connection.unbind("error", logError);
      pusher.connection.unbind("disconnected", logDisconnected);
      pusher.connection.unbind("connecting", logConnecting);
      pusher.connection.unbind("connected", logConnected);
    };
  }, []);

  useEffect(() => {
    if (!activeConversationId) return;

    const channelName = `conversations.${activeConversationId}`;
    console.log("📡 Subscribing to channel:", channelName);

    const channel = echo.private(channelName);

    // ✅ log when subscribed
    channel.subscribed(() => {
      console.log(`✅ Subscribed to ${channelName}`);
    });

    channel.error((err: any) => {
      console.error(`❌ Error on channel ${channelName}:`, err);
    });

    channel.listen("MessageSent", (event: any) => {
      console.log("💬 Message received:", event);
      setConversations((prev) => {
        const updated = prev.map((c) => {
          if (c.id === event.conversationId) {
            console.log("✅ Updating conversation:", c.id);
            return {
              ...c,
              messages: [...c.messages, event.message],
              latest_message: event.message.message,
              last_message_at: event.message.created_at ?? new Date().toISOString(),
            };
          }
          return c;
        });
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return updated;
      });
    });

    // 🔹 Listen for typing whispers
    channel.listenForWhisper("typing", (data: { userId: number; name: string }) => {
      console.log("⌨️ Typing whisper received:", data);
      if (data.userId !== currentUserId) {
        setIsTyping({ userId: data.userId, name: data.name });
        setTimeout(() => setIsTyping(null), 3000);
      }
    });

    return () => {
      console.log("🚪 Leaving channel:", channelName);
      channel.stopListening("MessageSent");
      channel.stopListening("typing"); // ✅ cleanup whisper listener too
      echo.leave(channelName);
    };
  }, [activeConversationId]);

  const shopsWithConversations = conversations.reduce((acc, conv) => {
    const isLessor = conv.is_owned_by_user; // ✅ true if current user owns the shop (lessor)

    if (!acc[conv.shopId]) {
      acc[conv.shopId] = {
        shopId: conv.shopId,
        shopName: conv.shop,
        conversations: [],
        lesseeCount: 0,
        isLessor,
      };
    }

    acc[conv.shopId].conversations.push(conv);

    if (isLessor) {
      acc[conv.shopId].lesseeCount = acc[conv.shopId].conversations.length;
    }

    return acc;
  }, {} as Record<
    number,
    {
      shopId: number;
      shopName: string;
      conversations: Conversation[];
      lesseeCount: number;
      isLessor: boolean;
    }
  >);

  const shopsArray = Object.values(shopsWithConversations);

  return (
    <div className="h-[80vh] flex bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
      {/* Sidebar */}
      <aside
        className={`
          border-r bg-white flex-col transition-all duration-300
          ${activeConversation ? "hidden md:flex" : "flex"}
          w-full sm:w-72 md:w-80 lg:w-96
        `}
      >
        <header className="px-6 py-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Messages</h2>
          {/* Lessee only search */}
          {shopsArray.some((s) => !s.isLessor) && (
            <input
              type="text"
              placeholder="Search item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
            />
          )}
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* LESSOR: show shops */}
          {!activeShopId &&
            shopsArray
              .filter((s) => s.isLessor)
              .map((shop) => (
                <button
                  key={shop.shopId}
                  onClick={() => setActiveShopId(shop.shopId)}
                  className={`w-full flex items-center gap-3 px-4 py-4 border-b hover:bg-gray-50 ${activeShopId === shop.shopId ? "bg-gray-100" : ""
                    }`}
                >
                  <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                    {getInitials(shop.shopName)}
                  </div>
                  <div className="flex-1 truncate">
                    <p className="font-medium text-gray-900">{shop.shopName}</p>
                    <p className="text-xs text-gray-500">
                      {shop.lesseeCount} {shop.lesseeCount === 1 ? "conversation" : "conversations"}
                    </p>
                  </div>
                </button>
              ))}

          {/* LESSEE: show conversations directly */}
          {!activeShopId &&
            shopsArray
              .filter((s) => !s.isLessor)
              .flatMap((s) => s.conversations)
              .map((conv) => {
                const isActive = conv.id === activeConversationId;
                const lastMsg = conv.messages[conv.messages.length - 1];
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full flex items-center gap-3 px-4 py-4 border-b text-left transition ${isActive ? "bg-orange-50" : "hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                      {getInitials(conv.shop)}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-medium text-gray-900">{conv.shop}</p>
                      <p className="text-xs text-gray-500 truncate">{lastMsg?.message}</p>
                    </div>
                  </button>
                );
              })}

          {/* Active shop (lessor only) */}
          {activeShopId &&
            (() => {
              const shop = shopsArray.find((s) => s.shopId === activeShopId && s.isLessor);
              if (!shop) return null;
              return (
                <>
                  <button
                    onClick={() => setActiveShopId(null)}
                    className="px-4 py-2 text-sm text-orange-600 font-medium"
                  >
                    ← Back to Shops
                  </button>
                  {shop.conversations.map((conv) => {
                    const lastMsg = conv.messages[conv.messages.length - 1];
                    return (
                      <button
                        key={conv.id}
                        onClick={() => setActiveConversationId(conv.id)}
                        className={`w-full flex items-center gap-3 px-4 py-4 border-b hover:bg-gray-50 ${activeConversationId === conv.id ? "bg-gray-100" : ""
                          }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                          {getInitials(conv.lessee?.name || "U")}
                        </div>
                        <div className="flex-1 truncate">
                          <p className="font-medium text-gray-900">{conv.lessee?.name}</p>
                          <p className="text-xs text-gray-500 truncate">{lastMsg?.message}</p>
                        </div>
                      </button>
                    );
                  })}
                </>
              );
            })()}
        </div>
      </aside>

      {/* Chat Section */}
      <section className="flex-1 flex flex-col bg-white overflow-hidden">
        {activeConversation ? (
          <>
            {/* Header */}
            <header className="flex items-center gap-4 px-4 py-3 border-b shadow-sm sticky top-0 bg-white z-20">
              <button
                onClick={() => setActiveConversationId(null)}
                aria-label="Back"
                className="md:hidden text-orange-500 font-bold text-xl"
              >
                ←
              </button>

              {(() => {
                const booking = bookings.find((b) => b.rentalItem?.shopId === activeConversation.shopId);
                if (!booking || activeConversation.latest_sender === "lessor") {

                  return <div className="flex items-center gap-3 p-3  rounded-lg w-full max-w-full overflow-hidden">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm sm:w-12 sm:h-12 sm:text-base">
                      {activeConversation.lessee?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </div>

                    {/* Name & Email inline */}
                    <div className="flex flex-col truncate">
                      <span className="font-semibold text-gray-900 truncate">
                        {activeConversation.lessee?.name || "No name"}
                      </span>
                      <span className="text-sm text-gray-500 truncate">
                        {activeConversation.lessee?.email || "No email"}
                      </span>
                    </div>
                  </div>;
                }
                return (
                  <div className="flex items-center gap-4 w-full">
                    {/* <img
                      src={booking.rentalItem?.imageUrl}
                      alt={booking.rentalItem?.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    /> */}
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-lg">
                      {activeConversation.shop.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold">
                          {activeConversation.shop}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })()}


            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50 space-y-4">
              {[...(activeConversation?.messages || [])]
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) // ✅ oldest → newest
                .map((msg, index, arr) => {
                  const isCurrentUser =
                    msg.sender_id === currentUserId &&
                    (msg.sender_role === "lessee" || msg.sender_role === "lessor");

                  return (
                    <div
                      key={msg.id}
                      ref={index === arr.length - 1 ? messagesEndRef : null} // scroll to last
                      className={`px-5 py-3 rounded-2xl shadow ${isCurrentUser ? "ml-auto bg-jaba-yellow text-white" : "mr-auto bg-white border"
                        } max-w-[75%] sm:max-w-[65%] w-fit relative`}
                    >
                      {/* Message text */}
                      {msg.message && !msg.attachments?.length && <p>{msg.message}</p>}

                      {/* Attachments */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="space-y-2">
                          {msg.attachments.map((file) => {
                            const fileUrl = `/storage/messages/${file.filename}.${file.type}`;

                            if (["jpg", "jpeg", "png", "gif", "webp"].includes(file.type.toLowerCase())) {
                              return (
                                <div key={file.id} className="flex flex-col items-start">
                                  <img
                                    src={fileUrl}
                                    alt={file.display_name || file.filename}
                                    className="rounded-lg max-w-[250px] w-full object-cover"
                                  />
                                  <p className="text-xs text-gray-600 mt-1">
                                    {file.display_name || file.filename}.{file.type}
                                  </p>
                                </div>
                              );
                            }

                            if (file.type.toLowerCase() === "pdf") {
                              return (
                                <a
                                  key={file.id}
                                  href={fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded text-sm text-blue-600 underline"
                                >
                                  <BiPaperclip /> {file.display_name || file.filename}
                                </a>
                              );
                            }

                            return (
                              <a
                                key={file.id}
                                href={fileUrl}
                                download
                                className="flex items-center gap-2 px-2 py-1 rounded text-sm"
                              >
                                <BiPaperclip /> {file.display_name || file.filename}
                              </a>
                            );
                          })}
                        </div>
                      )}

                      {/* Time + read status */}
                      <div className="flex items-center justify-between mt-1">
                        <time className="text-xs text-black">{timeAgo(msg.created_at)}</time>
                      </div>
                    </div>
                  );
                })}
            </main>
            {isTyping && (
              <div className="px-6 pb-2 text-sm text-gray-500 italic flex items-center gap-1">
                {isTyping.name ? `${isTyping.name} is typing` : "The other user is typing"}
                <span className="flex gap-1">
                  <span className="animate-bounce [animation-delay:0ms]">.</span>
                  <span className="animate-bounce [animation-delay:150ms]">.</span>
                  <span className="animate-bounce [animation-delay:300ms]">.</span>
                </span>
              </div>
            )}

            {/* Input */}
            <footer className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-white flex items-center gap-3 relative">
              {/* Attachment (left side on mobile) */}
              <button
                type="button"
                className="text-gray-500 hover:text-orange-500 transition text-2xl block sm:hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                <BiPaperclip />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />

              {/* Attachment preview */}
              {attachment && (
                <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded max-w-[150px] sm:max-w-none overflow-hidden">
                  {attachment.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(attachment)}
                      alt="Preview"
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="truncate text-sm">{attachment.name}</span>
                  )}
                  <button
                    onClick={() => setAttachment(null)}
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Input with emoji inside (on mobile) */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={newMessage}
                  onChange={handleTyping}   // ✅ new handler with whisper
                  className="w-full pr-10 pl-3 sm:px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 text-sm sm:text-base"
                />

                {/* Emoji inside input (mobile only) */}
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition text-xl block sm:hidden"
                >
                  <BiSmile />
                </button>

                {/* Emoji picker (popup) */}
                {showEmojiPicker && (
                  <div
                    ref={emojiRef}
                    className="
                      fixed sm:absolute 
                      bottom-20 sm:bottom-12 
                      left-1/2 sm:left-auto sm:right-0 
                      -translate-x-1/2 sm:translate-x-0
                      z-50 bg-white shadow-lg rounded-lg
                      max-w-[80vw] sm:max-w-none
                      max-h-[45vh] overflow-y-auto
                    "
                  >
                    <Picker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>

              {/* Desktop controls (emoji + attachment inline) */}
              <div className="hidden sm:flex items-center gap-3">
                {/* Emoji */}
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="text-gray-500 hover:text-orange-500 transition text-2xl"
                >
                  <BiSmile />
                </button>

                {/* Attachment */}
                <button
                  type="button"
                  className="text-gray-500 hover:text-orange-500 transition text-2xl"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <BiPaperclip />
                </button>
              </div>

              {/* Send button */}
              <button
                onClick={() =>
                  handleLesseeSendMessage({
                    activeConversation,
                    activeConversationId,
                    newMessage,
                    attachment,
                    currentUserId,
                    setConversations,
                    setNewMessage,
                    setAttachment,
                  })
                }
                disabled={!newMessage.trim() && !attachment}
                className={`ml-2 px-4 sm:px-5 py-2 rounded-lg text-white font-medium transition ${newMessage.trim() || attachment
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Send
              </button>
            </footer>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-500">
            <p className="text-lg font-medium">Select a shop to view messages</p>
          </div>
        )}
      </section>
    </div>
  );
}