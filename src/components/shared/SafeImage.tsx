"use client";

import React, { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";

export default function SafeImage({ src, alt, onError, ...props }: ImageProps) {
  const [error, setError] = useState(false);

  // Reset the error state if the src URL changes
  useEffect(() => {
    setError(false);
  }, [src]);

  // Premium vector placeholder SVG themed for biotechnology, healthcare, and life sciences
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" style="background-color:%23090e1a"><rect width="800" height="600" fill="%23090e1a"/><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2310b981" stop-opacity="0.12"/><stop offset="100%" stop-color="%233b82f6" stop-opacity="0.05"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g)"/><circle cx="400" cy="300" r="160" fill="none" stroke="%2310b981" stroke-width="2" stroke-dasharray="8 8" opacity="0.35"/><path d="M 320,300 Q 400,200 480,300 T 640,300" fill="none" stroke="%233b82f6" stroke-width="4" opacity="0.25"/><path d="M 160,300 Q 320,400 400,300 T 480,300" fill="none" stroke="%2310b981" stroke-width="3" opacity="0.25"/><circle cx="400" cy="300" r="12" fill="%2310b981" opacity="0.8"/><text x="50%25" y="52%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="bold" font-size="22" fill="%23e2e8f0" letter-spacing="3">MIRACO BIOCARE</text><text x="50%25" y="58%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="%2394a3b8" letter-spacing="1">Scientific Solution Image</text></svg>`;

  return (
    <Image
      src={error ? fallbackSvg : (src || fallbackSvg)}
      alt={alt}
      onError={(e) => {
        setError(true);
        if (onError) onError(e);
      }}
      {...props}
    />
  );
}
