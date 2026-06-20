"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, FileText, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { type Product } from "@/data/products";
import { generateProductPDF } from "@/lib/pdf-generator";
import { cn } from "@/lib/utils";

interface ProductActionsProps {
  product: Product;
  layout?: "stacked" | "download-only";
  variant?: "default" | "dark";
}

export default function ProductActions({ product, layout = "stacked", variant = "default" }: ProductActionsProps) {
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    if (generatingPDF) return;
    setGeneratingPDF(true);
    try {
      await generateProductPDF(product);
    } catch (err) {
      console.error("Failed to generate product datasheet:", err);
      alert("There was an error generating the PDF. Please try again.");
    } finally {
      setGeneratingPDF(false);
    }
  };

  if (layout === "download-only") {
    return (
      <button
        onClick={handleDownloadPDF}
        disabled={generatingPDF}
        className={cn(
          buttonVariants({ variant: "outline" }),
          variant === "dark"
            ? "border-white/20 text-white hover:bg-white/15"
            : "border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80",
          "px-5 gap-2 h-10 font-bold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {generatingPDF ? (
          <>
            <Loader2 className={cn("h-4 w-4 animate-spin", variant === "dark" ? "text-white" : "text-brand-primary")} />
            Generating Datasheet...
          </>
        ) : (
          <>
            <FileText className={cn("h-4 w-4", variant === "dark" ? "text-white" : "text-brand-primary")} />
            Download Document
          </>
        )}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {/* Enquire Now Link */}
      <Link
        href={`/request-quotation?product=${product.slug}`}
        className={cn(
          buttonVariants({ size: "default" }),
          "w-full bg-brand-primary hover:bg-brand-primary/95 text-white gap-2 py-5 font-semibold text-sm rounded-xl"
        )}
      >
        <MessageSquare className="h-4.5 w-4.5" />
        Enquire Now / Get Quote
      </Link>

      {/* Dynamic PDF Download Button */}
      <button
        onClick={handleDownloadPDF}
        disabled={generatingPDF}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80 gap-2 py-5 font-semibold text-sm rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {generatingPDF ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin text-brand-primary" />
            Generating Datasheet...
          </>
        ) : (
          <>
            <FileText className="h-4.5 w-4.5 text-brand-primary" />
            Download Document
          </>
        )}
      </button>
    </div>
  );
}
