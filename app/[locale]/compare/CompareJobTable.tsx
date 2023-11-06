"use client";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Button from "../../../components/Button";
import { Job, Locale } from "../../../utils";
import { CompareContext } from "../CompareContextProvider";
import ApplicationFormModal from "./ApplicationFormModal";
import JobColumn from "./JobColumn";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

export default function CompareJobTable({
  jobs,
  locale,
  dict,
}: {
  jobs: Job[];
  locale: Locale;
  dict: CompareJobTableDict;
}) {
  const COLUMN_WIDTH_WITH_MARGIN = 432;

  const { likedJobs: likedJobsIds, setLikedJobs } = useContext(CompareContext);

  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showRightArrowButton, setShowRightArrowButton] = useState(false);

  const likedJobs = useMemo(() => {
    return jobs.filter((job) => likedJobsIds.includes(job.id as string));
  }, [jobs, likedJobsIds]);

  const removeLikedJob = (id: string) =>
    setLikedJobs(likedJobsIds.filter((jobId) => jobId !== id));

  useEffect(() => {
    tableRef.current &&
      setShowRightArrowButton(
        tableRef.current?.scrollWidth > window.innerWidth + scrollPosition
      );
  }, [likedJobs, scrollPosition]);

  return (
    <>
      <ApplicationFormModal
        isOpen={isApplicationOpen}
        setIsOpen={setIsApplicationOpen}
        locale={locale}
        likedJobs={likedJobs}
        removeLikedJob={removeLikedJob}
        dict={dict}
      />

      <div className="w-full flex justify-center sm:mt-16">
        <Button
          type="primary"
          className="mt-4 w-96 fixed max-sm:bottom-0 sm:top-14 z-10"
          disabled={likedJobsIds.length === 0}
          onClick={() => setIsApplicationOpen(true)}
          name="apply for jobs"
        >
          {dict["Apply for"]} <b>{likedJobsIds.length}</b> {dict["jobs"]}
        </Button>
      </div>

      <div
        className="max-w-screen flex flex-col sm:flex-row sm:gap-12 gap-6 sm:p-8 overflow-y-visible h-auto overflow-x-scroll scrollbar-hide"
        ref={tableRef}
        onScroll={() => {
          setScrollPosition(tableRef.current?.scrollLeft || 0);
        }}
      >
        {scrollPosition > 64 && (
          <button
            className="fixed left-4 top-1/2 text-digitalent-green hidden sm:block"
            onClick={() => {
              if (tableRef.current)
                tableRef.current.scrollBy({
                  top: 0,
                  left: -COLUMN_WIDTH_WITH_MARGIN,
                  behavior: "smooth",
                });
            }}
            name="scroll left"
          >
            <div className="relative">
              <div className="bg-white h-8 w-8 xl:h-16 xl:w-16 rounded-full absolute top-4 left-4 z-0" />
              <ArrowLeftCircleIcon className="h-16 w-16 xl:h-24 xl:w-24 relative z-10" />
            </div>
          </button>
        )}
        {showRightArrowButton && (
          <button
            className="fixed right-4 top-1/2 text-digitalent-green hidden sm:block"
            onClick={() => {
              if (tableRef.current)
                tableRef.current.scrollBy({
                  top: 0,
                  left: COLUMN_WIDTH_WITH_MARGIN,
                  behavior: "smooth",
                });
            }}
            name="scroll right"
          >
            <div className="relative">
              <div className="bg-white h-8 w-8 xl:h-16 xl:w-16 rounded-full absolute top-4 left-4 z-0" />
              <ArrowRightCircleIcon className="h-16 w-16 xl:h-24 xl:w-24 relative z-10" />
            </div>
          </button>
        )}
        {likedJobs?.map((job) => (
          <JobColumn key={job.id} job={job} dict={dict} />
        ))}
      </div>
    </>
  );
}

export interface CompareJobTableDict {
  Workload: string;
  "Home Office": string;
  "Go back": string;
  "You have": string;
  Responsibilities: string;
  "I am": string;
  Man: string;
  Woman: string;
  Other: string;
  Name: string;
  Message: string;
  "Upload your CV or paste the link to your LinkedIn profile": string;
  "Upload your CV": string;
  "Link to your LinkedIn profile": string;
  Talent: string;
  Headhunter: string;
  "I accept the terms and conditions": string;
  "Sorry, you cannot apply for the job": string;
  Apply: string;
  "Thank you for applying": string;
  "Application basket": string;
  "Apply for": string;
  "You are applying for": string;
  jobs: string;
  "Add to application basket": string;
  "Work location": string;
  applyFormFileUpload: string;
  "I am applying directly": string;
  "I work for a recruitment agency": string;
  termsAgreed1: string;
  termsAgreed2: string;
  termsAgreed3: string;
  recruiterInfo: string;
  "Something went wrong": string;
  "Please enter a valid LinkedIn profile link": string;
  "Apply for another job": string;
  "application.basket.title.0": string;
  "application.basket.title.1": string;
  "application.basket.title.2": string;
  "application.basket.termsAndConditions.accordion.title": string;
  "Your e-mail": string;
  "Select CV file": string;
  "Please select a file with a valid type": string;
  "E-mail": string;
  Next: string;
  "Drop CV files or click to select": string;
  invalidEmail: string;
  fileInput: {
    drop: string;
    select: string;
    fileReadError: string;
    fileUploadError: string;
  };
  Unpin: string;
}
