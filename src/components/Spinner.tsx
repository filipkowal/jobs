import Image from "next/image";

export default function Spinner() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image src="/spinner.svg" alt="loading" width={70} height={70} />
    </div>
  );
}
