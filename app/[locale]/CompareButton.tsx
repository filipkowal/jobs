"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelectedLayoutSegment, useRouter } from "next/navigation";

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
  const router = useRouter();

  const { likedJobs } = useContext(CompareContext);
  const buttonActive = likedJobs && likedJobs.length > 1;

  // @fixme: can I achieve it with only params and turn the component to server component?
  const selectedLayoutSegment = useSelectedLayoutSegment();

  if (selectedLayoutSegment === "compare") {
    return (
      <Button
        name="Go back"
        onClick={() =>
          window && window?.history.length <= 1
            ? router.push(`/${params.locale}`)
            : router.back()
        }
        className="!mx-4 sm:!mx-8 !ring-white !border-white !text-white hover:!bg-white hover:!text-digitalent-green"
      >
        {dict["Go back"]}
      </Button>
    );
  }

  return (
    <div className="relative hidden sm:block">
      {!buttonActive ? (
        <ButtonWithIcon />
      ) : (
        <Link href={"/" + params?.locale + "/compare"}>
          <ButtonWithIcon />
        </Link>
      )}

      <CompareButtonHint
        likedJobs={likedJobs}
        dict={{ compareButtonHint: dict.compareButtonHint }}
      />
    </div>
  );

  function ButtonWithIcon() {
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
