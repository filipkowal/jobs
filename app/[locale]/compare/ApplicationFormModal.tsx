import { useState } from "react";
import { Job, Locale } from "../../../utils";
import { useRouter } from "next/navigation";
import ApplicationFormSuccessStep from "./ApplicationFormSuccess";
import ApplicationFormBasket from "./ApplicationFormBasket";
import ApplicationFormAboutYou from "./ApplicationFormAboutYou";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("../../../components/Modal"));

export default function ApplicationFormModal({
  isOpen,
  setIsOpen,
  locale,
  pinnedJobs,
  removePinnedJob,
  testStepNumber,
  dict,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  locale: Locale;
  removePinnedJob: (jobId: string) => void;
  pinnedJobs: Job[];
  testStepNumber?: number;
  dict: ApplicationDict;
}) {
  const router = useRouter();

  const [stepNumber, setStepNumber] = useState(testStepNumber || 0);
  const steps = [
    <ApplicationFormBasket
      key="applicationFormBasket"
      setStepNumber={setStepNumber}
      stepNumber={stepNumber}
      pinnedJobs={pinnedJobs}
      removePinnedJob={removePinnedJob}
      dict={dict}
    />,
    <ApplicationFormAboutYou
      key="applicationFormAboutYou"
      setStepNumber={setStepNumber}
      stepNumber={stepNumber}
      jobIds={pinnedJobs.map((job) => job.id as string)}
      dict={dict}
      locale={locale}
    />,
    <ApplicationFormSuccessStep key="applicationFormSuccess" />,
  ];

  const resetForm = () => {
    setStepNumber(0);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={
        dict[
          `application.basket.title.${stepNumber}` as "application.basket.title.0"
        ]
      }
      onClose={
        stepNumber === steps.length - 1
          ? () => {
              resetForm();
              router.push(`/${locale}`);
            }
          : undefined
      }
    >
      {steps[stepNumber]}
    </Modal>
  );
}

export interface ApplicationDict {
  "You are applying for": string;
  "Go back": string;
  Woman: string;
  Man: string;
  Other: string;
  Email: string;
  Name: string;
  Message: string;
  "Link to your LinkedIn profile": string;
  "I am applying directly": string;
  "I work for a recruitment agency": string;
  termsAgreed1: string;
  termsAgreed2: string;
  termsAgreed3: string;
  Next: string;
  "application.basket.title.0": string;
  "application.basket.title.1": string;
  "application.basket.title.2": string;
  "Apply for": string;
  jobs: string;
  job: string;
  "Something went wrong": string;
  recruiterInfo: string;
  "Drop CV files or click to select": string;
  invalidEmail: string;
  fileInput: {
    drop: string;
    select: string;
    fileReadError: string;
    fileUploadError: string;
  };
}
