"use client";

import { Element } from "@/components/Element";

import { elements } from "@/data/elements.json";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { InfoPanel } from "./InfoPanel";

type Props = {
  className?: string;
};

const populateElements = (start: number, end: number) => {
  const items = [];
  for (let i = start; i <= end; i++) {
    items.push(<Element number={i} key={i} />);
  }
  return items;
};

export const Table: React.FC<Props> = (props) => {
  const { className } = props;

  const [hoveredElement, setHoveredElement] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(17,auto)_1fr] gap-1 min-w-[1000px] md:min-w-0 md:w-fit overflow-scroll md:overflow-hidden ",
        className
      )}
    >
      {/* Elements 1-4 */}
      {populateElements(1, 4)}
      {/* Populating elements from 5-57 */}
      {populateElements(5, 57)}
      {/* Lanthanoids split 72-89 */}
      {populateElements(72, 89)}
      {/* Actinoids split 104-119*/}
      {populateElements(104, 118)}
      {/* Lanthenoids 58-71*/}
      {populateElements(58, 71)}
      {/* Actionoids 90-103 */}
      {populateElements(90, 103)}
      {/* Info panel */}
      <InfoPanel hoveredElement={hoveredElement} />
    </div>
  );
};
