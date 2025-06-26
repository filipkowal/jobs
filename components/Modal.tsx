"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({
  isOpen,
  setIsOpen,
  title,
  children,
  footer,
  onClose,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: Function;
}) {
  function closeModal() {
    onClose && onClose();
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  className={`transform overflow-hidden bg-digitalent-gray-light text-digitalent-blue px-4 pt-4 pb-7 md:py-10 md:px-16 text-left align-middle shadow-xl transition-all w-240 max-w-full`}
                >
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-title font-medium uppercase pb-2 md:pb-6 flex justify-between"
                  >
                    <span className="pr-10 max-w-[90%]">{title}</span>

                    <svg
                      className="w-6 h-6 float-right -translate-y-1 cursor-pointer"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={closeModal}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </DialogTitle>

                  <div className="px-1 -mx-1 sm:mx-0 max-w-full">
                    {children}
                  </div>
                  <div
                    className="w-full"
                    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
                  >
                    {footer}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
