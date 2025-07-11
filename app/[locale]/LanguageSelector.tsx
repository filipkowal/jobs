"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { type Locale, i18n } from "@/i18n-config";

export default function LanguageSelector({
  params,
  color,
}: {
  params: { locale: Locale };
  color?: string;
}) {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClick = (event: MouseEvent) => {
      if (buttonRef.current !== event.target) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center font-medium font-title">
      <div
        key={params.locale}
        className="font-medium border-digitalent-white border-b-2 translate-y-px m-4 sm:m-0 cursor-pointer"
        style={{ borderColor: color }}
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonRef}
      >
        {params.locale.toUpperCase()}
      </div>

      {isOpen ? (
        <div className="flex flex-col bg-digitalent-green absolute top-[52px]">
          {i18n.locales.map((locale) => {
            const pathnameWithoutLocale = pathname?.slice(3);
            const localePath = `/${locale}` + pathnameWithoutLocale;

            if (params.locale === locale) {
              return null;
            }

            return (
              <Link key={locale} href={localePath} className="block p-4">
                {locale.toUpperCase()}
              </Link>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
