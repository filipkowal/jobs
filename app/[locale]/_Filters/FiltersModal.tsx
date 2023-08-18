"use client";
import { Dispatch, SetStateAction, useContext } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

import {
  ActiveFilterName,
  ActiveFilters,
  CustomBoard,
  FILTER_NAMES,
  Filters,
  Locale,
  allUppercase,
} from "../../../utils";
import ApplyFiltersButton from "./FiltersModalApplyButton";
import RegionsFilter from "./FiltersModalRegionSection";
import TagsFilter from "./FiltersTagsFilter";
import { Modal, Accordion, RangeSlider } from "../../../components";
import FiltersClearButton from "./FiltersClearButton";
import { OpenFilterName } from "./FiltersSection";
import { set } from "lodash";

export default function FiltersModal({
  filters,
  locale,
  dict,
  customBoard,
  isModalOpen,
  openFilterName,
  setIsModalOpen,
  setOpenFilterName,
  activeFilters,
  setActiveFilters,
  defaultActiveFilters,
}: {
  filters: Filters;
  locale: Locale;
  dict: FiltersModalDict;
  customBoard: CustomBoard;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  openFilterName: OpenFilterName;
  setOpenFilterName: Dispatch<SetStateAction<OpenFilterName>>;
  activeFilters: ActiveFilters;
  setActiveFilters: Dispatch<SetStateAction<ActiveFilters>>;
  defaultActiveFilters: ActiveFilters;
}) {
  function isAccordionOpen(filterName: ActiveFilterName): boolean {
    return openFilterName === filterName || !!activeFilters?.[filterName];
  }

  function setActiveFilter(filterName: ActiveFilterName, value: any) {
    setActiveFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [filterName]: value,
      };

      if (!notEmpty(value)) {
        delete updatedFilters[filterName];
      }

      return updatedFilters;
    });

    function notEmpty(v: any): boolean {
      return (
        ((Array.isArray(v) || typeof v === "string") && !!v.length) ||
        (typeof v === "number" && v > 0)
      );
    }
  }

  function shouldDisplayTagFilter(filterName: ActiveFilterName): boolean {
    const filterValues = filters?.[filterName as keyof Filters];
    const TAG_FILTERS = [
      "careerFields",
      "workLanguages",
      "technologies",
      "industries",
      "companySizes",
      "jobLevels",
    ];

    if (!TAG_FILTERS.includes(filterName)) return false;

    if (!Array.isArray(filterValues)) return false;

    if (filterValues?.length <= 0) return false;

    if (
      customBoard.hiddenFilters?.[
        filterName as keyof typeof customBoard.hiddenFilters
      ]
    )
      return false;

    return true;
  }

  function closeModal() {
    setActiveFilters(defaultActiveFilters);
    setOpenFilterName("none");
    setIsModalOpen(false);
  }

  return (
    <Modal isOpen={isModalOpen} setIsOpen={closeModal} title={dict["Filters"]}>
      <div className="sm:max-h-[68vh] max-h-[62vh] w-full overflow-y-auto overflow-x-hidden sm:pr-[37px] sm:-mr-[37px]">
        {FILTER_NAMES.map(
          (filterName) =>
            shouldDisplayTagFilter(filterName) && (
              <TagsFilter
                key={filterName}
                title={dict[allUppercase(filterName) as keyof FiltersModalDict]}
                filterName={filterName as ActiveFilterName}
                filters={filters}
                activeFilters={activeFilters}
                setActiveFilter={setActiveFilter}
                isAccordionOpen={isAccordionOpen}
              />
            )
        )}

        {filters.workload && !customBoard.hiddenFilters.workload ? (
          <Accordion
            title={dict["Workload"]}
            isOpen={isAccordionOpen("workload")}
            alwaysOpen={!!activeFilters?.workload}
          >
            <RangeSlider
              value={activeFilters?.workload || [0, 100]}
              onValueChange={(workload) =>
                setActiveFilter("workload", workload)
              }
              min={0}
              max={100}
              step={10}
              name={dict["Workload range"]}
              unit={dict["% of full time"]}
            />
          </Accordion>
        ) : (
          ""
        )}

        {filters.homeOffice && !customBoard.hiddenFilters.homeOffice ? (
          <Accordion
            title={dict["Home Office"]}
            isOpen={isAccordionOpen("homeOffice")}
            alwaysOpen={!!activeFilters?.homeOffice}
          >
            <RangeSlider
              value={activeFilters?.homeOffice || 0}
              onValueChange={(homeOffice) =>
                setActiveFilter("homeOffice", homeOffice)
              }
              min={0}
              max={100}
              step={10}
              unit={dict["% of full time"]}
              name={dict["Min. Home Office"]}
            />
          </Accordion>
        ) : (
          ""
        )}

        {filters.salary && !customBoard.hiddenFilters.salary ? (
          <Accordion
            title={dict["Salary"]}
            isOpen={isAccordionOpen("salary")}
            alwaysOpen={!!activeFilters?.salary}
          >
            <RangeSlider
              value={activeFilters?.salary || 0}
              onValueChange={(salary) => setActiveFilter("salary", salary)}
              min={filters?.salary?.amount?.[0] || 0}
              max={filters?.salary?.amount?.[1] || 900000}
              step={1000}
              unit="CHF"
              name={dict["Min. salary"]}
            />
            <div className="flex gap-2 mt-8">
              <CheckIcon width="24" className="w-4" />
              <span className="w-4/5 text-digitalent-blue">
                {dict["We never share this with companies"]}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <CheckIcon width="24" className="w-4" />
              <span className="w-4/5 text-digitalent-blue">
                {dict["We only use this to filter out roles and save you time"]}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <CheckIcon width="24" className="w-4" />
              <span className="w-4/5 text-digitalent-blue">
                {
                  dict[
                    `If you're unsure, we recommend choosing a lower amount so you don't miss out on roles that could be great`
                  ]
                }
              </span>
            </div>
          </Accordion>
        ) : (
          ""
        )}

        {!customBoard.hiddenFilters.regions ? (
          <RegionsFilter
            regions={filters.regions}
            selectedStates={activeFilters?.states || []}
            isOpen={isAccordionOpen("states")}
            setSelectedStates={(states) => setActiveFilter("states", states)}
            alwaysOpen={!!activeFilters?.states}
            dict={{
              Regions: dict["Regions"],
              "Whole Switzerland": dict["Whole Switzerland"],
            }}
            locale={locale}
          />
        ) : (
          ""
        )}
      </div>

      <div
        className={`mt-6 sm:mt-16 flex justify-between ${
          activeFilters && Object.keys(activeFilters).length === 0
            ? "!justify-end"
            : ""
        }`}
      >
        <FiltersClearButton
          locale={locale}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          dict={{ Clear: dict["Clear"] }}
          className="!px-[20px] !py-[10px] !uppercase !mb-0"
        />
        <ApplyFiltersButton
          activeFilters={activeFilters}
          setIsModalOpen={setIsModalOpen}
          locale={locale}
          dict={{
            "Apply filters": dict["Apply filters"],
            Apply: dict["Apply"],
          }}
          customBoard={customBoard}
        />
      </div>
    </Modal>
  );
}

export interface FiltersModalDict {
  Apply: string;
  "Apply filters": string;
  Filters: string;
  "More...": string;
  "Career Fields": string;
  Category: string;
  Regions: string;
  "Work Languages": string;
  Technologies: string;
  Industries: string;
  "Company Sizes": string;
  "Work language": string;
  Workload: string;
  "Workload range": string;
  "% of full time": string;
  Salary: string;
  "Min. salary": string;
  "Techonolgies:": string;
  "Work languages": string;
  "Job Levels": string;
  "We never share this with companies": string;
  "We only use this to filter out roles and save you time": string;
  "Home Office": string;
  "Min. Home Office": string;
  Location: string;
  "Whole Switzerland": string;
  "If you're unsure, we recommend choosing a lower amount so you don't miss out on roles that could be great": string;
  "Clear filters": string;
  Clear: string;
}
