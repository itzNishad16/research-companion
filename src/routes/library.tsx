import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppShell, PageHeader, Panel, PaperCard, ResearchTag, ViewToggle } from "@/components/research-ui";
import { Button } from "@/components/ui/button";
import { getSavedPapers } from "@/lib/library-api";
import type { Paper } from "@/lib/research-data";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "My Library — ResearchAI" },
      { name: "description", content: "Organize saved academic papers, favorites, and research topics." },
      { property: "og:title", content: "My Library — ResearchAI" },
      { property: "og:description", content: "Organize saved academic papers, favorites, and research topics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadLibrary() {
      try {
        setLoading(true);
        setError("");
        const saved = await getSavedPapers();
        if (!cancelled) setPapers(saved);
      } catch (err) {
        console.error("Failed to load library:", err);
        if (!cancelled) setError("Could not load your library from Supabase.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadLibrary();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPapers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return papers;

    return papers.filter((paper) =>
      [paper.title, paper.authors, paper.venue, paper.abstract, ...paper.topics]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [papers, query]);

  const refreshLibrary = async () => {
    try {
      setError("");
      setPapers(await getSavedPapers());
    } catch (err) {
      console.error("Failed to refresh library:", err);
      setError("Could not refresh your library.");
    }
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Personal Corpus"
        title="My Library"
        description={`${papers.length} saved ${papers.length === 1 ? "paper" : "papers"} in your research corpus.`}
        actions={<ViewToggle view={view} onChange={setView} />}
      />

      <Panel className="mb-4 p-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex h-9 flex-1 items-center gap-2 rounded-md border border-border bg-background px-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              className="min-w-0 flex-1 bg-transparent text-xs outline-none"
              placeholder="Search your library…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm"><SlidersHorizontal />All Topics</Button>
          <Button variant="outline" size="sm" onClick={() => void refreshLibrary()}>Refresh</Button>
        </div>
      </Panel>

      {!loading && papers.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Array.from(new Set(papers.flatMap((paper) => paper.topics))).slice(0, 5).map((topic) => (
            <ResearchTag key={topic}>{topic}</ResearchTag>
          ))}
        </div>
      )}

      {loading ? (
        <Panel className="p-10 text-center">
          <p className="text-sm text-muted-foreground">Loading your research library…</p>
        </Panel>
      ) : error ? (
        <Panel className="p-10 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <Button className="mt-4" variant="outline" size="sm" onClick={() => void refreshLibrary()}>Try Again</Button>
        </Panel>
      ) : filteredPapers.length === 0 ? (
        <Panel className="p-10 text-center">
          <LibraryEmptyState hasSearch={Boolean(query.trim())} />
        </Panel>
      ) : view === "grid" ? (
        <section className="grid gap-3 xl:grid-cols-2">
          {filteredPapers.map((paper) => <PaperCard key={paper.id} paper={paper} />)}
        </section>
      ) : (
        <Panel>
          {filteredPapers.map((paper) => <PaperCard key={paper.id} paper={paper} compact />)}
        </Panel>
      )}
    </AppShell>
  );
}

function LibraryEmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <>
      <p className="font-display text-sm font-semibold">
        {hasSearch ? "No matching papers" : "Your library is empty"}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {hasSearch
          ? "Try a different title, author, venue, or keyword."
          : "Save papers from Discover Papers and they will appear here automatically."}
      </p>
    </>
  );
}
