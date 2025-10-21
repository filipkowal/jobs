"use client";

import { useEffect, useRef, useState } from "react";

export default function Tooltip({
  children,
  content,
  ariaLabel,
  disabled,
}: {
  children: React.ReactNode;
  content: string;
  ariaLabel: string;
  disabled?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const childrenRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [right, setRight] = useState(0);

  useEffect(() => {
    const { offsetWidth: contentWidth = 0 } = contentRef.current ?? {};
    const { offsetWidth: childrenWidth = 0 } = childrenRef.current ?? {};

    setRight(-contentWidth / 2 + childrenWidth / 2);
  }, [childrenRef.current?.offsetWidth, contentRef.current?.offsetWidth]);

  return (
    <span className={`relative w-[${childrenRef.current?.offsetWidth || 0}px]`}>
      <span
        onMouseEnter={() => !disabled && setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        ref={childrenRef}
      >
        {children}
      </span>

      <div
        className={`sm:inline-block absolute bg-white text-digitalent-blue p-4 opacity-0 transition-all duration-300 ${
          isVisible ? "opacity-100 z-20" : "z-0 pointer-events-none"
        }`}
        style={{ right: `${right}px`, top: `calc(100% + 24px)` }}
        aria-label={ariaLabel}
        aria-describedby={isVisible ? "tooltip-content" : ""}
        ref={contentRef}
      >
        <div className="relative">
          <div
            style={{
              whiteSpace: "normal",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              width: "max-content",
              maxWidth: "10rem",
            }}
          >
            {content}
          </div>

          {/* arrow */}
          <div
            className="absolute top-[-24px] left-[47%]"
            style={{
              width: "0",
              height: "0",
              border: "solid",
              borderWidth: "0 10px 10px 10px",
              borderColor: "transparent transparent white transparent",
            }}
          />
        </div>
      </div>
    </span>
  );
}
