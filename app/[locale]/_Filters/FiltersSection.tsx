"use client";

import type {
  Dictionary,
  CustomBoard,
  Locale,
  Filters,
  OpenFilterName,
} from "@/utils";
import {
  pickActiveFiltersFromSearchParams,
  FILTER_BUTTON_NAMES,
} from "@/utils";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import FiltersClearButton from "./FiltersClearButton";
import FilterButton from "./FilterButton";
import dynamic from "next/dynamic";
import FiltersNumberLabel from "./FiltersNumberLabel";

const FiltersModal = dynamic(() => import("./FiltersModal"));

export default function FiltersSection({
  dict,
  locale,
  filters,
  customBoard,
}: {
  dict: Dictionary["filtersSection"];
  locale: Locale;
  filters: Filters;
  customBoard: CustomBoard;
}) {
  const searchParams = useSearchParams();

  const initialActiveFilters = useMemo(
    () => pickActiveFiltersFromSearchParams(searchParams),
    [searchParams]
  );

  const filterButtonNames = useMemo(() => {
    const hidden = customBoard.hiddenFilters;
    const numOfVisible = locale === "fr" ? 6 : 7;

    return FILTER_BUTTON_NAMES.filter(
      (filterName) => !hidden?.[filterName as keyof typeof hidden]
    ).slice(0, numOfVisible - 1);
  }, [customBoard, locale]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFilterName, setOpenFilterName] = useState<OpenFilterName>("none");

  const openFiltersModal = () => {
    setOpenFilterName("all");
    setIsModalOpen(true);
  };

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
          initialActiveFilters={initialActiveFilters}
        />
      )}

      <div className="hidden lg:flex flex-row mb-2 gap-2 flex-wrap relative">
        <AdjustmentsHorizontalIcon
          onClick={openFiltersModal}
          className="text-digitalent-blue pr-2 w-8 h-8 cursor-pointer"
        />
        <FiltersNumberLabel
          activeFilters={initialActiveFilters}
          onClick={openFiltersModal}
        />
        <>
          {filterButtonNames.map((filterName) => (
            <FilterButton
              key={filterName}
              filterName={filterName}
              setOpenFilterName={setOpenFilterName}
              setIsModalOpen={setIsModalOpen}
              activeFilters={initialActiveFilters}
              dict={dict}
            />
          ))}
        </>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setOpenFilterName("all");
          }}
          className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer
            focus:outline-2! focus:outline-digitalent-blue! focus:ring-2! focus:ring-digitalent-blue!`}
        >
          {dict["More..."]}
        </button>

        <FiltersClearButton
          locale={locale}
          activeFilters={initialActiveFilters}
          dict={dict}
        />
      </div>

      {/* Mobile */}

      <div className="relative lg:hidden w-fit mx-3">
        <span
          onClick={openFiltersModal}
          className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
        >
          {dict["Filters"]}
          <AdjustmentsHorizontalIcon className="ml-2 mb-1 w-6 h-6 inline-block" />
        </span>
        <FiltersNumberLabel
          activeFilters={initialActiveFilters}
          onClick={openFiltersModal}
        />
      </div>
    </>
  );
}
