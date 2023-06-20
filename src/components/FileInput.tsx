import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import { createId, getLocaleFromPathname, translate } from "../utils";
import { usePathname } from "next/navigation";

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
}: {
  files: FileWithId[];
  setFiles: Dispatch<SetStateAction<FileWithId[]>>;
  dropZoneText: string;
  className?: string;
  accept?: DropzoneOptions["accept"];
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = translate(locale);

  const accept = acceptProp || {
    "image/*": [],
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  };

  return (
    <div className={`flex flex-col justify-between ${className}`}>
      <Dropzone
        onDrop={(acceptedFiles) => {
          acceptedFiles.forEach((file) => {
            const { name, lastModified, size, type } = file;
            const reader = new FileReader();

            reader.onabort = () => toast.error(t("File reading was aborted"));
            reader.onerror = (e) => toast.error(t("File upload error"));
            reader.onload = () => {
              const content = reader.result;

              if (content)
                setFiles((files) => [
                  ...files,
                  { name, lastModified, size, type, content, id: createId() },
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
              toast.error(
                "file-invalid-type"
                  ? t("Please select a file with a valid type")
                  : e.code
              )
            )
          )
        }
        data-testid="dropzone"
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              className="w-full h-24 flex flex-col justify-center items-center border-digitalent-blue border-2"
            >
              <input {...getInputProps()} />
              <p className="font-title font-medium uppercase">
                {dropZoneText || t("Drop files or click to select")}
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
