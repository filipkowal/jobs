import { Dispatch, SetStateAction, useRef, useState, useContext } from "react";
import {
  Button,
  Checkbox,
  FileInput,
  LoadingEllipsis,
  TextInput,
} from "@/components";
import {
  CustomBoard,
  Locale,
  postData,
  stripOfEmptyStringsAndArrays,
} from "@/utils";
import { toast } from "react-hot-toast";
import { Dictionary } from "@/utils/server";
import { PinnedJobsContext } from "@/app/[locale]/PinnedJobsContextProvider";

export default function ApplicationFormAboutYou({
  dict,
  locale,
  stepNumber,
  setStepNumber,
  jobIds,
  customBoard,
}: {
  dict: Dictionary["compareJobTable"];
  locale: Locale;
  jobIds: string[];
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
  customBoard: CustomBoard;
}) {
  const { setPinnedJobs } = useContext(PinnedJobsContext);
  const [sex, setSex] = useState<"man" | "woman" | "other" | undefined>();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [linkedIn, setLinkedIn] = useState("");
  const [userType, setUserType] = useState<null | "talent" | "headhunter">(
    null
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const linkedInPattern = ".*linkedin.com/in/.+";
  const isApplicationInvalid =
    userType === null || (userType === "talent" && !termsAccepted);

  return (
    <form
      ref={formRef}
      key={"aboutYou"}
      onSubmit={async (e) => {
        e.preventDefault();

        if (isApplicationInvalid) return;

        setIsLoading(true);

        const body = stripOfEmptyStringsAndArrays({
          email,
          sex,
          name,
          message,
          files,
          linkedIn,
          jobIds,
        });

        try {
          await postData({
            endpoint: "apply",
            locale,
            data: body,
            boardId: customBoard?.id,
          });

          setStepNumber(stepNumber + 1);
          setIsLoading(false);

          // Remove all pinned jobs
          setPinnedJobs([]);
        } catch (e) {
          toast.error((e as Error)?.message || dict["Something went wrong"]);
          setIsLoading(false);
        }
      }}
    >
      <label className="mr-4">
        <Checkbox
          name="sex"
          value="man"
          checked={sex === "man"}
          onChange={() => {
            setSex("man");
          }}
        />
        <span>{dict["Man"]}</span>
      </label>
      <label className="mr-4">
        <Checkbox
          name="sex"
          value="woman"
          checked={sex === "woman"}
          onChange={() => {
            setSex("woman");
          }}
        />
        <span>{dict["Woman"]}</span>
      </label>
      <label className="mr-4">
        <Checkbox
          name="sex"
          value="other"
          checked={sex === "other"}
          onChange={() => {
            setSex("other");
          }}
        />
        <span>{dict["Other"]}</span>
      </label>
      <TextInput
        dict={{ invalidEmail: dict["invalidEmail"] }}
        type="email"
        required
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label={"Email"}
      />
      <TextInput
        dict={{ invalidEmail: dict["invalidEmail"] }}
        label={dict["Name"]}
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        dict={{ invalidEmail: dict["invalidEmail"] }}
        className="w-full bg-digitalent-gray-light ring-1 ring-digitalent-blue mt-4 block"
        name="message"
        label={dict["Message"]}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
      />

      {/* Experience */}

      <TextInput
        dict={{ invalidEmail: dict["invalidEmail"] }}
        className="mt-4 block w-full"
        label={dict["Link to your LinkedIn profile"] + ": linkedin.com/in/..."}
        name="linkedIn"
        value={linkedIn}
        onChange={(e) => setLinkedIn(e.target.value)}
        pattern={linkedInPattern}
      />
      <FileInput
        dict={dict.fileInput}
        files={files}
        setFiles={setFiles}
        dropZoneText={dict["Drop CV files or click to select"]}
        className="mt-4"
      />

      {/* Entity type */}

      <div className="my-4">
        <label className="w-full inline-block sm:w-fit">
          <Checkbox
            name="userType"
            value="talent"
            checked={userType === "talent"}
            onChange={() => {
              setUserType("talent");
            }}
          />
          <span>{dict["I am applying directly"]}</span>
        </label>
        <label className="w-full inline-block sm:w-fit sm:ml-4">
          <Checkbox
            name="userType"
            value="headhunter"
            checked={userType === "headhunter"}
            onChange={() => {
              setUserType("headhunter");
            }}
          />
          <span>{dict["I work for a recruitment agency"]}</span>
        </label>
      </div>

      {/* Terms and conditions */}

      {userType === "headhunter" && (
        <div className="mt-4 mb-8">{dict["recruiterInfo"]}</div>
      )}

      {userType === "talent" && (
        <label className="flex gap-1 mt-4 mb-8">
          <Checkbox
            name="termsAccepted"
            className="mt-0!"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
            }}
          />
          <div>
            {"* " + dict["termsAgreed1"]}
            <a
              href="https://talentforce.ch/legal/datenschutz-rekrutierungsprozess/"
              className="font-bold"
              target="_blank"
            >
              {" " + dict["termsAgreed2"] + " "}
            </a>
            {dict["termsAgreed3"]}
          </div>
        </label>
      )}

      <Button
        className="float-left"
        onClick={(e) => {
          e.preventDefault();
          setStepNumber(stepNumber - 1);
        }}
        name="Go back"
      >
        {dict["Go back"]}
      </Button>

      <Button
        submitType
        type="primary"
        className="float-right"
        name="Next"
        disabled={
          isApplicationInvalid ||
          isLoading ||
          (!!formRef.current && !formRef.current?.checkValidity())
        }
      >
        {dict["Next"]}
        <LoadingEllipsis isLoading={isLoading} />
      </Button>
    </form>
  );
}
