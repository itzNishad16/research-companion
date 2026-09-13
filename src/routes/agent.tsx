import { createFileRoute } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import {
  BookOpen,
  BrainCircuit,
  Database,
  FileSearch,
  Library,
  Search,
  Send,
  TextSearch,
} from "lucide-react";

import {
  AppShell,
  PageHeader,
  Panel,
  ResearchMark,
  ResearchTag,
} from "@/components/research-ui";

import { Button } from "@/components/ui/button";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

import { Shimmer } from "@/components/ai-elements/shimmer";

import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";

import { sendResearchAgentMessage } from "@/lib/research-agent-api";

export const Route = createFileRoute("/agent")({
  head: () => ({
    meta: [
      {
        title: "Research Agent — ResearchAI",
      },
      {
        name: "description",
        content:
          "An AI research partner for discovering, understanding, and organizing academic work.",
      },
      {
        property: "og:title",
        content: "Research Agent — ResearchAI",
      },
      {
        property: "og:description",
        content:
          "An AI research partner for discovering, understanding, and organizing academic work.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: AgentPage,
});

const prompts = [
  "Find recent papers about AI-powered queue prediction.",
  "Compare the methodologies used in my saved papers.",
  "Summarize my saved research papers.",
  "Identify potential research gaps.",
  "Suggest research topics based on my library.",
];

const agentTools: Array<
  [string, ComponentType<{ className?: string }>]
> = [
    ["Paper Search", Search],
    ["Paper Analysis", TextSearch],
    ["Library", Library],
    ["Research Insights", BrainCircuit],
  ];

const agentSteps: Array<
  [string, ComponentType<{ className?: string }>]
> = [
    ["Understanding request", BrainCircuit],
    ["Searching research papers", FileSearch],
    ["Analyzing results", TextSearch],
    ["Consulting library", BookOpen],
    ["Generating response", Send],
  ];

function AgentPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    Array<{
      role: "user" | "assistant";
      content: string;
    }>
  >([]);

  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState("");

  const submit = async (message?: string) => {
    const query = (message ?? question).trim();

    if (!query || thinking) return;

    setError("");

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: query,
      },
    ]);

    setQuestion("");
    setThinking(true);

    try {
      const response = await sendResearchAgentMessage(query);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: response,
        },
      ]);
    } catch (err) {
      console.error(err);

      setError(
        "ResearchAI couldn't connect to the AI agent. Make sure n8n and the Cloudflare tunnel are running."
      );
    } finally {
      setThinking(false);
    }
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Agent Workspace"
        title="Research Agent"
        description="Your AI partner for discovering, understanding, and organizing research."
      />

      <div className="mb-4 grid gap-3 md:grid-cols-4">
        {agentTools.map(([name, Icon]) => (
          <Panel
            key={name}
            className="flex items-center gap-3 p-3"
          >
            <Icon className="size-4 text-primary" />

            <span className="text-xs">
              {name}
            </span>

            <span className="ml-auto size-1.5 rounded-full bg-success" />
          </Panel>
        ))}
      </div>

      <div className="grid min-h-[680px] gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* MAIN CHAT */}
        <Panel className="flex min-h-[680px] flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <ResearchMark compact />

            <div>
              <p className="font-display text-sm font-semibold">
                ResearchAI Agent
              </p>

              <p className="text-[11px] text-muted-foreground">
                Connected to your library and research sources
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2 text-xs">
              <span className="signal-dot size-2 rounded-full bg-success" />
              Agent Online
            </div>
          </div>

          <Conversation className="min-h-0">
            <ConversationContent className="gap-6 p-5">
              {/* EMPTY STATE */}
              {messages.length === 0 && !thinking && (
                <Message from="assistant">
                  <MessageContent className="w-full">
                    <div className="mb-3 flex items-center gap-2">
                      <ResearchMark compact />

                      <span className="font-display text-sm font-semibold">
                        ResearchAI
                      </span>

                      <ResearchTag>
                        AI Research Agent
                      </ResearchTag>
                    </div>

                    <MessageResponse>
                      Ask me anything about your saved research papers.

                      {"\n\n"}

                      I can compare methodologies, identify research
                      gaps, summarize papers, and suggest research topics.
                    </MessageResponse>
                  </MessageContent>
                </Message>
              )}

              {/* CHAT MESSAGES */}
              {messages.map((message, index) => (
                <Message
                  key={`${message.role}-${index}`}
                  from={message.role}
                >
                  <MessageContent
                    className={
                      message.role === "assistant"
                        ? "w-full"
                        : undefined
                    }
                  >
                    {message.role === "assistant" ? (
                      <>
                        <div className="mb-3 flex items-center gap-2">
                          <ResearchMark compact />

                          <span className="font-display text-sm font-semibold">
                            Evidence synthesis
                          </span>

                          <ResearchTag>
                            ResearchAI
                          </ResearchTag>
                        </div>

                        <MessageResponse>
                          {message.content}
                        </MessageResponse>

                        <Tool
                          defaultOpen={false}
                          className="mt-4 border-border bg-secondary/40"
                        >
                          <ToolHeader
                            type="dynamic-tool"
                            toolName="research-agent"
                            state="output-available"
                            title="Research Agent · completed"
                          />

                          <ToolContent>
                            <ToolInput
                              input={{
                                query:
                                  messages[index - 1]?.role ===
                                    "user"
                                    ? messages[index - 1].content
                                    : "Research query",
                              }}
                            />

                            <ToolOutput
                              output="Saved papers analyzed by ResearchAI."
                              errorText={undefined}
                            />
                          </ToolContent>
                        </Tool>
                      </>
                    ) : (
                      message.content
                    )}
                  </MessageContent>
                </Message>
              ))}

              {/* THINKING */}
              {thinking && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer>
                      ResearchAI is analyzing your saved papers…
                    </Shimmer>
                  </MessageContent>
                </Message>
              )}

              {/* ERROR */}
              {error && (
                <Message from="assistant">
                  <MessageContent>
                    <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>

            <ConversationScrollButton />
          </Conversation>

          {/* INPUT */}
          <div className="border-t border-border p-4">
            <PromptInput
              onSubmit={(message) => {
                submit(message.text);
              }}
            >
              <PromptInputTextarea
                value={question}
                onChange={(event) =>
                  setQuestion(event.currentTarget.value)
                }
                placeholder="Ask ResearchAI anything about your research…"
                disabled={thinking}
              />

              <PromptInputFooter>
                <PromptInputTools>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                  >
                    <Database />
                    Library context
                  </Button>
                </PromptInputTools>

                <PromptInputSubmit
                  disabled={!question.trim() || thinking}
                >
                  {thinking ? (
                    <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  ) : (
                    <Send />
                  )}
                </PromptInputSubmit>
              </PromptInputFooter>
            </PromptInput>
          </div>
        </Panel>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">
          {/* AGENT ACTIVITY */}
          <Panel>
            <div className="border-b border-border p-4">
              <h2 className="font-display text-sm font-semibold">
                Agent Activity
              </h2>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Live reasoning workflow
              </p>
            </div>

            <div className="space-y-1 p-3">
              {agentSteps.map(([name, Icon], index) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-md p-2.5"
                >
                  <span
                    className={`grid size-6 place-items-center rounded border ${thinking && index === 1
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-secondary text-muted-foreground"
                      }`}
                  >
                    <Icon className="size-3" />
                  </span>

                  <span className="text-xs">
                    {name}
                  </span>

                  {!thinking && (
                    <span className="ml-auto size-1.5 rounded-full bg-success" />
                  )}

                  {thinking && index === 1 && (
                    <span className="ml-auto size-1.5 animate-pulse rounded-full bg-primary" />
                  )}
                </div>
              ))}
            </div>
          </Panel>

          {/* SUGGESTED PROMPTS */}
          <Panel>
            <div className="p-4">
              <h2 className="font-display text-sm font-semibold">
                Suggested prompts
              </h2>

              <div className="mt-3 space-y-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      if (prompt === "Compare the methodologies used in my saved papers.") {
                        submit(
                          "Compare the methodologies used in my saved research papers. For each paper, explain the methodology, compare the approaches, and identify the strengths, limitations, and research gaps."
                        );
                        return;
                      }

                      setQuestion(prompt);
                    }}
                    disabled={thinking}
                    className="w-full rounded-md border border-border bg-secondary/40 p-3 text-left text-xs leading-5 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}