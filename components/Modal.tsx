"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({
  isOpen,
  setIsOpen,
  title,
  children,
  applyButton,
  onClose,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  title: string;
  children: React.ReactNode;
  applyButton?: React.ReactNode;
  onClose?: Function;
}) {
  function closeModal() {
    onClose && onClose();
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center text-center min-h-screen items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`transform h-[100vh] sm:h-fit overflow-hidden  bg-digitalent-gray-light text-digitalent-blue px-4 py-7 sm:py-10 md:p-16 text-left align-middle shadow-xl transition-all w-[60rem] max-w-full`}
                >
                  <svg
                    className="w-6 h-6 absolute right-6 top-6"
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
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-title font-medium uppercase leading-6 pb-6 sm:pb-12"
                  >
                    {title}
                  </Dialog.Title>

                  {children}

                  {applyButton ? (
                    <div className="mt-6 sm:mt-16 float-right">
                      {applyButton}
                    </div>
                  ) : (
                    ""
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
