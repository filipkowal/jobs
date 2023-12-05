"use client";

import { type CustomBoard } from "../../utils";

import { useContext } from "react";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";

import PinIcon from "../../components/icons/PinIcon";
import { CompareContext } from "./CompareContextProvider";
import Button from "../../components/Button";
import { Locale } from "../../i18n-config";
import CompareButtonHint from "./CompareButtonHint";

export default function CompareButton({
  params,
  dict,
  customBoard,
}: {
  params: { locale: Locale };
  dict: { "Go back": string; Compare: string; compareButtonHint: string };
  customBoard?: CustomBoard;
}) {
  const searchParamsString = new URLSearchParams(
    useSearchParams() || undefined
  ).toString();
  const selectedLayoutSegment = useSelectedLayoutSegment();

  const { likedJobs } = useContext(CompareContext);
  const buttonActive = likedJobs && likedJobs.length > 1;

  const headerTextC = customBoard?.colors.headerText;
  const headerBgC = customBoard?.colors.headerBackground;
  const isCustomColors = customBoard && headerTextC && headerBgC;

  if (selectedLayoutSegment?.includes("compare")) {
    return (
      <Link
        href={{
          pathname:
            "/" +
            params.locale +
            (searchParamsString.length > 0 ? "/filtered" : ""),
          search: searchParamsString,
        }}
      >
        <Button
          name="Go back"
          className={`!mx-4 sm:!mx-8  ${
            isCustomColors
              ? ""
              : "!ring-white !border-white !text-white hover:!bg-white hover:!text-digitalent-green"
          }`}
          style={{
            borderColor: headerTextC,
            color: headerTextC,
            backgroundColor: headerBgC,
          }}
        >
          {dict["Go back"]}
        </Button>
      </Link>
    );
  }

  return (
    <div className="relative hidden sm:block">
      {!buttonActive ? (
        <ButtonWithNumberIcon />
      ) : (
        <Link
          href={{
            pathname: "/" + params.locale + "/compare",
            search: searchParamsString,
          }}
        >
          <ButtonWithNumberIcon />
        </Link>
      )}

      <CompareButtonHint
        likedJobs={likedJobs}
        dict={{ compareButtonHint: dict.compareButtonHint }}
      />
    </div>
  );

  function ButtonWithNumberIcon() {
    return (
      <Button
        className={`group !mx-4 sm:!mx-8 flex gap-2 relative ${
          buttonActive && !isCustomColors
            ? "hover:!text-digitalent-green animate-pulse repeat-[2]"
            : ""
        }`}
        name="Compare"
        disabled={!buttonActive}
        type="invert"
        style={{
          borderColor: headerTextC,
          backgroundColor: headerBgC,
          color: headerTextC,
        }}
      >
        {dict.Compare}

        <PinIcon
          color={headerTextC || "white"}
          className={`-translate-y-[1px] ${
            buttonActive && `group-hover:hidden`
          }`}
        />
        <PinIcon
          color={headerTextC || "#66B573"}
          className={`-translate-y-[1px] hidden ${
            buttonActive && `group-hover:block`
          }`}
        />

        {likedJobs?.length > 0 && (
          <div
            className={`text-digitalent-green bg-white rounded-full w-6 h-6 absolute -bottom-[5px] -right-[5px] ${
              buttonActive
                ? "group-hover:text-white group-hover:bg-digitalent-green"
                : ""
            }`}
            style={{
              backgroundColor: headerTextC,
              color: headerBgC,
            }}
          >
            {likedJobs?.length}
          </div>
        )}
      </Button>
    );
  }
}
