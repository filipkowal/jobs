"use client";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { IsDraggingOver } from "../utils/hooks";

export type FileWithId = Pick<
  File,
  "name" | "lastModified" | "size" | "type"
> & {
  content: string | ArrayBuffer;
} & { id: string };

export default function FileInput({
  files,
  setFiles,
  dropZoneText,
  className,
  accept: acceptProp,
  dict,
}: {
  files: FileWithId[];
  setFiles: Dispatch<SetStateAction<FileWithId[]>>;
  dropZoneText: string;
  className?: string;
  accept?: DropzoneOptions["accept"];
  dict: {
    drop: string;
    select: string;
    fileReadError: string;
    fileUploadError: string;
  };
}) {
  const accept = acceptProp || {
    "image/*": [],
    "application/pdf": [".pdf"],
  };

  const { isDragging, ...draggingHandlers } = IsDraggingOver();

  return (
    <div className={`flex flex-col justify-between ${className}`}>
      <Dropzone
        onDrop={(acceptedFiles) => {
          acceptedFiles.forEach((file) => {
            const { name, lastModified, size, type } = file;
            const reader = new FileReader();

            reader.onabort = () => toast.error(dict.fileReadError);
            reader.onerror = (e) => toast.error(dict.fileUploadError);
            reader.onload = () => {
              const content = reader.result;

              if (content)
                setFiles((files) => [
                  ...files,
                  { name, lastModified, size, type, content, id: uuidv4() },
                ]);
            };

            reader.readAsDataURL(file);
          });
        }}
        accept={accept}
        onError={(err) => toast.error(err.message)}
        onDropRejected={(reasons) =>
          reasons.map((r) =>
            r.errors.map((e) =>
              toast.error("file-invalid-type" ? dict.select : e.code)
            )
          )
        }
        data-testid="dropzone"
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              {...draggingHandlers}
              className={`${
                isDragging
                  ? "bg-digitalent-blue text-digitalent-gray-light"
                  : ""
              } w-full h-24 flex flex-col justify-center items-center border-digitalent-blue border-2 cursor-pointer hover:bg-digitalent-blue hover:text-digitalent-gray-light`}
            >
              <input {...getInputProps()} />
              <p className="font-title font-medium uppercase">
                {dropZoneText || dict.drop}
              </p>

              {/* Accepted formats info */}
              {/* Display keys of all-acceptig files like image/* or individual extensions (values) */}
              <p className="text-sm mt-2">
                {"(" +
                  Object.keys(accept)
                    .map((key) =>
                      key.includes("/*")
                        ? key.replace("/*", "")
                        : accept[key].join(", ")
                    )
                    .join(", ") +
                  ")"}
              </p>
            </div>

            <FilesList />
          </section>
        )}
      </Dropzone>
    </div>
  );

  function FilesList() {
    return (
      <div>
        {files.map((file) => (
          <div className="flex gap-4 mt-4 sm:mt-0 pt-[0.6rem]" key={file.id}>
            <p className="font-bold text-digitalent-green">{file.name}</p>
            <XMarkIcon
              height={26}
              onClick={() => setFiles(files.filter((f) => f.id !== file.id))}
              className="cursor-pointer"
              data-testid="remove-file"
            />
            <br />
          </div>
        ))}
      </div>
    );
  }
}
