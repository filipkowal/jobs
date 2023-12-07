"use client";

import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";

export const CompareContext = createContext<{
  likedJobs: string[];
  setLikedJobs: Dispatch<any>;
}>({
  likedJobs: [],
  setLikedJobs: () => {},
});

export default function CompareContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [likedJobs, setLikedJobs] = useState([]);
  const sessionStorageSetLikedJobs = (jobs: string[]) =>
    sessionStorage.setItem("likedJobs", JSON.stringify(jobs));

  useEffect(() => {
    setLikedJobs(JSON.parse(sessionStorage.getItem("likedJobs") || "[]") || []);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        likedJobs,
        setLikedJobs: (jobs) => {
          setLikedJobs(jobs);
          sessionStorageSetLikedJobs(jobs);
        },
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
