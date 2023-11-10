"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";

export default function Accordion({
  title,
  children,
  isOpen = false,
  labelTag,
}: {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  labelTag?: string | number;
}) {
  return (
    <div className="w-full py-2">
      <Disclosure defaultOpen={isOpen}>
        {({ open }) => (
          <>
            <div className="flex">
              <Disclosure.Button className="flex w-full justify-left gap-2 py-2 text-left font-medium -mx-1">
                <ChevronUpIcon
                  className={`${!open ? "rotate-180 transform" : ""} h-7 w-7`}
                />
                <h3 className="text-xl">{title}</h3>
                {labelTag && (
                  <span className="cursor-pointer border-2 border-digitalent-green text-digitalent-green font-title px-2 ml-1 flex justify-center items-center rounded-full">
                    {labelTag}
                  </span>
                )}
              </Disclosure.Button>
            </div>
            <Disclosure.Panel className="pl-1 pt-4 pb-2 text-digitalent-blue w-full">
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
