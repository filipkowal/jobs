"use client";

import { useContext } from "react";
import { FiltersModalContext } from "./FiltersModalContext";
import { ActiveFilterName } from "../../../utils";

export default function FilterButtonContainer({
  filterName,
  children,
}: {
  filterName: ActiveFilterName;
  children: React.ReactNode;
}) {
  const { setOpenFilterName } = useContext(FiltersModalContext);

  return (
    <span onClick={() => setOpenFilterName && setOpenFilterName(filterName)}>
      {children}
    </span>
  );
}
