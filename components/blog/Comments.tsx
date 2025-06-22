"use client";

import { useEffect, useRef } from "react";

export default function Comments({ slug }: { slug: string }) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Giscus
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "g-but/botsmann-blog-content");
    script.setAttribute("data-repo-id", "R_kgDOODOnUA"); // Replace with actual repo ID from Giscus setup
    script.setAttribute("data-category", "Blog Comments");
    script.setAttribute("data-category-id", "DIC_kwDOODOnUM4CnkL1"); // Replace with actual category ID from Giscus setup
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      if (commentsRef.current) {
        const giscusFrame = commentsRef.current.querySelector(
          "iframe.giscus-frame",
        );
        if (giscusFrame) {
          commentsRef.current.removeChild(giscusFrame);
        }
      }
    };
  }, [slug]);

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Comments</h2>
      <div ref={commentsRef} />
    </div>
  );
}
