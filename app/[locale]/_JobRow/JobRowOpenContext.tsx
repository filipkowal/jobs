"use client";

import { createContext, Dispatch, ReactNode, useState, useEffect } from "react";

export const JobRowOpenContext = createContext<{
  jobOpen: string | undefined;
  setJobOpen: Dispatch<string | undefined>;
  testJobOpen?: string;
}>({
  jobOpen: undefined,
  setJobOpen: () => {},
  testJobOpen: undefined,
});

export default function JobRowOpenContextProvider({
  children,
  defaultJobOpen,
  testJobOpen,
}: {
  children: ReactNode;
  defaultJobOpen?: string;
  testJobOpen?: string;
}) {
  const [jobOpen, setJobOpen] = useState(defaultJobOpen);

  return (
    <JobRowOpenContext.Provider
      value={{
        jobOpen: testJobOpen || jobOpen,
        setJobOpen,
      }}
    >
      {children}
    </JobRowOpenContext.Provider>
  );
}
