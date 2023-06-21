"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

export default function CookiePopup({
  dict,
}: {
  dict: { title: string; message: string; acceptButton: string };
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof localStorage === "undefined") return;

    if (!localStorage?.getItem("cookieConsent")) setIsOpen(true);
  }, []);

  function handleClose() {
    setIsOpen(false);

    if (typeof localStorage !== "undefined")
      localStorage?.setItem("cookieConsent", "true");
  }

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-0 right-0 bg-digitalent-blue shadow-lg z-50 w-72 transition-opacity duration-500`}
    >
      <div className="p-6 pb-0">
        <h2 className="text-lg font-medium text-white mb-2">{dict.title}</h2>
        <p className="text-sm text-white font-light">{dict.message}</p>
      </div>
      <Button
        onClick={handleClose}
        className="m-6 w-[calc(100%-36px)] bg-digitalent-green-light ring-digitalent-green-light hover:ring-digitalent-green-light hover:bg-digitalent-green-light hover:!text-digitalent-blue"
      >
        {dict.acceptButton}
      </Button>
    </div>
  );
}
