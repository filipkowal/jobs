"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { type Locale, postData } from "../../../utils";

const Modal = dynamic(() => import("../../../components/Modal"));

export default function SaveJob({
  jobId,
  locale,
  dict,
}: {
  jobId?: string;
  locale: Locale;
  dict: {
    title: string;
    description: string;
    titleMobile: string;
    apply: string;
    invalidEmail: string;
    success: string;
    error: string;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <Button
        type="invert"
        className="hidden sm:block relative w-full mb-10 hover:!bg-digitalent-blue hover:!text-white hover:!border-white"
        name="Save job"
        onClick={() => setIsOpen(true)}
      >
        {dict.title}
      </Button>
      <Button
        type="invert"
        className="block sm:hidden text-sm relative w-full mt-4 !border-digitalent-green !text-digitalent-green hover:!bg-digitalent-blue hover:!text-white hover:!border-white"
        name="Save job"
        onClick={() => setIsOpen(true)}
      >
        {dict.titleMobile}
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={dict.title}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              await postData("save", locale, {
                email,
                jobId,
              });

              toast.success(dict.success);
              setIsOpen(false);
            } catch (e) {
              toast.error(dict.error);
            }
          }}
          ref={formRef}
        >
          <p className="mb-8">{dict.description}</p>
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-12 block"
            dict={{ invalidEmail: dict.invalidEmail }}
          />
          <Button
            type="primary"
            submitType
            className="w-full"
            disabled={
              !email || (!!formRef.current && !formRef.current?.checkValidity())
            }
          >
            {dict.apply}
          </Button>
        </form>
      </Modal>
    </>
  );
}
