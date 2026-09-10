import type { Paper } from "@/lib/research-data";

// n8n backend endpoint (temporary Cloudflare Quick Tunnel URL — update here when it changes)
export const RESEARCH_SEARCH_URL =
  "https://thomas-runs-competing-scales.trycloudflare.com/webhook/research-search";

export type BackendPaper = {
  title: string;
  authors: string;
  abstract: string;
  year: number | null;
  venue: string;
  url: string;
  citation_count: number;
  main_topic: string;
  key_idea: string;
  research_problem: string;
  methodology: string;
  important_findings: string;
  research_gap: string;
};

type SearchResponse = { papers?: BackendPaper[] };

export async function searchResearchPapers(query: string): Promise<Paper[]> {
  const res = await fetch(RESEARCH_SEARCH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`Search failed (${res.status})`);
  const data = (await res.json()) as SearchResponse;
  if (!Array.isArray(data.papers)) throw new Error("Unexpected response from search service");
  return data.papers.map(mapBackendPaper);
}

function mapBackendPaper(p: BackendPaper, index: number): Paper {
  return {
    id: p.url || `result-${index}`,
    title: p.title || "Untitled paper",
    authors: p.authors || "Unknown authors",
    year: p.year ?? undefined,
    venue: p.venue || "Research archive",
    abstract: p.abstract || "No abstract available.",
    topics: p.main_topic ? [p.main_topic] : [],
    citations: p.citation_count ?? 0,
    relevance: undefined,
    url: p.url || undefined,
  };
}
