"use client";

import * as Slider from "@radix-ui/react-slider";

// The time control: a discrete slider with one stop per historic map plus the
// final "Today" stop. The year labels beneath the track are buttons that jump
// straight to their stop — with only a handful of stops, tapping a year beats
// dragging a thumb, especially on touch screens. Styled in globals.css with
// the site's Radix gray tokens.

interface EraSliderProps {
  stops: string[]; // ascending era labels, ending with "Today"
  value: number; // index into stops
  onChange: (index: number) => void;
}

export function EraSlider({ stops, value, onChange }: EraSliderProps) {
  return (
    <div>
      <Slider.Root
        className="atlas-slider"
        min={0}
        max={stops.length - 1}
        step={1}
        value={[value]}
        onValueChange={([next]) => onChange(next)}
        aria-label="Year"
      >
        <Slider.Track className="atlas-slider__track">
          <Slider.Range className="atlas-slider__range" />
        </Slider.Track>
        <Slider.Thumb
          className="atlas-slider__thumb"
          aria-valuetext={stops[value]}
        />
      </Slider.Root>
      <div className="atlas-slider__ticks">
        {stops.map((label, index) => (
          <button
            key={label}
            type="button"
            className="atlas-tick"
            data-active={index === value}
            onClick={() => onChange(index)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
