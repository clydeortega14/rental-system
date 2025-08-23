import { router } from "@inertiajs/react";
import React, { useState, useRef, useEffect } from "react";
import { BookingDetails } from "@/types/rental";
import { BiSmile, BiPaperclip, BiDownload } from "react-icons/bi";
import Picker from "emoji-picker-react";


interface Attachment {
  id: number;
  attachable_id: number;
  attachable_type: string;
  filename: string;
  display_name: string;
  path: string;
  type: string; // e.g., image/png, application/pdf
}
// Types
interface Message {
  id: number;
  sender_id: number;
  sender_role: "lessee" | "lessor";
  message: string;
  is_read: number;
  created_at: string;
  type: "text" | "image" | "pdf";
  attachments?: Attachment[];
  sending?: boolean;
  delivered?: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Conversation {
  id: number;
  uuid: string;
  shop: string;
  shopId: number;
  lessee: User;
  last_message_at: string;
  latest_message: string | null;
  latest_sender?: string | null;
  messages: Message[];
}

interface TempMessage extends Message {
  sending?: boolean; // tracks loading
  delivered?: boolean; // tracks if saved
}


interface LessorInquiriesProps {
  conversations?: Conversation[];
  currentUserId?: number;
  bookings: BookingDetails[];
}

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
  bookings,
}: LessorInquiriesProps) {
  const [conversations, setConversations] = useState<Conversation[]>(propConversations);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);

  const activeConversations = conversations.find((c) => c.id === activeConversationId);
  const [messages, setMessages] = useState<Message[]>(activeConversations?.messages || []);



  useEffect(() => {
    setConversations(propConversations);
    // ✅ Default to first shop if available
    if (propConversations.length > 0 && !activeConversationId) {
      setActiveConversationId(propConversations[0].id);
    }
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

  const activeConversation = conversations.find((c) => c.id === activeConversationId);



  const handleLesseeSendMessage = () => {
    if (!activeConversation || (!newMessage.trim() && !attachment)) return;

    const formData = new FormData();
    formData.append("conversation_id", activeConversation.id.toString());
    formData.append("sender_id", (currentUserId ?? 0).toString());
    formData.append("sender_role", "lessee");

    let tempMsg: Message = {
      id: Date.now(),
      sender_id: currentUserId ?? 0,
      sender_role: "lessee",
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
                    m.id === tempMsg.id ? { ...newMsg, sending: false, delivered: true } : m
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
              ? { ...conv, messages: conv.messages.filter((m) => m.id !== tempMsg.id) }
              : conv
          )
        );
        alert("Failed to send message.");
      },
    });

  };

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

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

  const formatLastMessage = (message: string) => {
    if (message.startsWith("blob:") || /\.(jpg|jpeg|png)$/i.test(message)) {
      return "Sent Image";
    }
    if (/\.pdf$/i.test(message) || message.startsWith("[File]")) {
      return "Sent Attachment";
    }
    return message;
  };

  const filteredConversations = conversations.filter((conv) => {
    const relatedBooking = bookings.find((b) => b.rentalItem?.shopId === conv.shopId);
    const rentalItemName = relatedBooking?.rentalItem?.name || "";
    return rentalItemName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    if (attachment && attachment.type.startsWith("image/")) {
      const url = URL.createObjectURL(attachment);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // cleanup to avoid memory leaks
    } else {
      setPreviewUrl(null);
    }
  }, [attachment]);



  return (
    <div className="h-[80vh] flex bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
      {/* Sidebar - hidden on mobile when chat is active */}
      <aside
        className={`
    border-r bg-white flex-col transition-all duration-300
    ${activeConversation ? "hidden md:flex" : "flex"}
    w-full sm:w-72 md:w-80 lg:w-96
  `}
      >
        <header className="px-6 py-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Messages</h2>
          <input
            type="text"
            placeholder="Search item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
          />
        </header>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 && <p className="p-6 text-gray-500 italic">No Item found.</p>}
          {filteredConversations.map((conv) => {
            const isActive = conv.id === activeConversationId;
            const lastMsg = conv.messages[conv.messages.length - 1];
            const booking = bookings.find((b) => b.rentalItem?.shopId === conv.shopId);

            return (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 border-b text-left transition ${isActive ? "bg-orange-50" : "hover:bg-gray-50"}`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  {getInitials(booking?.rentalItem?.name || "RI")}
                </div>
                <div className="flex-1 truncate">
                  <p className="font-medium text-gray-900">{conv.shop}</p>
                </div>
                <time className="text-xs text-gray-400">{lastMsg ? new Date(lastMsg.created_at).toLocaleDateString() : ""}</time>
              </button>
            );
          })}
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
                if (!booking || activeConversation.latest_sender === "lessor")
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
                // Only show if the current user matches the latest_sender
                // Only display if latest_sender is "lessor"

                return (
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={booking.rentalItem?.imageUrl}
                      alt={booking.rentalItem?.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold">
                          Total Price : ₱{booking.totalPrice}
                        </h2>
                        <span
                          className={`text-sm font-medium px-2 py-0.5 rounded 
                              ${booking.status === "confirmed"
                              ? "text-green-600 bg-green-100"
                              : booking.status === "pending"
                                ? "text-orange-600 bg-orange-100"
                                : booking.status === "completed"
                                  ? "text-red-600 bg-red-100"
                                  : "text-gray-600 bg-gray-100"
                            }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        <span className="font-medium">{booking.rentalItem?.name}</span> - {booking.rentalItem?.description}
                      </p>
                      <p className="text-xs text-gray-400">📍 {booking.rentalItem?.shopLocation}</p>
                    </div>
                  </div>
                );
              })()}


            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50 space-y-4">
              {[...activeConversation.messages].reverse().map((msg, index, arr) => {
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
                  onChange={(e) => setNewMessage(e.target.value)}
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
                onClick={handleLesseeSendMessage}
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