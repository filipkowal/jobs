"use client";

import NextLink from "next/link";
import { ReactElement } from "react";
import { UrlObject } from "node:url";
import { encodeSearchParams, SearchParams } from "../utils";
import { ParsedUrlQueryInput } from "node:querystring";
import { ParsedQuery } from "query-string";

interface HrefObject extends Omit<UrlObject, "query"> {
  query?: null | ParsedUrlQueryInput | ParsedQuery | undefined | SearchParams;
}

export default function Link({
  href,
  children,
  scroll = true,
  ...props
}: {
  children: ReactElement | string;
  className?: string;
  href: HrefObject | string;
  target?: string;
  onClick?: () => void;
  scroll?: boolean;
}) {
  function scrollToTop() {
    if (typeof window === "undefined") return;

    window.scrollTo({ top: 0 });
  }

  return (
    <NextLink
      href={encodeSearchParams(href)}
      {...props}
      onClick={scroll ? scrollToTop : undefined}
    >
      {children}
    </NextLink>
  );
}
