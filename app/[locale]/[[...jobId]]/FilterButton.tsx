export default function FilterButton({ text }: { text: string }) {
  return (
    <span
      className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
    >
      {text}
    </span>
  );
}
