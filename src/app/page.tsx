import Image from "next/image";

import { elements } from "@/data/elements.json";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { X } from "lucide-react";
import { Table } from "@/components/Table";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbital",
  description: "A chemistry tool for university students",
};

export default function Home() {
  return (
    <main className="h-full w-[calc(100%-5px)] flex flex-col items-center bg-transparent mb-8">
      <Table />
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
      />
    </main>
  );
}
