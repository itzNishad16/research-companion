import { supabase } from "@/lib/supabase";
import type { Paper } from "@/lib/research-data";

type PaperRow = {
  id: number;
  title: string;
  authors: string | null;
  abstract: string | null;
  year: number | null;
  venue: string | null;
  url: string | null;
  citation_count: number | null;
};

function toPaper(row: PaperRow): Paper {
  return {
    id: String(row.id),
    title: row.title,
    authors: row.authors || "Unknown authors",
    year: row.year ?? undefined,
    venue: row.venue || "Research archive",
    abstract: row.abstract || "No abstract available.",
    topics: [],
    citations: row.citation_count ?? 0,
    url: row.url ?? undefined,
    favorite: true,
  };
}

async function findExistingPaper(paper: Paper) {
  if (paper.url) {
    const { data, error } = await supabase
      .from("papers")
      .select("id")
      .eq("url", paper.url)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("papers")
    .select("id")
    .eq("title", paper.title)
    .eq("authors", paper.authors)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function savePaper(paper: Paper) {
  const paperData = {
    title: paper.title,
    authors: paper.authors,
    abstract: paper.abstract,
    year: paper.year ?? null,
    venue: paper.venue,
    url: paper.url ?? null,
    citation_count: paper.citations ?? 0,
  };

  let paperId: number;

  if (paper.url) {
    const { data, error } = await supabase
      .from("papers")
      .upsert(paperData, { onConflict: "url" })
      .select("id")
      .single();

    if (error) throw error;
    paperId = data.id;
  } else {
    const existing = await findExistingPaper(paper);

    if (existing) {
      paperId = existing.id;
    } else {
      const { data, error } = await supabase
        .from("papers")
        .insert(paperData)
        .select("id")
        .single();

      if (error) throw error;
      paperId = data.id;
    }
  }

  const { error: saveError } = await supabase
    .from("saved_papers")
    .upsert({ paper_id: paperId }, { onConflict: "paper_id" });

  if (saveError) throw saveError;

  return paperId;
}

export async function removeSavedPaper(paper: Paper) {
  let paperId: number;

  // Library items use the database id as their Paper id.
  if (/^\d+$/.test(paper.id)) {
    paperId = Number(paper.id);
  } else {
    const existing = await findExistingPaper(paper);
    if (!existing) return;
    paperId = existing.id;
  }

  const { error } = await supabase
    .from("saved_papers")
    .delete()
    .eq("paper_id", paperId);

  if (error) throw error;
}

export async function toggleSavedPaper(paper: Paper, currentlySaved: boolean) {
  if (currentlySaved) {
    await removeSavedPaper(paper);
    return false;
  }

  await savePaper(paper);
  return true;
}

export async function getSavedPapers(): Promise<Paper[]> {
  const { data, error } = await supabase
    .from("saved_papers")
    .select(`
      paper_id,
      saved_at,
      papers (
        id,
        title,
        authors,
        abstract,
        year,
        venue,
        url,
        citation_count
      )
    `)
    .order("saved_at", { ascending: false });

  if (error) throw error;

  return (data ?? [])
    .map((row) => {
      const paper = row.papers as unknown as PaperRow | null;
      return paper ? toPaper(paper) : null;
    })
    .filter((paper): paper is Paper => paper !== null);
}
