"use client";

import { elements } from "@/data/elements.json";
import { LayoutGroup, motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createElement } from "react";

type Props = {
  key: any;
  number: number;
  disabled?: boolean;
};

export const Element: React.FC<Props> = (props) => {
  const { number } = props;

  const element = elements.find((element) => element.number === number)!;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className={`element-${element.number} ${element.category} element max-w-[70px] max-h-[70px] w-[5vw] h-[5vw] aspect-square flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-[10ms] bg-[hsl(var(--card))] hover:bg-[#333] border border-border rounded-md`}
        >
          <h1 className="font-bold text-lg">{element.symbol}</h1>
          <h3 className="text-xs">{element.number}</h3>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] vw-[90vw] md:h-auto md:max-w-[50vw] rounded-md border-border overflow-auto md:overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">{element.name}</DialogTitle>
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <DialogDescription className="w-full md:w-auto md:max-w-[400px]">
              {element.summary}
              <br />
              <br />
              <b>Symbol:</b> {element.symbol}
              <br />
              <b>Group:</b> {element.group}
              <br />
              <b>Period:</b> {element.period}
              <br />
              <b>Named by:</b> {element.named_by}
              <br />
              <b>Atomic Number:</b> {element.number}
              <br />
              <b>Atomic Mass:</b> {element.atomic_mass}u
              <br />
              <b>Electronic Configuration:</b>{" "}
              {element.electron_configuration_semantic}
              <br />
              <b>Boiling Temperature:</b> {element.boil}°K
              <br />
              <b>Density:</b> {element.density}
              <br />
              {element.molar_heat && (
                <>
                  <b>Molar Heat:</b> {element.molar_heat}
                  <br />
                </>
              )}
              {element.electronegativity_pauling && (
                <>
                  <b>Electronegativity:</b> {element.electronegativity_pauling}
                  <br />
                </>
              )}
            </DialogDescription>
            {createElement("model-viewer", {
              alt: `${element.name}'s 3D Model`,
              src: element.bohr_model_3d,
              poster: element.image,
              className: "aspect-square w-full md:w-[20vw] h-full",
              "camera-controls": true,
              "auto-rotate": true,
              "touch-action": "pan-x",
            })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
