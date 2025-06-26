import { useState } from "react";
import { CustomBoard, Job, Locale } from "@/utils";
import { useRouter } from "next/navigation";
import ApplicationFormSuccessStep from "./ApplicationFormSuccess";
import ApplicationFormBasket from "./ApplicationFormBasket";
import ApplicationFormAboutYou from "./ApplicationFormAboutYou";
import { Dictionary } from "@/utils/server";
import Modal from "@/components/Modal";


export default function ApplicationFormModal({
  isOpen,
  setIsOpen,
  locale,
  pinnedJobs,
  removePinnedJob,
  testStepNumber,
  dict,
  customBoard,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  locale: Locale;
  removePinnedJob: (jobId: string) => void;
  pinnedJobs: Job[];
  testStepNumber?: number;
  dict: Dictionary["compareJobTable"];
  customBoard: CustomBoard;
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
      customBoard={customBoard}
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
