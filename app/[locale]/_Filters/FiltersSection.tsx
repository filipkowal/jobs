"use client";

import {
  allUppercase,
  type ActiveFilterName,
  CustomBoard,
  Locale,
  Filters,
  pickActiveFiltersFromSearchParams,
  ActiveFilters,
} from "../../../utils";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import FiltersModal, { FiltersModalDict } from "./FiltersModal";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import FiltersClearButton from "./FiltersClearButton";

interface Salary {
  amount?: number[] | undefined;
  currency?: string | undefined;
  unit?: string | undefined;
}
export type OpenFilterName = ActiveFilterName | "all" | "";

export function isOfSalaryType(
  value: Salary | any[] | undefined
): value is Salary {
  return (value as Salary).amount !== undefined;
}

export default function FiltersSection({
  dict,
  locale,
  filters,
  customBoard,
}: {
  dict: {
    "Career Fields": string;
    "More...": string;
    Filters: string;
  } & FiltersModalDict;
  locale: Locale;
  filters: Filters;
  customBoard: CustomBoard;
}) {
  const searchParams = useSearchParams();

  const [openFilterName, setOpenFilterName] = useState<OpenFilterName>("");
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(
    pickActiveFiltersFromSearchParams(searchParams)
  );

  return (
    <>
      <FiltersModal
        locale={locale}
        filters={filters}
        customBoard={customBoard}
        dict={dict}
        openFilterName={openFilterName}
        setOpenFilterName={setOpenFilterName}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      <div className="hidden lg:flex flex-row mb-2 gap-2 flex-wrap relative">
        <AdjustmentsHorizontalIcon
          onClick={() => setOpenFilterName("all")}
          className="text-digitalent-blue pr-2 w-8 h-8 cursor-pointer"
        />

        <>
          {Object.keys(filters)
            .slice(0, locale === "fr" ? 5 : 6)
            .map((filterName) =>
              customBoard.hiddenFilters?.[
                filterName as keyof typeof customBoard.hiddenFilters
              ] ? null : (
                <span
                  key={filterName}
                  onClick={() =>
                    setOpenFilterName(
                      filterName === "regions"
                        ? "states"
                        : (filterName as OpenFilterName)
                    )
                  }
                  className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1 mr-2 mb-2 break-keep inline-block cursor-pointer
                  ${
                    activeFilters &&
                    Object.keys(activeFilters).includes(
                      filterName === "regions" ? "states" : filterName
                    ) &&
                    "!bg-digitalent-blue !text-white"
                  }`}
                >
                  {dict[allUppercase(filterName) as keyof typeof dict]}
                </span>
              )
            )}
        </>

        <span
          onClick={() => setOpenFilterName("all")}
          className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
        >
          {dict["More..."]}
        </span>

        <FiltersClearButton
          locale={locale}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          setOpenFilterName={setOpenFilterName}
          dict={{ Clear: dict["Clear"] }}
        />
      </div>

      {/* Mobile */}

      <div className="relative lg:hidden w-[fit-content] pl-1">
        <span
          onClick={() => setOpenFilterName("all")}
          className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
        >
          {dict["Filters"]}
          <AdjustmentsHorizontalIcon className="ml-2 mb-1 w-6 h-6 inline-block" />
        </span>
      </div>
    </>
  );
}
