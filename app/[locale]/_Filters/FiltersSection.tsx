"use client";

import {
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
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import FiltersClearButton from "./FiltersClearButton";
import FilterButton from "./FilterButton";

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

  const defaultActiveFilters = useMemo(
    () => pickActiveFiltersFromSearchParams(searchParams),
    [searchParams]
  );
  const numberOfVisibleFliterButtons = useMemo(
    () => (locale === "fr" ? 6 : 7),
    [locale]
  );
  const filtersNotHiddenNames = useMemo(
    () =>
      Object.keys(filters).filter(
        (filterName) =>
          !customBoard.hiddenFilters?.[
            filterName as keyof typeof customBoard.hiddenFilters
          ]
      ),
    [filters, customBoard]
  );

  const [openFilterName, setOpenFilterName] = useState<OpenFilterName>("");
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(defaultActiveFilters);

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
        defaultActiveFilters={defaultActiveFilters}
      />

      <div className="hidden lg:flex flex-row mb-2 gap-2 flex-wrap relative">
        <AdjustmentsHorizontalIcon
          onClick={() => setOpenFilterName("all")}
          className="text-digitalent-blue pr-2 w-8 h-8 cursor-pointer"
        />
        <NumberOfFiltersIcon
          activeFilters={activeFilters}
          setOpenFilterName={setOpenFilterName}
        />

        <>
          {filtersNotHiddenNames
            .slice(0, numberOfVisibleFliterButtons - 1)
            .map((filterName) => (
              <FilterButton
                key={filterName}
                filterName={filterName}
                setOpenFilterName={setOpenFilterName}
                activeFilters={activeFilters}
                dict={dict}
              />
            ))}
        </>

        {filtersNotHiddenNames.length > numberOfVisibleFliterButtons ? (
          <span
            onClick={() => setOpenFilterName("all")}
            className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
          >
            {dict["More..."]}
          </span>
        ) : null}

        <FiltersClearButton
          locale={locale}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
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
        <NumberOfFiltersIcon
          activeFilters={activeFilters}
          setOpenFilterName={setOpenFilterName}
        />
      </div>
    </>
  );
}

function NumberOfFiltersIcon({
  activeFilters,
  setOpenFilterName,
}: {
  activeFilters: ActiveFilters;
  setOpenFilterName: Dispatch<SetStateAction<OpenFilterName>>;
}) {
  if (!activeFilters) return null;
  if (Object.keys(activeFilters).length === 0) return null;

  return Object.keys(activeFilters).length ? (
    <span
      onClick={() => {
        setOpenFilterName("all");
      }}
      className="absolute -top-2 right-0 sm:!-left-2 cursor-pointer bg-digitalent-green text-white font-title w-5 h-5 flex justify-center items-center rounded-full"
    >
      {Object.keys(activeFilters).length}
    </span>
  ) : null;
}
