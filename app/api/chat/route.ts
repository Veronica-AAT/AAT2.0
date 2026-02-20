import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_AGENT_PROMPT, RECRUITMENT_AGENT_PROMPT, ROUTER_PROMPT } from "@/lib/agents";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

async function ollamaChat(
  model: string,
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> {
  const ollamaMessages = [
    { role: "system" as const, content: systemPrompt },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: ollamaMessages,
      stream: false,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Ollama error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return data.message?.content || "";
}

export async function POST(req: NextRequest) {
  try {
    const { messages, agent } = (await req.json()) as {
      messages: ChatMessage[];
      agent: "customer" | "recruitment" | null;
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Determine which agent to use
    let agentMode = agent;

    if (!agentMode) {
      // Use router to classify intent
      const classification = await ollamaChat(
        OLLAMA_MODEL,
        ROUTER_PROMPT,
        [{ role: "user", content: messages[messages.length - 1].content }]
      );

      agentMode = classification.trim().toLowerCase().includes("recruitment")
        ? "recruitment"
        : "customer";
    }

    // Select system prompt based on agent
    const systemPrompt =
      agentMode === "recruitment" ? RECRUITMENT_AGENT_PROMPT : CUSTOMER_AGENT_PROMPT;

    // Call Ollama with the selected agent
    const text = await ollamaChat(
      OLLAMA_MODEL,
      systemPrompt,
      messages.map((m) => ({ role: m.role, content: m.content }))
    );

    return NextResponse.json({ response: text, agent: agentMode });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("ECONNREFUSED") || message.includes("fetch failed")) {
      return NextResponse.json(
        {
          response:
            "Cannot connect to Ollama. Please make sure Ollama is running (run 'ollama serve' in a terminal). Contact info@aatech.sg for assistance.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { response: `AI assistant error: ${message}. Please try again.` },
      { status: 200 }
    );
  }
}
