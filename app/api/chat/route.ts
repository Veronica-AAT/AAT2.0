import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_AGENT_PROMPT, RECRUITMENT_AGENT_PROMPT, ROUTER_PROMPT } from "@/lib/agents";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

async function geminiChat(
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const contents = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    {
      role: "model",
      parts: [{ text: "Understood. I will follow these instructions." }],
    },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
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
      const classification = await geminiChat(
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

    // Call Gemini with the selected agent
    const text = await geminiChat(
      systemPrompt,
      messages.map((m) => ({ role: m.role, content: m.content }))
    );

    return NextResponse.json({ response: text, agent: agentMode });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("GEMINI_API_KEY")) {
      return NextResponse.json(
        {
          response:
            "AI service is not configured. Please set the GEMINI_API_KEY environment variable. Contact info@aatech.sg for assistance.",
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
