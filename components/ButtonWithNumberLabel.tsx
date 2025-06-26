"use client";

import { getCustomHeaderColors, type CustomBoard } from "@/utils";
import PinIcon from "@/components/icons/PinIcon";
import Button from "@/components/Button";

export default function ButtonWithNumberLabel({
  onClick,
  buttonActive,
  text,
  num = 0,
  customBoard,
}: {
  onClick: () => void;
  buttonActive: boolean;
  text: string;
  customBoard?: CustomBoard;
  num?: number;
}) {
  const { textColor, bgColor, isCustom } = getCustomHeaderColors(customBoard);

  return (
    <Button
      onClick={onClick}
      className={`group ml-4! sm:ml-8! flex gap-2 relative ${
        buttonActive && !isCustom
          ? "hover:text-digitalent-green! animate-pulse repeat-[2]"
          : ""
      }`}
      name="Compare"
      disabled={!buttonActive}
      type="invert"
      style={{
        borderColor: textColor,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {text}

      <PinIcon
        color={textColor || "white"}
        className={`-translate-y-px ${buttonActive && `group-hover:hidden`}`}
      />
      <PinIcon
        color={textColor || "#66B573"}
        className={`-translate-y-px hidden ${
          buttonActive && `group-hover:block`
        }`}
      />

      {num > 0 && (
        <div
          className={`text-digitalent-green bg-white rounded-full w-6 h-6 absolute -bottom-[5px] -right-[5px] ${
            buttonActive
              ? "group-hover:text-white group-hover:bg-digitalent-green"
              : ""
          }`}
          style={{
            backgroundColor: textColor,
            color: bgColor,
          }}
        >
          {num}
        </div>
      )}
    </Button>
  );
}
