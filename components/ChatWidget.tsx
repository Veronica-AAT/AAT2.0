"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, Briefcase, Cpu } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AgentMode = "customer" | "recruitment" | null;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentMode, setAgentMode] = useState<AgentMode>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const selectMode = (mode: AgentMode) => {
    setAgentMode(mode);
    const greeting =
      mode === "customer"
        ? "Hello! I'm AAT's technology assistant. I can help you learn about our atomic layer etching solutions, gas delivery systems, remote plasma sources, and other semiconductor processing technologies. What would you like to know?"
        : "Hi there! I'm AAT's careers assistant. I can tell you about open positions, our company culture, benefits, and the application process. How can I help you today?";
    setMessages([{ role: "assistant", content: greeting }]);
  };

  const resetChat = () => {
    setAgentMode(null);
    setMessages([]);
    setInput("");
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          agent: agentMode,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again or contact us directly at info@aatech.sg.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent hover:bg-primary-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-dark px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">AAT Assistant</p>
                <p className="text-gray-400 text-xs">
                  {agentMode === "customer"
                    ? "Products & Technology"
                    : agentMode === "recruitment"
                    ? "Careers & Opportunities"
                    : "Ask us anything"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {agentMode && (
                <button
                  onClick={resetChat}
                  className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded border border-gray-600 hover:border-gray-400 transition-colors"
                >
                  New Chat
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Agent selector or messages */}
          <div className="flex-1 overflow-y-auto">
            {!agentMode ? (
              <div className="p-6 flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Welcome to AAT</h3>
                <p className="text-gray-500 text-sm text-center mb-6">
                  How can we help you today? Choose a topic to get started.
                </p>
                <div className="space-y-3 w-full">
                  <button
                    onClick={() => selectMode("customer")}
                    className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-accent hover:bg-accent/5 transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Products & Technology</p>
                      <p className="text-xs text-gray-500">
                        ALE, gas delivery, plasma sources, applications
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => selectMode("recruitment")}
                    className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-accent hover:bg-accent/5 transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Careers & Opportunities</p>
                      <p className="text-xs text-gray-500">
                        Open positions, culture, benefits, how to apply
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-accent text-white rounded-br-md"
                          : "bg-gray-100 text-gray-800 rounded-bl-md"
                      }`}
                    >
                      {msg.content.split("\n").map((line, j) => (
                        <p key={j} className={j > 0 ? "mt-2" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3.5 h-3.5 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          {agentMode && (
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-accent"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 bg-accent hover:bg-primary-500 disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-full flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                AI-powered assistant. For urgent inquiries, contact info@aatech.sg
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
