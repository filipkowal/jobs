import { type Filters } from "../../../utils";
import { type Locale } from "../../../i18n-config";
import { getCustomBoard, getDictionary } from "../../../utils/server";
import FiltersSection from "./FiltersSection";

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

export default async function FiltersSectionContainer({
  filtersPromise,
  locale,
}: {
  filtersPromise: Promise<Filters>;
  locale: Locale;
}) {
  const filters = await filtersPromise;

  const customBoard = await getCustomBoard();
  const { filtersSection: dict } = await getDictionary(locale);

  return (
    <div className="lg:w-10/12 w-full max-w-[70rem] justify-left">
      <FiltersSection
        dict={dict}
        locale={locale}
        filters={filters}
        customBoard={customBoard}
      />
    </div>
  );
}
