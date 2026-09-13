export const RESEARCH_AGENT_URL =
    "https://sussex-packets-walls-comparable.trycloudflare.com/webhook/research-agent";
type AgentResponse = {
    content?: {
        parts?: Array<{
            text?: string;
        }>;
    };
    response?: string;
    output?: string;
    text?: string;
};

export async function sendResearchAgentMessage(
    query: string
): Promise<string> {
    const res = await fetch(RESEARCH_AGENT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
        }),
    });

    if (!res.ok) {
        throw new Error(`Research Agent failed (${res.status})`);
    }

    const data = (await res.json()) as AgentResponse;

    // Gemini "Message a Model" response
    const geminiText = data.content?.parts?.[0]?.text;

    if (geminiText) {
        return geminiText;
    }

    // Fallbacks for other response formats
    if (data.response) return data.response;
    if (data.output) return data.output;
    if (data.text) return data.text;

    return "ResearchAI returned an empty response.";
}