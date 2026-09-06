import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, BrainCircuit, ChartNoAxesCombined, FileText, Layers3 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { AppShell, PageHeader, Panel, PanelHeader, ResearchTag } from "@/components/research-ui";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { activityData, papers } from "@/lib/research-data";

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
  const metrics = [
    ["Saved Papers", "128", "+12 this week", BookOpen],
    ["Research Topics", "23", "4 emerging", Layers3],
    ["Papers Analyzed", "312", "18 today", BrainCircuit],
    ["Research Insights", "47", "+8 generated", ChartNoAxesCombined],
  ] as const;
  return (
    <AppShell><PageHeader eyebrow="Overview" title="Good evening, Researcher." description="Your AI research workspace is ready." />
      <Panel className="page-rise p-2"><div className="flex flex-col gap-3 p-3 md:flex-row md:items-center"><div className="grid size-8 shrink-0 place-items-center rounded-md border border-primary/25 bg-primary/15"><span className="signal-dot size-2 rounded-full bg-primary" /></div><input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Ask ResearchAI anything about your research…" /><div className="flex items-center gap-2"><span className="rounded-md border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground">Library context</span><Button asChild><Link to="/agent">Run Agent <ArrowRight /></Link></Button></div></div></Panel>
      <section className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">{metrics.map(([label, value, detail, Icon], i) => <Panel key={label} className="page-rise p-4" ><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"><div><p className="text-[11px] text-muted-foreground">{label}</p><p className="mt-2 font-display text-3xl font-semibold">{value}</p><p className={`mt-1 text-[11px] ${i % 2 ? "text-primary" : "text-info"}`}>{detail}</p></div><Icon className="size-4 text-muted-foreground" /></div></Panel>)}</section>
      <section className="mt-4 grid gap-4 xl:grid-cols-12"><Panel className="xl:col-span-8"><PanelHeader title="Continue Research" meta="Resume where your agent left off" action={<Button variant="link" size="sm" asChild><Link to="/library">Open library <ArrowRight /></Link></Button>} /><div>{papers.slice(0,3).map((p, i) => <Link key={p.id} to="/papers/$paperId" params={{paperId:p.id}} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-border px-5 py-3 last:border-0 hover:bg-accent/30"><div className="min-w-0"><div className="flex items-center gap-2"><span className={`size-1.5 shrink-0 rounded-full ${i === 1 ? "bg-info" : "bg-primary"}`} /><p className="truncate text-[13px] font-medium">{p.title}</p></div><p className="mt-1 pl-3.5 text-[11px] text-muted-foreground">{p.authors} · {p.venue}</p></div><ResearchTag>{i === 0 ? "In Review" : i === 1 ? "Agent Suggested" : "Recently Added"}</ResearchTag></Link>)}</div></Panel>
        <Panel className="xl:col-span-4"><PanelHeader title="Trending Research Topics" meta="Momentum across your fields" /><div className="space-y-4 p-5">{[["Retrieval-Augmented Generation",92],["Long-Context Attention",74],["Multimodal Pre-training",61],["Efficient Fine-Tuning",48],["Agent Orchestration",35]].map(([topic,score],i) => <div key={topic}><div className="mb-1.5 flex items-center justify-between text-xs"><span>{topic}</span><span className={i===0?"text-info":"text-muted-foreground"}>{score}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-secondary"><div className={i%2?"h-full rounded-full bg-info":"h-full rounded-full bg-primary"} style={{width:`${score}%`}} /></div></div>)}</div></Panel>
        <Panel className="xl:col-span-12"><PanelHeader title="Research Activity" meta="Papers discovered and analyzed over the last 7 days" /><div className="h-56 p-4"><ChartContainer config={{discovered:{label:"Discovered",color:"var(--info)"},analyzed:{label:"Analyzed",color:"var(--primary)"}}} className="h-full w-full aspect-auto"><AreaChart data={activityData}><defs><linearGradient id="fillDiscovered" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-discovered)" stopOpacity={0.35}/><stop offset="95%" stopColor="var(--color-discovered)" stopOpacity={0}/></linearGradient><linearGradient id="fillAnalyzed" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-analyzed)" stopOpacity={0.3}/><stop offset="95%" stopColor="var(--color-analyzed)" stopOpacity={0}/></linearGradient></defs><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="day" axisLine={false} tickLine={false}/><ChartTooltip content={<ChartTooltipContent />} /><Area dataKey="discovered" type="monotone" stroke="var(--color-discovered)" fill="url(#fillDiscovered)" strokeWidth={2}/><Area dataKey="analyzed" type="monotone" stroke="var(--color-analyzed)" fill="url(#fillAnalyzed)" strokeWidth={2}/></AreaChart></ChartContainer></div></Panel>
      </section>
    </AppShell>
  );
}
