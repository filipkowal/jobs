import { type Filters, type ActiveFilterName } from "@/utils";
import { allUppercase } from "@/utils/server";
import { type Locale } from "i18n-config";
import { getCustomBoard, getDictionary } from "@/utils/server";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

interface Salary {
  amount?: number[] | undefined;
  currency?: string | undefined;
  unit?: string | undefined;
}

export function isOfSalaryType(
  value: Salary | any[] | undefined
): value is Salary {
  return (value as Salary).amount !== undefined;
}

export default async function FiltersSection({
  filtersPromise,
  locale,
}: {
  filtersPromise: Promise<Filters>;
  locale: Locale;
}) {
  const filters = await filtersPromise;

  const customBoard = await getCustomBoard();
  const { filtersSection: dict } = await getDictionary(locale);

  function FilterButton({
    filterName,
  }: {
    filterName: ActiveFilterName | "regions";
  }) {
    return (
      <span
        key={filterName}
        className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
      >
        {filterName === "categories"
          ? dict["Career Fields"]
          : allUppercase(filterName)}
      </span>
    );
  }

  return (
    <div className="lg:w-10/12 w-full max-w-[70rem] justify-left">
      <div className="hidden lg:flex flex-row mb-2 gap-2 flex-wrap relative">
        <>
          <AdjustmentsHorizontalIcon className="text-digitalent-blue pr-2 w-8 h-8 cursor-pointer"></AdjustmentsHorizontalIcon>

          {Object.keys(filters)
            .slice(0, locale === "fr" ? 5 : 6)
            .map((filterName) =>
              customBoard.hiddenFilters?.[
                filterName as keyof typeof customBoard.hiddenFilters
              ] ? null : (
                <FilterButton
                  key={filterName}
                  filterName={filterName as ActiveFilterName | "regions"}
                />
              )
            )}
        </>

        <span
          className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
        >
          {dict["More..."]}
        </span>
      </div>

      <div className="relative lg:hidden w-[fit-content] pl-1">
        <span
          className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
        >
          {dict["Filters"]}
          <AdjustmentsHorizontalIcon className="ml-2 mb-1 w-6 h-6 inline-block" />
        </span>
      </div>
    </div>
  );
}
