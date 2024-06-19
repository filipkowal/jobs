"use client";
import React from "react";
import * as Slider from "@radix-ui/react-slider";
import "./RangeSlider.css";

const RangeSlider = ({
  value,
  onValueChange,
  max,
  min,
  step,
  name,
  unit,
  className,
}: {
  value: number[] | number;
  onValueChange: (value: number[] | number | null) => void;
  max: number;
  min: number;
  step: number;
  name?: string;
  unit?: string;
  className?: string;
}) => {
  function handleOnValueChange(newValue: number[]) {
    if (Array.isArray(value)) {
      if (newValue[0] === min && newValue[1] === max) {
        return onValueChange(null);
      }

      return onValueChange(newValue);
    }

    if (newValue[0] === min) return onValueChange(null);
    return onValueChange(newValue[0]);
  }

  return (
    <label className={className}>
      <span className="flex justify-between mb-4 text-digitalent-blue md:text-xl">
        <span className="mr-4 max-w-[70%]">{name}</span>
        <span>
          <b className="sm:font-normal">
            {Array.isArray(value) ? `${value[0]} - ${value[1]}` : `${value}`}
          </b>{" "}
          {unit}
        </span>
      </span>
      <Slider.Root
        className={`SliderRoot`}
        value={Array.isArray(value) ? value : [value]}
        onValueChange={handleOnValueChange}
        min={min}
        max={max}
        step={step}
        aria-label={name}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label={`min-${name}`} />
        <Slider.Thumb className="SliderThumb" aria-label={`max-${name}`} />
      </Slider.Root>
    </label>
  );
};

export default RangeSlider;
