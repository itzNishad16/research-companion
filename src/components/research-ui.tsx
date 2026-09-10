import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  BarChart3, Bell, BookOpen, Bot, BrainCircuit, ChevronDown, Compass,
  FileSearch, Grid2X2, Heart, LayoutDashboard, Library, List, Menu, Search,
  Settings, SlidersHorizontal, Sparkle, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import researcherProfile from "@/assets/researcher-profile.jpg";
import type { Paper } from "@/lib/research-data";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/discover", label: "Discover Papers", icon: Compass },
  { to: "/library", label: "My Library", icon: Library },
  { to: "/agent", label: "AI Research Agent", icon: Bot },
  { to: "/insights", label: "Research Insights", icon: BarChart3 },
] as const;

export function ResearchMark({ compact = false }: { compact?: boolean }) {
  return <div className={`${compact ? "size-8" : "size-9"} grid shrink-0 place-items-center rounded-[5px] bg-primary text-primary-foreground`}><BrainCircuit className="size-4" /></div>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border bg-background transition-transform lg:sticky lg:top-0 lg:h-screen ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
          <ResearchMark compact />
          <div className="min-w-0 leading-tight"><p className="font-display text-[13px] font-semibold">ResearchAI</p><p className="truncate text-[10px] text-muted-foreground">AI Research Workspace</p></div>
          <Button variant="ghost" size="icon-sm" className="ml-auto lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></Button>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          <p className="px-3 pb-2 text-[10px] uppercase text-muted-foreground">Workspace</p>
          {navItems.map((item) => { const Icon = item.icon; const active = pathname === item.to; return (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-md border px-3 py-2 text-[13px] font-medium transition-colors ${active ? "border-primary/20 bg-primary/10 text-foreground" : "border-transparent text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}>
              <Icon className={`size-4 ${active ? "text-primary" : ""}`} />{item.label}
            </Link>
          ); })}
          <p className="px-3 pb-2 pt-5 text-[10px] uppercase text-muted-foreground">System</p>
          <button className="flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"><Settings className="size-4" />Settings</button>
        </nav>
        <div className="border-t border-border p-3"><div className="flex items-center gap-3 rounded-md p-2 hover:bg-accent/50">
          <img src={researcherProfile} alt="Dr. Maya Feld" width={512} height={512} loading="lazy" className="size-9 shrink-0 rounded-full object-cover ring-1 ring-border" />
          <div className="min-w-0 leading-tight"><p className="truncate text-xs font-medium">Dr. Maya Feld</p><p className="truncate text-[10px] text-muted-foreground">Comp. Neuroscience</p></div><ChevronDown className="ml-auto size-3 text-muted-foreground" />
        </div></div>
      </aside>
      {open && <button className="fixed inset-0 z-40 bg-background/80 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:px-6">
          <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu /></Button>
          <div className="flex h-9 min-w-0 max-w-md items-center gap-2.5 rounded-md border border-border bg-card px-3"><Search className="size-4 shrink-0 text-muted-foreground" /><input className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground" placeholder="Search papers, authors, methods…" /><kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">⌘K</kbd></div>
          <div className="flex items-center gap-2"><div className="hidden h-9 items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 sm:flex"><span className="signal-dot size-2 rounded-full bg-primary" /><span className="text-xs font-medium">Agent Online</span><span className="hidden border-l border-primary/20 pl-2 text-[10px] text-muted-foreground xl:inline">scanning 42 sources</span></div><Button variant="outline" size="icon-sm" aria-label="Notifications"><Bell /></Button></div>
        </header>
        <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description?: string; actions?: ReactNode }) {
  return <div className="page-rise mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><p className="text-[11px] uppercase text-primary">{eyebrow}</p><h1 className="mt-1 truncate font-display text-2xl font-semibold sm:text-3xl">{title}</h1>{description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}</div>{actions}</div>;
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) { return <section className={`rounded-lg border border-border bg-card ${className}`}>{children}</section>; }
export function PanelHeader({ title, meta, action }: { title: string; meta?: string; action?: ReactNode }) { return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3 sm:px-5"><div className="min-w-0"><h2 className="truncate font-display text-sm font-semibold">{title}</h2>{meta && <p className="mt-0.5 text-[11px] text-muted-foreground">{meta}</p>}</div>{action}</div>; }

export function ResearchTag({ children }: { children: ReactNode }) { return <span className="inline-flex rounded border border-border bg-secondary px-2 py-1 text-[10px] text-muted-foreground">{children}</span>; }

export function PaperCard({ paper, compact = false }: { paper: Paper; compact?: boolean }) {
  const [saved, setSaved] = useState(Boolean(paper.favorite));
  if (compact) return <div className="group grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border px-4 py-3 transition-colors last:border-b-0 hover:bg-accent/30"><div className="min-w-0"><Link to="/papers/$paperId" params={{ paperId: paper.id }} className="font-display text-sm font-medium hover:text-primary">{paper.title}</Link><p className="mt-1 truncate text-[11px] text-muted-foreground">{paper.authors} · {paper.venue} · {paper.citations} citations</p></div><div className="flex shrink-0 gap-1"><Button variant="ghost" size="icon-sm" onClick={() => setSaved(!saved)} aria-label="Favorite paper"><Heart className={saved ? "fill-primary text-primary" : ""} /></Button><Button variant="ghost" size="icon-sm" asChild><Link to="/papers/$paperId" params={{ paperId: paper.id }} aria-label="Open paper"><BookOpen /></Link></Button></div></div>;
  return <article className="group rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><div className="min-w-0"><p className="text-[10px] uppercase text-info">{paper.venue}{paper.year ? ` · ${paper.year}` : ""}</p><Link to="/papers/$paperId" params={{ paperId: paper.id }} className="mt-1 block font-display text-base font-semibold leading-snug hover:text-primary">{paper.title}</Link><p className="mt-1 text-xs text-muted-foreground">{paper.authors}</p></div>{paper.relevance != null && <div className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-center"><p className="font-display text-sm font-semibold text-primary">{paper.relevance}%</p><p className="text-[9px] text-muted-foreground">match</p></div>}</div>
    <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted-foreground">{paper.abstract}</p><div className="mt-3 flex flex-wrap gap-1.5">{paper.topics.map(t => <ResearchTag key={t}>{t}</ResearchTag>)}</div>
    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3"><span className="mr-auto text-[11px] text-muted-foreground">{paper.citations} citations</span><Button variant="ghost" size="sm"><Sparkle />AI Summary</Button><Button variant="outline" size="sm" onClick={() => setSaved(!saved)}>{saved ? <Heart className="fill-primary text-primary" /> : <Heart />}{saved ? "Saved" : "Save"}</Button>{paper.url ? <Button size="sm" asChild><a href={paper.url} target="_blank" rel="noopener noreferrer">Open Paper</a></Button> : <Button size="sm" asChild><Link to="/papers/$paperId" params={{ paperId: paper.id }}>Open Paper</Link></Button>}</div>
  </article>;
}

export function SearchControls() { const [loading, setLoading] = useState(false); return <Panel className="mb-5 p-3"><div className="flex flex-col gap-3 md:flex-row"><div className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-md border border-border bg-background px-3"><FileSearch className="size-4 text-primary" /><input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Search millions of research papers…" /></div><Button className="h-11" onClick={() => {setLoading(true); setTimeout(() => setLoading(false), 1100)}}>{loading ? <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" /> : <Search />}{loading ? "Searching" : "Search"}</Button></div><div className="mt-3 flex flex-wrap gap-2">{["Year: 2020–2026", "Topic: All", "Sort: Relevance"].map(x => <Button key={x} variant="outline" size="sm"><SlidersHorizontal />{x}</Button>)}</div></Panel>; }

export function ViewToggle({ view, onChange }: { view: "grid" | "list"; onChange: (view: "grid" | "list") => void }) { return <div className="flex rounded-md border border-border bg-card p-1"><Button variant={view === "grid" ? "secondary" : "ghost"} size="icon-sm" onClick={() => onChange("grid")} aria-label="Grid view"><Grid2X2 /></Button><Button variant={view === "list" ? "secondary" : "ghost"} size="icon-sm" onClick={() => onChange("list")} aria-label="List view"><List /></Button></div>; }