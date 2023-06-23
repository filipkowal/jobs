"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { ActiveFilterName, ActiveFilters, FILTER_NAMES } from "../../../utils";
import { useSearchParams } from "next/navigation";
import { pick } from "lodash";

export type OpenFilterName = ActiveFilterName | "all" | "";

export const FiltersModalContext = createContext<{
  openFilterName: string;
  setOpenFilterName: Dispatch<OpenFilterName>;
  activeFilters: ActiveFilters;
  setActiveFilters: Dispatch<SetStateAction<ActiveFilters>>;
}>({
  openFilterName: "",
  setOpenFilterName: () => {},
  activeFilters: {},
  setActiveFilters: () => {},
});

export default function FiltersModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const searchParams = useSearchParams();

  const [openFilterName, setOpenFilterName] = useState<OpenFilterName>("");
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(
    pick(searchParams || {}, FILTER_NAMES)
  );

  return (
    <FiltersModalContext.Provider
      value={{
        openFilterName,
        setOpenFilterName,
        activeFilters,
        setActiveFilters,
      }}
    >
      {children}
    </FiltersModalContext.Provider>
  );
}
