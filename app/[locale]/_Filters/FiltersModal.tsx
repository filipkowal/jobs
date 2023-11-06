"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

import {
  ActiveFilterName,
  ActiveFilters,
  CustomBoard,
  FILTER_NAMES,
  Filters,
  Locale,
} from "../../../utils";
import ApplyFiltersButton from "./FiltersModalApplyButton";
import RegionsFilter from "./FiltersModalRegionSection";
import {
  Modal,
  Accordion,
  RangeSlider,
  TagOptionGroup,
} from "../../../components";
import FiltersClearButton from "./FiltersClearButton";
import { OpenFilterName } from "./FiltersSection";

export default function FiltersModal({
  filters,
  locale,
  dict,
  customBoard,
  isModalOpen,
  openFilterName,
  setIsModalOpen,
  setOpenFilterName,
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
  defaultActiveFilters: ActiveFilters;
}) {
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(defaultActiveFilters);

  function isAccordionOpen(filterName: ActiveFilterName): boolean {
    return openFilterName === filterName;
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

  function isFilterVisible(filterName: keyof typeof filters): boolean {
    return (
      !!filters[filterName] &&
      !customBoard.hiddenFilters?.[
        filterName as keyof typeof customBoard.hiddenFilters
      ]
    );
  }

  function closeModal() {
    setActiveFilters(defaultActiveFilters);
    setOpenFilterName("none");
    setIsModalOpen(false);
  }

  function TagsFilter({ filterName }: { filterName: ActiveFilterName }) {
    return (
      <TagOptionGroup
        tags={filters?.[filterName as keyof Filters] as string[]}
        selectedTags={(activeFilters?.[filterName] as string[]) || []}
        setSelectedTags={(values) => setActiveFilter(filterName, values)}
        singleChoice={false}
      />
    );
  }

  function getFilterComponent(filterName: keyof typeof filters) {
    if (!isFilterVisible(filterName)) return null;

    switch (filterName) {
      case "regions":
        return (
          <RegionsFilter
            key="regions"
            regions={filters.regions}
            selectedStates={activeFilters?.states || []}
            isOpen={isAccordionOpen("states")}
            setSelectedStates={(states) => setActiveFilter("states", states)}
            dict={{
              Regions: dict["Regions"],
              "Whole Switzerland": dict["Whole Switzerland"],
            }}
            locale={locale}
          />
        );

      case "careerFields":
        return (
          <Accordion
            labelTag={activeFilters?.["careerFields"]?.length}
            title={dict["Career Fields"]}
            isOpen={isAccordionOpen("careerFields")}
            key={"careerFields"}
          >
            <TagsFilter filterName="careerFields" key="careerFields" />
          </Accordion>
        );

      case "technologies":
        return (
          <Accordion
            labelTag={activeFilters?.["technologies"]?.length}
            title={dict["Technologies"]}
            isOpen={isAccordionOpen("technologies")}
            key={"technologies"}
          >
            <TagsFilter filterName="technologies" key="technologies" />
          </Accordion>
        );

      case "jobLevels":
        return (
          <Accordion
            labelTag={activeFilters?.["jobLevels"]?.length}
            title={dict["Job Levels"]}
            isOpen={isAccordionOpen("jobLevels")}
            key={"jobLevels"}
          >
            <TagsFilter filterName="jobLevels" key="jobLevels" />
          </Accordion>
        );

      case "salary":
        return (
          <Accordion
            labelTag={activeFilters?.salary && activeFilters?.salary + " CHF"}
            key="salary"
            title={dict["Salary"]}
            isOpen={isAccordionOpen("salary")}
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
        );

      case "workload":
        return (
          <Accordion
            labelTag={
              activeFilters?.workload &&
              activeFilters?.workload[0] +
                " - " +
                activeFilters?.workload[1] +
                " %"
            }
            key="workload"
            title={dict["Workload"]}
            isOpen={isAccordionOpen("workload")}
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
        );

      case "homeOffice":
        return (
          <Accordion
            labelTag={
              activeFilters?.homeOffice && activeFilters?.homeOffice + " %"
            }
            key="homeOffice"
            title={dict["Home Office"]}
            isOpen={isAccordionOpen("homeOffice")}
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
        );

      case "industries":
        return (
          <Accordion
            labelTag={activeFilters?.["industries"]?.length}
            title={dict["Industries"]}
            isOpen={isAccordionOpen("industries")}
            key={"industries"}
          >
            <TagsFilter filterName="industries" key="industries" />
          </Accordion>
        );

      case "companySizes":
        return (
          <Accordion
            labelTag={activeFilters?.["companySizes"]?.length}
            title={dict["Company Sizes"]}
            isOpen={isAccordionOpen("companySizes")}
            key={"companySizes"}
          >
            <TagsFilter filterName="companySizes" key="companySizes" />
          </Accordion>
        );

      default:
        return null;
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={closeModal}
      title={dict["Filters"]}
      footer={
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
      }
    >
      <div className="sm:pr-[37px] sm:-mr-[37px]">
        {FILTER_NAMES.map((name) => getFilterComponent(name))}
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
