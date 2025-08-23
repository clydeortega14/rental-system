import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { usePage, router } from '@inertiajs/react';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
}

interface Conversation {
  id: number;
  user: User;
  messages: Message[];
}

interface InquiriesProps {
  isLessorSidebarOpen?: boolean;
  authUserId: number;
  shopData: {
    ownerId?: number;
    shopName?: string;
    shopOwner?: string;
  } | null;
}

export default function Inquiries({ isLessorSidebarOpen = false, authUserId, shopData }: InquiriesProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize active conversation if shopData is passed
  useEffect(() => {
    // Try to restore the last active conversation from localStorage
    const storedActiveId = localStorage.getItem("activeConversationId");
    if (storedActiveId) {
      setActiveConversationId(Number(storedActiveId));
    } else if (shopData?.ownerId) {
      setActiveConversationId(shopData.ownerId);
    }
  }, [shopData]);

  useEffect(() => {
  if (!activeConversationId) return;

  // Save active conversation to localStorage
  localStorage.setItem("activeConversationId", activeConversationId.toString());

  axios
    .get(route("getConversation", { sender: authUserId, receiver: activeConversationId }))
    .then((res) => {
      setConversations((prev) => {
        // Add conversation if it doesn't exist
        if (!prev.some((c) => c.id === activeConversationId)) {
          return [
            ...prev,
            {
              id: activeConversationId,
              user: { id: activeConversationId, name: shopData?.shopOwner ?? "Shop Owner", email: "" },
              messages: res.data.messages,
            },
          ];
        }
        // Update messages if conversation exists
        return prev.map((conv) =>
          conv.id === activeConversationId ? { ...conv, messages: res.data.messages } : conv
        );
      });
      setShouldScrollToBottom(true);
    })
    .catch((err) => console.error("Error fetching messages:", err));
}, [activeConversationId]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    axios
      .post("/messages", {
        sender_id: authUserId,
        receiver_id: activeConversation.id,
        message: newMessage.trim(),
      })
      .then((res) => {
        const updatedConversations = conversations.map((conv) =>
          conv.id === activeConversation.id
            ? { ...conv, messages: [...conv.messages, res.data] }
            : conv
        );
        setConversations(updatedConversations);
        setNewMessage("");
        setShouldScrollToBottom(true);
      });
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    if (shouldScrollToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setShouldScrollToBottom(false);
    }
  }, [activeConversation?.messages, shouldScrollToBottom]);

  return (
    <div className="h-[80vh] max-w-full flex bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-96 border-r bg-white">
        <header className="px-6 py-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Messages</h2>
          <input
            type="text"
            placeholder="Search Lessee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
            aria-label="Search lessee"
          />
        </header>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <p className="p-6 text-gray-500 italic">No conversations found.</p>
          ) : (
            <table className="min-w-full table-fixed">
              <tbody>
                {filteredConversations.map((conv) => {
                  const isActive = conv.id === activeConversationId;
                  return (
                    <tr
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.user.id)}
                      tabIndex={0}
                      className={`cursor-pointer border-b hover:bg-orange-50 focus:bg-orange-100 outline-none ${
                        isActive ? "bg-orange-100" : ""
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveConversationId(conv.id);
                        }
                      }}
                    >
                      <td className="p-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-400 text-white font-semibold select-none">
                          {getInitials(conv.user.name)}
                        </div>
                      </td>
                      <td className="p-3 text-gray-900 font-medium truncate">
                        {conv.user.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </aside>

      {/* Main Chat Section */}
      <section className="flex-1 flex flex-col bg-white">
        {/* Header */}
        {!(isLessorSidebarOpen && window.innerWidth < 768) && (
          <header className="flex items-center gap-4 px-6 py-5 border-b shadow-sm sticky top-0 bg-white z-20 md:justify-between">
            {activeConversationId && (
              <button
                onClick={() => setActiveConversationId(null)}
                aria-label="Go back"
                className="md:hidden text-orange-500 font-bold text-2xl"
              >
                ←
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-700 truncate">
              {activeConversation ? activeConversation.user.name : "Conversations"}
            </h2>
            <div className="hidden md:block w-10" />
          </header>
        )}

        {/* Messages */}
        {activeConversation && (
          <>
            <main className="flex-1 overflow-y-auto px-8 py-8 bg-gray-50 space-y-6 max-w-4xl mx-auto w-full">
              {activeConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-xl px-6 py-4 rounded-lg whitespace-pre-wrap break-words shadow ${
                    msg.sender_id === authUserId
                      ? "ml-auto bg-orange-500 text-white"
                      : "mr-auto bg-white border border-gray-300"
                  }`}
                >
                  <p className="text-base leading-relaxed">{msg.message}</p>
                  <time className="block text-xs mt-1 text-gray-400">
                    {new Date(msg.created_at).toLocaleString()}
                  </time>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </main>

            {/* Message Input */}
            <footer className="px-8 py-6 border-t bg-white flex items-center gap-6 max-w-4xl mx-auto w-full">
              <input
                type="text"
                className="flex-grow border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                aria-label="Type your message"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
                  newMessage.trim()
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </footer>
          </>
        )}
      </section>
    </div>
  );
}
