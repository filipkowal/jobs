"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";

import { CompareContext } from "./CompareContextProvider";
import Button from "../../components/Button";
import pinIcon from "../../public/pinIcon.png";
import pinIconGreen from "../../public/pinIconGreen.png";
import { Locale } from "../../i18n-config";
import CompareButtonHint from "./CompareButtonHint";

export default function CompareButton({
  params,
  dict,
}: {
  params: { locale: Locale };
  dict: { "Go back": string; Compare: string; compareButtonHint: string };
}) {
  const searchParamsString = new URLSearchParams(
    useSearchParams() || undefined
  ).toString();
  const selectedLayoutSegment = useSelectedLayoutSegment();

  const { likedJobs } = useContext(CompareContext);
  const buttonActive = likedJobs && likedJobs.length > 1;

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
          className="!mx-4 sm:!mx-8 !ring-white !border-white !text-white hover:!bg-white hover:!text-digitalent-green"
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
          buttonActive
            ? "hover:!text-digitalent-green animate-pulse repeat-[2]"
            : ""
        } `}
        name="Compare"
        disabled={!buttonActive}
        type="invert"
      >
        {dict.Compare}

        <Image
          src={pinIcon}
          alt="pin icon"
          width={24}
          height={24}
          className={`-translate-y-[1px] ${
            buttonActive && `group-hover:hidden`
          }`}
        />
        <Image
          src={pinIconGreen}
          alt="pin icon"
          width={24}
          height={24}
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
          >
            {likedJobs?.length}
          </div>
        )}
      </Button>
    );
  }
}
