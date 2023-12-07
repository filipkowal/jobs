"use client";

import { useContext } from "react";

import { CompareContext } from "../CompareContextProvider";
import PinIcon from "../../../components/icons/PinIcon";
import { CustomBoard } from "../../../utils";

export default function LikeButton({
  jobId,
  customBoard,
}: {
  jobId: string;
  customBoard: CustomBoard;
}) {
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
        <PinIcon
          filled={true}
          color={
            customBoard.colors?.jobRowTitle ||
            customBoard.colors?.digitalentGreen.DEFAULT ||
            "#66B573"
          }
        />
      ) : (
        <span className="group">
          <PinIcon color={"white"} className="group-hover:hidden" />
          <PinIcon
            filled
            color={"white"}
            className="hidden group-hover:block"
          />
        </span>
      )}
    </div>
  );
}
