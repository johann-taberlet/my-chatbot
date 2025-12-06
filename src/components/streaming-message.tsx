"use client";

import { useEffect, useRef } from "react";
import { MessageResponse } from "@/components/ai-elements/message";
import { useStream } from "@/hooks/use-stream";

export function StreamingMessage({
  text,
  animate = false,
}: {
  text: string;
  animate?: boolean;
}) {
  const contentRef = useRef("");
  const { stream, addPart } = useStream();

  useEffect(() => {
    if (!text || !animate) return;

    if (contentRef.current !== text) {
      const delta = text.slice(contentRef.current.length);
      if (delta) {
        addPart(delta);
      }
      contentRef.current = text;
    }
  }, [text, animate, addPart]);

  const displayText = animate ? (stream ?? text ?? "") : text;

  return <MessageResponse>{displayText}</MessageResponse>;
}
