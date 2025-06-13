function Tag({
  children,
  isActive,
  inverted,
  ...props
}: {
  children: React.ReactNode;
  inverted?: boolean;
  isActive?: boolean;
  props?: any;
}) {
  const colors = inverted
    ? "text-white ring-white"
    : "text-digitalent-blue ring-digitalent-blue";

  return (
    <span
      {...props}
      className={`font-title ring-2 ${colors} 
                  px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer ${
                    isActive ? "bg-digitalent-blue! text-white!" : ""
                  }`}
    >
      {children}
    </span>
  );
}

export default Tag;
