"use client";

import { Dialog, Transition } from "@headlessui/react";
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
            <div className="flex justify-center h-screen text-center items-center">
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
                  className={`transform overflow-hidden h-full sm:h-initial bg-digitalent-gray-light text-digitalent-blue px-4 py-7 md:py-10 md:px-16 text-left align-middle shadow-xl transition-all w-[60rem] max-w-full`}
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
                    className="text-2xl font-title font-medium uppercase leading-6 pr-6 pb-6"
                  >
                    {title}
                  </Dialog.Title>

                  <div className="max-h-[76vh] px-1 -mx-1 sm:mx-0 max-w-full overflow-x-hidden overflow-y-auto">
                    {children}
                  </div>
                  <div className="w-full">{footer}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
