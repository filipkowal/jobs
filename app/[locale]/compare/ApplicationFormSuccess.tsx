import Image from "next/image";

export default function ApplicationFormSuccessStep({
  dict,
}: {
  dict: { applyFormSuccess: string };
}) {
  return (
    <div key="successStep">
      <div className="w-full flex justify-center mb-4 text-3xl">
        <picture>
          <source
            srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.webp"
            type="image/webp"
          />
          <Image
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.gif"
            alt="🎉"
            width="32"
            height="32"
          />
        </picture>
      </div>
      <p>{dict["applyFormSuccess"]}</p>
    </div>
  );
}
