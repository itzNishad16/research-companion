import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, BrainCircuit, FileText, Layers3 } from "lucide-react";
import { AppShell, PageHeader, Panel, PanelHeader, ResearchTag } from "@/components/research-ui";
import { Button } from "@/components/ui/button";
import { papers } from "@/lib/research-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ResearchAI — AI Research Workspace" },
    { name: "description", content: "An intelligent workspace for discovering, analyzing, and organizing academic research." },
    { property: "og:title", content: "ResearchAI — AI Research Workspace" },
    { property: "og:description", content: "An intelligent workspace for discovering, analyzing, and organizing academic research." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  return (
    <AppShell><PageHeader eyebrow="Overview" title="Research Workspace" description="Your AI-powered research companion." />
      <Panel className="page-rise p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center"><div className="grid size-8 shrink-0 place-items-center rounded-md border border-primary/25 bg-primary/10"><BrainCircuit className="size-4 text-primary" /></div><input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Ask ResearchAI anything about your research…" /><div className="flex items-center gap-2"><Button asChild><Link to="/agent">Ask Agent <ArrowRight /></Link></Button></div></div></Panel>
      <section className="mt-5 grid gap-4 xl:grid-cols-12"><Panel className="xl:col-span-8"><PanelHeader title="Continue Research" meta="Recent papers from your library" action={<Button variant="link" size="sm" asChild><Link to="/library">Open library <ArrowRight /></Link></Button>} /><div>{papers.slice(0,3).map((p, i) => <Link key={p.id} to="/papers/$paperId" params={{paperId:p.id}} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-border px-5 py-3 last:border-0 hover:bg-accent/50"><div className="min-w-0"><div className="flex items-center gap-2"><span className="size-1.5 shrink-0 rounded-full bg-primary" /><p className="truncate text-[13px] font-medium">{p.title}</p></div><p className="mt-1 pl-3.5 text-[11px] text-muted-foreground">{p.authors} · {p.venue}</p></div><ResearchTag>{p.favorite ? "Saved" : "Recent"}</ResearchTag></Link>)}</div></Panel>
        <Panel className="xl:col-span-4"><PanelHeader title="Quick Actions" /><div className="space-y-2 p-5"><Button variant="outline" className="w-full justify-start" asChild><Link to="/discover"><BookOpen className="mr-2 size-4" />Discover Papers</Link></Button><Button variant="outline" className="w-full justify-start" asChild><Link to="/agent"><BrainCircuit className="mr-2 size-4" />Ask Research Agent</Link></Button><Button variant="outline" className="w-full justify-start" asChild><Link to="/insights"><Layers3 className="mr-2 size-4" />View Insights</Link></Button></div></Panel>
      </section>
    </AppShell>
  );
}
