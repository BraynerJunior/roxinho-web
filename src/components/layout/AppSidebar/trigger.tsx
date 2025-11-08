"use client";

import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import { IoIosArrowForward } from "react-icons/io";

export function CustomTrigger() {
  const { toggleSidebar, open} = useSidebar();

  return (
    <button className="ml-2 self-center" onClick={toggleSidebar}>
      <IoIosArrowForward className={clsx("w-6 h-6 text-violet-200 transition", open ? "rotate-180" : "")} />
    </button>
  );
}
