import { Dispatch, SetStateAction } from "react";
import { Button } from "../../../components";

export default function BackButton({
  setStepNumber,
  stepNumber,
  dict,
}: {
  setStepNumber: Dispatch<SetStateAction<number>>;
  stepNumber: number;
  dict: { "Go back": string };
}) {
  return (
    <Button
      className="mt-16 float-left"
      onClick={(e) => {
        e.preventDefault();
        setStepNumber(stepNumber - 1);
      }}
      name="Go back"
    >
      {dict["Go back"]}
    </Button>
  );
}
