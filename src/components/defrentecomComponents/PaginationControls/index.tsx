"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  perPage: number;
  baseUrl: string;
}

export function PaginationControls({
  totalPages,
  currentPage,
  perPage,
  baseUrl,
}: PaginationControlsProps) {
  console.log({ currentPage });

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-4 mt-8">
        <Button
          variant="ghost"
          className="hover:bg-purple-800"
          disabled={currentPage <= 1}
        >
          <Link href={`${baseUrl}?page=${currentPage - 1}&per_page=${perPage}`}>
            <ChevronLeft className="mr-2 h-4 w-4 text-white" />
          </Link>
        </Button>
        <span className="text-sm text-violet-100">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="ghost"
          className="hover:bg-purple-800"
          disabled={currentPage >= totalPages}
        >
          <Link href={`${baseUrl}?page=${currentPage + 1}&per_page=${perPage}`}>
            <ChevronRight className="ml-2 h-4 w-4 text-white" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
