"use client";

import { Dictionary, getCustomHeaderColors, type CustomBoard } from "@/utils";
import { useContext } from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import { PinnedJobsContext } from "./PinnedJobsContextProvider";
import Button from "@/components/Button";
import { Locale } from "@/i18n-config";
import CompareButtonHint from "./CompareButtonHint";
import ButtonWithNumberLabel from "@/components/ButtonWithNumberLabel";

export default function CompareButton({
  params,
  dict,
  customBoard,
}: {
  params: { locale: Locale };
  dict: Dictionary["compareButton"];
  customBoard?: CustomBoard;
}) {
  const router = useRouter();
  const searchParamsString = new URLSearchParams(
    useSearchParams() || undefined
  ).toString();
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const { pinnedJobs } = useContext(PinnedJobsContext);
  const buttonActive = pinnedJobs && pinnedJobs.length > 1;
  const isComparePage = selectedLayoutSegment?.includes("compare");

  function goToComparePage() {
    if (!buttonActive) return;
    router.push(
      `/${params.locale}/compare${
        searchParamsString ? "?" + searchParamsString : ""
      }`
    );
  }

  if (isComparePage) {
    return (
      <GoBackButton
        dict={dict}
        customBoard={customBoard}
        params={params}
        searchParamsString={searchParamsString}
      />
    );
  }

  return (
    <div className="relative hidden sm:block">
      <ButtonWithNumberLabel
        onClick={goToComparePage}
        buttonActive={buttonActive}
        num={pinnedJobs?.length}
        customBoard={customBoard}
        text={dict["compare"]}
      />

      <CompareButtonHint pinnedJobs={pinnedJobs} dict={dict} />
    </div>
  );
}

function GoBackButton({
  dict,
  params,
  searchParamsString,
  customBoard,
}: {
  dict: Dictionary["compareButton"];
  params: { locale: Locale };
  searchParamsString: string;
  customBoard?: CustomBoard;
}) {
  const { textColor, bgColor, isCustom } = getCustomHeaderColors(customBoard);
  const homeUrlObj = {
    pathname:
      "/" + params.locale + (searchParamsString.length > 0 ? "/filtered" : ""),
    search: searchParamsString,
  };

  return (
    <Link href={homeUrlObj}>
      <Button
        name={dict["goBack"]}
        className={`!mx-4 sm:!mx-8  ${
          isCustom
            ? ""
            : "!ring-white !border-white !text-white hover:!bg-white hover:!text-digitalent-green"
        }`}
        style={{
          borderColor: textColor,
          color: textColor,
          backgroundColor: bgColor,
        }}
      >
        {dict["goBack"]}
      </Button>
    </Link>
  );
}
