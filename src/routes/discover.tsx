import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, Panel, PaperCard, SearchControls } from "@/components/research-ui";
import { searchResearchPapers } from "@/lib/research-api";
import type { Paper } from "@/lib/research-data";

export const Route = createFileRoute("/discover")({ head: () => ({ meta: [{title:"Discover Papers — ResearchAI"},{name:"description",content:"Search and evaluate academic papers with AI-assisted relevance insights."},{property:"og:title",content:"Discover Papers — ResearchAI"},{property:"og:description",content:"Search and evaluate academic papers with AI-assisted relevance insights."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}] }), component: Discover });

function Discover(){
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function runSearch(){
    const q = query.trim();
    if (!q || loading) return;
    setLoading(true); setError(null); setSearched(true);
    try {
      setResults(await searchResearchPapers(q));
    } catch {
      setResults([]);
      setError("The research search service could not be reached. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return <AppShell><PageHeader eyebrow="Discovery Engine" title="Discover Papers" description="Search across journals, conferences, and open research archives."/><SearchControls query={query} onQueryChange={setQuery} onSearch={runSearch} loading={loading}/>
    <div className="mb-3 flex items-center justify-between"><p className="text-xs text-muted-foreground">{searched && !loading && !error ? `${results.length} result${results.length === 1 ? "" : "s"} · returned by the ResearchAI backend` : "Enter a research question to search the ResearchAI backend"}</p></div>
    {loading && <section className="grid gap-3 xl:grid-cols-2">{[0,1,2,3].map(i => <Panel key={i} className="h-44 animate-pulse p-5"><div className="h-3 w-24 rounded bg-secondary"/><div className="mt-3 h-4 w-3/4 rounded bg-secondary"/><div className="mt-2 h-3 w-1/2 rounded bg-secondary"/><div className="mt-4 h-3 w-full rounded bg-secondary"/><div className="mt-2 h-3 w-5/6 rounded bg-secondary"/></Panel>)}</section>}
    {!loading && error && <Panel className="p-8 text-center"><p className="font-display text-sm font-semibold">Search unavailable</p><p className="mt-1 text-xs text-muted-foreground">{error}</p></Panel>}
    {!loading && !error && searched && results.length === 0 && <Panel className="p-8 text-center"><p className="font-display text-sm font-semibold">No papers found</p><p className="mt-1 text-xs text-muted-foreground">Try a different query or broader research topic.</p></Panel>}
    {!loading && !error && <section className="grid gap-3 xl:grid-cols-2">{results.map(p=><PaperCard key={p.id} paper={p}/>)}</section>}
  </AppShell>;
}
