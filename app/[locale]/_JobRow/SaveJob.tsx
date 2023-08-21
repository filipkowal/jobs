"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { type Locale, postData } from "../../../utils";

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
  const Modal = dynamic(() => import("../../../components/Modal"));

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

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
      {isOpen && (
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
          >
            <p className="mb-8">{dict.description}</p>
            <TextInput
              type="email"
              name="email"
              label="E-mail"
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
              disabled={!email}
            >
              {dict.apply}
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
}
