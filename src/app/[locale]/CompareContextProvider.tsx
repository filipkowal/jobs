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
  testLikedJobs,
  testSetLikedJobs,
}: {
  children: ReactNode;
  testLikedJobs?: string[];
  testSetLikedJobs?: Dispatch<any>;
}) {
  const [likedJobs, setLikedJobs] = useState(testLikedJobs || []);
  const sessionStorageSetLikedJobs = (jobs: string[]) =>
    sessionStorage.setItem("likedJobs", JSON.stringify(jobs));

  useEffect(() => {
    setLikedJobs(
      testLikedJobs ||
        JSON.parse(sessionStorage.getItem("likedJobs") || "[]") ||
        []
    );
  }, [testLikedJobs]);

  return (
    <CompareContext.Provider
      value={{
        likedJobs,
        setLikedJobs: (jobs) => {
          testSetLikedJobs ? testSetLikedJobs(jobs) : setLikedJobs(jobs);
          sessionStorageSetLikedJobs(jobs);
        },
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
