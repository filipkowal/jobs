import { Dictionary } from "@/utils";
import { useEffect, useState } from "react";

export default function CompareButtonHint({
  pinnedJobs,
  dict,
}: {
  pinnedJobs: string[];
  dict: Dictionary["compareButton"];
}) {
  const [hintHidden, setHintHidden] = useState(false);
  useEffect(() => {
    if (sessionStorage) {
      setHintHidden(sessionStorage.getItem("hideHint") === "true");
    }
  }, []);

  return (
    <div
      className={`absolute z-[-1] bottom-16 right-0 bg-white text-digitalent-blue p-4 opacity-0 transition-all duration-300 ${
        pinnedJobs?.length === 1 && !hintHidden
          ? "opacity-100 !bottom-[-7rem]"
          : ""
      }`}
    >
      <div className="relative">
        {/* arrow */}
        <div
          className="absolute top-[-24px] left-[47%]"
          style={{
            width: "0",
            height: "0",
            border: "solid",
            borderWidth: "0 10px 10px 10px",
            borderColor: "transparent transparent white transparent",
          }}
        />

        {dict["hint"]}
      </div>

      {/* X button */}
      <svg
        className="w-4 h-4 absolute top-2 right-2 cursor-pointer"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          setHintHidden(true);
          sessionStorage.setItem("hideHint", "true");
        }}
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
