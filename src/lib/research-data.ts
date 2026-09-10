export type Paper = {
  id: string;
  title: string;
  authors: string;
  year?: number | undefined;
  venue: string;
  abstract: string;
  topics: string[];
  citations: number;
  relevance?: number | undefined;
  url?: string | undefined;
  favorite?: boolean;
};

export const papers: Paper[] = [
  { id: "sparse-attention", title: "Sparse Attention in Long-Context Transformers", authors: "Chen, Okafor & Reyes", year: 2025, venue: "NeurIPS 2025", abstract: "We introduce an adaptive sparse attention mechanism that preserves retrieval accuracy across million-token contexts while reducing inference cost.", topics: ["Transformers", "Sparse Attention", "Long Context"], citations: 248, relevance: 98, favorite: true },
  { id: "multimodal-retrieval", title: "Contrastive Pre-training for Multimodal Retrieval", authors: "Novak & Lindqvist", year: 2025, venue: "ICLR 2025", abstract: "A unified contrastive objective aligns scientific text, figures, and tables for robust cross-modal retrieval in technical literature.", topics: ["Multimodal AI", "Retrieval", "Representation Learning"], citations: 137, relevance: 94 },
  { id: "queue-prediction", title: "AI-Powered Queue Prediction in Dynamic Service Systems", authors: "Banerjee, Lewis & Zhao", year: 2024, venue: "IEEE T-ITS", abstract: "A temporal graph framework predicts queue formation under non-stationary arrival patterns using interpretable uncertainty estimates.", topics: ["Queue Prediction", "Graph Learning", "Forecasting"], citations: 86, relevance: 91, favorite: true },
  { id: "mixed-precision", title: "Gradient Pathologies in Mixed-Precision Training", authors: "Adeyemi", year: 2024, venue: "JMLR", abstract: "This study characterizes failure modes in low-precision optimization and proposes stable scaling rules for large neural systems.", topics: ["Optimization", "Deep Learning", "Efficiency"], citations: 64, relevance: 87 },
  { id: "rag-evaluation", title: "Evaluating Retrieval-Augmented Generation Beyond Accuracy", authors: "Feld, Raman & Ito", year: 2025, venue: "ACL 2025", abstract: "We present a multidimensional evaluation protocol for grounded generation spanning attribution, coverage, calibration, and utility.", topics: ["RAG", "Evaluation", "NLP"], citations: 112, relevance: 89, favorite: true },
];

export const activityData = [
  { day: "Wed", discovered: 18, analyzed: 11 }, { day: "Thu", discovered: 24, analyzed: 17 },
  { day: "Fri", discovered: 21, analyzed: 14 }, { day: "Sat", discovered: 31, analyzed: 22 },
  { day: "Sun", discovered: 27, analyzed: 20 }, { day: "Mon", discovered: 39, analyzed: 28 },
  { day: "Tue", discovered: 34, analyzed: 25 },
];