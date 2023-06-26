import Link from "next/link";
import { Button } from "../../../components";
import { ActiveFilterName, ActiveFilters, Locale } from "../../../utils";
import { Dispatch, SetStateAction } from "react";
import { OpenFilterName } from "./FiltersSection";

export default function FiltersClearButton({
  locale,
  activeFilters,
  setActiveFilters,
  setOpenFilterName,
  dict,
}: {
  locale: Locale;
  activeFilters: ActiveFilters;
  setActiveFilters: Dispatch<SetStateAction<ActiveFilters>>;
  setOpenFilterName: Dispatch<OpenFilterName>;
  dict: { Clear: string };
}) {
  return activeFilters ? (
    <Link href={`/${locale}`}>
      <Button
        onClick={() => {
          setActiveFilters({});
          setOpenFilterName("");
        }}
        name="Clear filters"
        disabled={Object.keys(activeFilters)?.length === 0}
      >
        <svg
          className="w-6 h-6 inline pr-1 pb-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        {dict["Clear"]}
      </Button>
    </Link>
  ) : null;
}
