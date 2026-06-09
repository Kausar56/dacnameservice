"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { CodeBlock } from "./code-block";
import {
  ARTICLES,
  ARTICLE_ORDER,
  groupLabelOf,
  type DocArticle,
  type DocBlock,
} from "./docs-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const CALLOUT_META = {
  info: { icon: Info, wrap: "border-dac-cyan/25 bg-dac-cyan/[0.05]", color: "text-dac-cyan" },
  success: {
    icon: CheckCircle2,
    wrap: "border-dac-green/25 bg-dac-green/[0.05]",
    color: "text-dac-green",
  },
  warn: {
    icon: AlertTriangle,
    wrap: "border-warning/30 bg-warning/[0.05]",
    color: "text-warning",
  },
} as const;

export function DocsContent({
  article,
  onSelect,
}: {
  article: DocArticle;
  onSelect: (id: string) => void;
}) {
  const idx = ARTICLE_ORDER.indexOf(article.id);
  const prev = idx > 0 ? ARTICLES[ARTICLE_ORDER[idx - 1]] : null;
  const next =
    idx < ARTICLE_ORDER.length - 1 ? ARTICLES[ARTICLE_ORDER[idx + 1]] : null;

  return (
    <motion.article
      key={article.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="min-w-0"
    >
      {/* Header */}
      <header className="mb-8 border-b border-white/[0.06] pb-6">
        <div className="flex items-center gap-3">
          <Badge variant="default" size="sm">
            {groupLabelOf(article)}
          </Badge>
          <span className="inline-flex items-center gap-1.5 text-caption">
            <Clock className="size-3.5" />
            {article.readingTime}
          </span>
        </div>
        <h1 className="text-h2 mt-4 text-foreground">{article.title}</h1>
        <p className="text-body-lg mt-3">{article.summary}</p>
      </header>

      {/* Body */}
      <div className="space-y-5">
        {article.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {/* Prev / Next */}
      <nav className="mt-12 grid grid-cols-1 gap-3 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
        {prev ? (
          <button
            type="button"
            onClick={() => onSelect(prev.id)}
            className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition-colors hover:border-dac-cyan/30 hover:bg-white/[0.04]"
          >
            <span className="inline-flex items-center gap-1.5 text-caption">
              <ArrowLeft className="size-3.5" />
              Previous
            </span>
            <span className="mt-1 text-sm font-medium text-foreground group-hover:text-dac-cyan">
              {prev.title}
            </span>
          </button>
        ) : (
          <span />
        )}
        {next && (
          <button
            type="button"
            onClick={() => onSelect(next.id)}
            className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right transition-colors hover:border-dac-cyan/30 hover:bg-white/[0.04] sm:items-end"
          >
            <span className="inline-flex items-center gap-1.5 text-caption">
              Next
              <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-1 text-sm font-medium text-foreground group-hover:text-dac-cyan">
              {next.title}
            </span>
          </button>
        )}
      </nav>
    </motion.article>
  );
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          id={block.id}
          className="text-h4 scroll-mt-28 pt-4 text-foreground"
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return <p className="text-body leading-relaxed text-muted-foreground">{block.text}</p>;
    case "list":
      return block.ordered ? (
        <ol className="ml-5 list-decimal space-y-2 text-muted-foreground marker:text-dac-cyan">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1 leading-relaxed">
              {it}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-2">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-dac-cyan" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "code":
      return <CodeBlock lang={block.lang} code={block.code} />;
    case "callout": {
      const meta = CALLOUT_META[block.tone];
      const Icon = meta.icon;
      return (
        <div
          className={cn(
            "flex items-start gap-3 rounded-xl border p-4",
            meta.wrap
          )}
        >
          <Icon className={cn("mt-0.5 size-5 shrink-0", meta.color)} />
          <p className="text-body-sm text-foreground/90">{block.text}</p>
        </div>
      );
    }
    default:
      return null;
  }
}
