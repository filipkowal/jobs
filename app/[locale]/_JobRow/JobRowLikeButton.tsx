"use client";

import { useContext } from "react";
import Image from "next/image";

import { CompareContext } from "../CompareContextProvider";
import pinIcon from "../../../public/pinIcon.png";
import pinIconFill from "../../../public/pinIconFill.png";
import pinIconFillWhite from "../../../public/pinIconFillWhite.png";

export default function LikeButton({ jobId }: { jobId: string }) {
  const { likedJobs, setLikedJobs } = useContext(CompareContext);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (likedJobs.includes(jobId)) {
          setLikedJobs(likedJobs.filter((id: string) => id !== jobId));
        } else {
          setLikedJobs([...likedJobs, jobId]);
        }
      }}
      className="min-w-[32px] flex items-center absolute right-6 p-1 ml-4 mt-1 sm:mt-0 sm:static bottom-[1.2rem] cursor-pointer"
    >
      {likedJobs.includes(jobId) ? (
        <Image src={pinIconFill} alt="pin icon" width={24} height={24} />
      ) : (
        <span className="group">
          <Image
            src={pinIcon}
            alt="pin icon"
            width={24}
            height={24}
            className="group-hover:hidden"
          />
          <Image
            src={pinIconFillWhite}
            alt="pin icon"
            width={24}
            height={24}
            className="hidden group-hover:block"
          />
        </span>
      )}
    </div>
  );
}
