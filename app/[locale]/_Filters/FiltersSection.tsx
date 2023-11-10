"use client";

import {
  type ActiveFilterName,
  CustomBoard,
  Locale,
  Filters,
  pickActiveFiltersFromSearchParams,
  FILTER_NAMES,
} from "../../../utils";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { type FiltersModalDict } from "./FiltersModal";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import FiltersClearButton from "./FiltersClearButton";
import FilterButton from "./FilterButton";
import dynamic from "next/dynamic";
import FiltersNumberLabel from "./FiltersNumberLabel";

const FiltersModal = dynamic(() => import("./FiltersModal"));

interface Salary {
  amount?: number[] | undefined;
  currency?: string | undefined;
  unit?: string | undefined;
}
export type OpenFilterName = ActiveFilterName | "none";

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
  const filtersNotHiddenNames = useMemo(() => {
    const hiddenButtonNames = ["technologies", "jobLevels", "homeOffice"];

    return FILTER_NAMES.filter(
      (filterName) =>
        !customBoard.hiddenFilters?.[
          filterName as keyof typeof customBoard.hiddenFilters
        ] && !hiddenButtonNames.includes(filterName)
    );
  }, [customBoard]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFilterName, setOpenFilterName] = useState<OpenFilterName>("none");

  return (
    <>
      {isModalOpen && (
        <FiltersModal
          locale={locale}
          filters={filters}
          customBoard={customBoard}
          dict={dict}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          openFilterName={openFilterName}
          setOpenFilterName={setOpenFilterName}
          defaultActiveFilters={defaultActiveFilters}
        />
      )}

      <div className="hidden lg:flex flex-row mb-2 gap-2 flex-wrap relative">
        <AdjustmentsHorizontalIcon
          onClick={() => setIsModalOpen(true)}
          className="text-digitalent-blue pr-2 w-8 h-8 cursor-pointer"
        />
        <FiltersNumberLabel
          activeFilters={defaultActiveFilters}
          setIsModalOpen={setIsModalOpen}
        />
        <>
          {filtersNotHiddenNames
            .slice(0, numberOfVisibleFliterButtons - 1)
            .map((filterName) => (
              <FilterButton
                key={filterName}
                filterName={filterName}
                setOpenFilterName={setOpenFilterName}
                setIsModalOpen={setIsModalOpen}
                activeFilters={defaultActiveFilters}
                dict={dict}
              />
            ))}
        </>

        <span
          onClick={() => setIsModalOpen(true)}
          className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
        >
          {dict["More..."]}
        </span>

        <FiltersClearButton
          locale={locale}
          activeFilters={defaultActiveFilters}
          dict={{ Clear: dict["Clear"] }}
        />
      </div>

      {/* Mobile */}

      <div className="relative lg:hidden w-[fit-content] mx-3">
        <span
          onClick={() => setIsModalOpen(true)}
          className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
        >
          {dict["Filters"]}
          <AdjustmentsHorizontalIcon className="ml-2 mb-1 w-6 h-6 inline-block" />
        </span>
        <FiltersNumberLabel
          activeFilters={defaultActiveFilters}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
}
