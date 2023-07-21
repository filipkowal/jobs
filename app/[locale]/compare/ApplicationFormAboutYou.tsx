import { Dispatch, SetStateAction, useState } from "react";
import { Button, Checkbox, FileInput, TextInput } from "../../../components";
import { ApplicationDict } from "./ApplicationFormModal";
import BackButton from "./BackButton";
import { Locale, postData } from "../../../utils";
import { toast } from "react-hot-toast";

export default function ApplicationFormAboutYou({
  dict,
  locale,
  stepNumber,
  setStepNumber,
  jobIds,
}: {
  dict: ApplicationDict;
  locale: Locale;
  jobIds: string[];
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
}) {
  const linkedInPattern = ".*linkedin.com/in/.+";

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

  return (
    <form
      key={"aboutYou"}
      onSubmit={async (e) => {
        e.preventDefault();

        if (!email || userType !== "talent" || !termsAccepted) return;

        const body = filterObject({
          email,
          sex,
          name,
          message,
          files,
          linkedIn,
          jobIds,
        });

        try {
          await postData("apply", locale, body);

          setStepNumber(stepNumber + 1);
        } catch (e) {
          toast.error((e as Error)?.message || dict["Something went wrong"]);
        }

        function filterObject(obj: Record<string, any>): Record<string, any> {
          const filteredObj: Record<string, any> = {};

          for (const [key, value] of Object.entries(obj)) {
            if (
              (typeof value === "string" || Array.isArray(value)) &&
              value.length > 0
            ) {
              filteredObj[key] = value;
            }
          }

          return filteredObj;
        }
      }}
    >
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
        label={"E-mail"}
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

      <div className="mb-8 mt-4">
        <label className="w-full inline-block sm:w-fit">
          <Checkbox
            name="userType"
            value="talent"
            checked={userType === "talent"}
            onChange={() => {
              setUserType("talent");
            }}
            required
          />
          <span>{dict["I am applying directly"] + " *"}</span>
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
        <div>
          {dict["recruiterInfo1"]}
          <a
            href="https://talentforce.ch/legal/datenschutz-rekrutierungsprozess/"
            className="font-bold"
          >
            {" " + dict["termsAgreed2"] + " "}
          </a>
          {dict["recruiterInfo2"] + " *"}
        </div>
      )}

      {userType === "talent" && (
        <label className="flex gap-1">
          <Checkbox
            name="termsAccepted"
            className="!mt-0"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
            }}
          />
          <div>
            {dict["termsAgreed1"]}
            <a
              href="https://talentforce.ch/legal/datenschutz-rekrutierungsprozess/"
              className="font-bold"
            >
              {" " + dict["termsAgreed2"] + " "}
            </a>
            {dict["termsAgreed3"] + " *"}
          </div>
        </label>
      )}

      <BackButton
        setStepNumber={setStepNumber}
        stepNumber={stepNumber}
        dict={{ "Go back": dict["Go back"] }}
      />
      <Button
        type="primary"
        className="mt-16 float-right"
        name="Next"
        disabled={!email || userType !== "talent" || !termsAccepted}
        submitType
      >
        {dict["Next"]}
      </Button>
    </form>
  );
}
