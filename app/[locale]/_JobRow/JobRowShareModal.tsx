"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import type { CustomBoard, Locale } from "@/utils";
import { postData } from "@/utils";
import { Dictionary } from "@/utils/server";
import Modal from "@/components/Modal";

export default function ShareJob({
  locale,
  jobId,
  dict,
  customBoard,
}: {
  locale: Locale;
  dict: Dictionary["shareJob"] & Dictionary["JobRow"];
  jobId?: string;
  customBoard: CustomBoard;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [uniqueLink, setUniqueLink] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const steps = [
    <form
      ref={formRef}
      role="form"
      key="0"
      onSubmit={(e) => {
        e.preventDefault();

        try {
          postData({
            endpoint: "refer",
            locale,
            data: {
              email,
              jobId,
            },
            boardId: customBoard?.id,
          }).then((res) => {
            setUniqueLink(res || "");
            setStepNumber(stepNumber + 1);
          });
        } catch (e) {
          toast.error(dict["Something went wrong"]);
        }
      }}
    >
      <label className="mb-8 block">
        <div className="block mb-8">
          <p>{dict[`intro`]}</p>
          <ul>
            <li>{dict["intro.bullet1"]}</li>
            <li>{dict[`intro.bullet2`]}</li>
            <li className="font-bold">{dict[`intro.bullet3`]}</li>
          </ul>
        </div>
        <TextInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email"
          label="Email"
          className="mb-4 mt-8"
          dict={{ invalidEmail: dict["invalidEmail"] }}
        />
        <p>{dict[`email.info`]}</p>
      </label>

      <Checkbox
        name="terms"
        checked={termsAccepted}
        onChange={() => setTermsAccepted((accepted) => !accepted)}
        required
      >
        <span
          className="[&>a]:font-bold"
          dangerouslySetInnerHTML={{ __html: dict["email.accept"] }}
        />
      </Checkbox>
      <Button
        type="primary"
        className="mt-16 float-right"
        name={dict["Create a link"]}
        submitType
        disabled={
          (!!formRef.current && !formRef.current?.checkValidity()) ||
          !termsAccepted ||
          !email
        }
      >
        {dict["Create a link"]}
      </Button>
    </form>,

    <div key={"1"}>
      <div>{dict["It's your link. Now you just have to share it."]}</div>
      <div className="flex flex-row gap-4 items-baseline">
        <TextInput
          type="url"
          name="label"
          value={uniqueLink}
          disabled
          className="text-digitalent-green font-bold w-full"
          dict={{ invalidEmail: dict["invalidEmail"] }}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            try {
              navigator.clipboard.writeText(uniqueLink).then(() => {
                toast.success(dict["Copied the link to clipboard"]);
              });
            } catch {
              toast.error(dict["Something went wrong"]);
            }
          }}
          name="Copy"
          type="primary"
        >
          {dict["Copy"]}
        </Button>
      </div>
      <p className="mt-8">{dict["link.instructions"]}</p>
      <div>
        <Button
          className="mt-16 float-left"
          onClick={() => setStepNumber(stepNumber - 1)}
          name="Go back"
        >
          {dict["Go back"]}
        </Button>
      </div>
    </div>,
  ];

  return (
    <div className="w-full hidden sm:block">
      <Button
        type="invert"
        onClick={() => setIsOpen(true)}
        className="relative w-full bg-white !text-digitalent-blue hover:!border-white"
        name="Share with a friend"
      >
        {dict["Share this job and earn 500 CHF"]}
      </Button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={dict["Share a job"]}
        >
          {steps[stepNumber]}
        </Modal>
      )}
    </div>
  );
}
