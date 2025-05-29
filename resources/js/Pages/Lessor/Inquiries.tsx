import React, { useState, useRef, useEffect } from "react";

// Types
interface Message {
  id: number;
  sender: "lessee" | "lessor";
  content: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  lesseeName: string;
  messages: Message[];
}

interface InquiriesProps {
  isLessorSidebarOpen?: boolean;
}

const sampleConversations: Conversation[] = [
  {
    id: 1,
    lesseeName: "Alice Smith",
    messages: [
      { id: 1, sender: "lessee", content: "Hi, is the apartment available?", timestamp: "2025-05-25T14:32:00Z" },
      { id: 2, sender: "lessor", content: "Yes, it is available.", timestamp: "2025-05-25T14:35:00Z" },
    ],
  },
  {
    id: 2,
    lesseeName: "Bob Johnson",
    messages: [
      { id: 1, sender: "lessee", content: "Can I schedule a viewing?", timestamp: "2025-05-26T09:15:00Z" },
    ],
  },
];

export default function Inquiries({ isLessorSidebarOpen = false }: InquiriesProps) {
  const [conversations, setConversations] = useState(sampleConversations);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const updatedConversations = conversations.map((conv) =>
      conv.id === activeConversationId
        ? {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: conv.messages.length + 1,
                sender: "lessor",
                content: newMessage.trim(),
                timestamp: new Date().toISOString(),
              },
            ],
          }
        : conv
    );

    setConversations(updatedConversations);
    setNewMessage("");
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.lesseeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[80vh] max-w-full flex bg-gray-50">
      {/* Sidebar - visible always on md+ */}
      <aside className="hidden md:flex flex-col w-96 border-r bg-white">
        <header className="px-6 py-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Messages</h2>
          <input
            type="text"
            placeholder="Search lessee..."
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
                      onClick={() => setActiveConversationId(conv.id)}
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
                          {getInitials(conv.lesseeName)}
                        </div>
                      </td>
                      <td className="p-3 text-gray-900 font-medium truncate">{conv.lesseeName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </aside>

      {/* Conversation panel */}
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
                {activeConversation ? activeConversation.lesseeName : "Conversations"}
                </h2>
                <div className="hidden md:block w-10" />
            </header>
        )}


        {/* Hide mobile list if sidebar is open */}
        {!activeConversation && !isLessorSidebarOpen && (
          <div className="md:hidden overflow-y-auto flex-grow bg-white">
            {filteredConversations.length === 0 ? (
              <p className="p-6 text-gray-500 italic">No conversations found.</p>
            ) : (
              filteredConversations.map((conv) => {
                const lastMsg = conv.messages[conv.messages.length - 1];
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 border-b hover:bg-orange-100 focus:outline-none focus:bg-orange-100"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-400 text-white font-bold flex items-center justify-center">
                      {getInitials(conv.lesseeName)}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="font-medium truncate text-gray-900">{conv.lesseeName}</span>
                      <span className="text-sm text-gray-600 truncate max-w-[250px]">
                        {lastMsg?.content.length > 50 ? lastMsg.content.slice(0, 50) + "..." : lastMsg?.content || ""}
                      </span>
                    </div>
                    <time className="text-xs text-gray-400 ml-auto whitespace-nowrap">
                      {lastMsg ? new Date(lastMsg.timestamp).toLocaleDateString() : ""}
                    </time>
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* Messages */}
        {activeConversation && (
          <>
            <main className="flex-1 overflow-y-auto px-8 py-8 bg-gray-50 space-y-6 max-w-4xl mx-auto w-full">
              {activeConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-xl px-6 py-4 rounded-lg whitespace-pre-wrap break-words shadow
                  ${msg.sender === "lessor" ? "ml-auto bg-orange-500 text-white" : "mr-auto bg-white border border-gray-300"}`}
                >
                  <p className="text-base leading-relaxed">{msg.content}</p>
                  <time className="block text-xs mt-1 text-gray-400">
                    {new Date(msg.timestamp).toLocaleString()}
                  </time>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </main>

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
                className={`px-6 py-3 rounded-lg text-white font-semibold transition
                ${newMessage.trim() ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-300 cursor-not-allowed"}`}
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
