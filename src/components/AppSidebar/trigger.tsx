"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { IoIosArrowForward } from "react-icons/io";

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button className="ml-3 self-center" onClick={toggleSidebar}>
      <IoIosArrowForward className="w-6 h-6 text-violet-200" />
    </button>
  );
}
