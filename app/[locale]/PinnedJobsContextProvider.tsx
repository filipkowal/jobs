"use client";

import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";

export const PinnedJobsContext = createContext<{
  pinnedJobs: string[];
  setPinnedJobs: Dispatch<any>;
}>({
  pinnedJobs: [],
  setPinnedJobs: () => {},
});

export default function PinnedJobsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pinnedJobs, setPinnedJobs] = useState([]);
  const sessionStorageSetPinnedJobs = (jobs: string[]) =>
    sessionStorage.setItem("pinnedJobs", JSON.stringify(jobs));

  useEffect(() => {
    setPinnedJobs(
      JSON.parse(sessionStorage.getItem("pinnedJobs") || "[]") || []
    );
  }, []);

  return (
    <PinnedJobsContext.Provider
      value={{
        pinnedJobs,
        setPinnedJobs: (jobs) => {
          setPinnedJobs(jobs);
          sessionStorageSetPinnedJobs(jobs);
        },
      }}
    >
      {children}
    </PinnedJobsContext.Provider>
  );
}
