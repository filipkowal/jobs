"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
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
      <Disclosure as="div" defaultOpen={isOpen}>
        {({ open }) => (
          <>
            <div className="flex">
              <DisclosureButton className="flex w-full justify-left gap-2 py-2 text-left font-medium -mx-1">
                <ChevronUpIcon
                  className={`${!open ? "rotate-180 transform" : ""} h-7 w-7`}
                />
                <h3 className="text-xl">{title}</h3>
                {labelTag && (
                  <span className="cursor-pointer border border-digitalent-green bg-digitalent-green text-white font-title px-[8px] ml-1 flex justify-center items-center rounded-full">
                    {labelTag}
                  </span>
                )}
              </DisclosureButton>
            </div>
            <DisclosurePanel className="pl-1 pt-4 pb-2 text-digitalent-blue w-full">
              {children}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
