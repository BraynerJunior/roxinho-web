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
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button asChild variant="outline" disabled={currentPage <= 1}>
        <Link href={`${baseUrl}?page=${currentPage - 1}&per_page=${perPage}`}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Anterior
        </Link>
      </Button>
      <span className="text-sm text-violet-100">
        Página {currentPage} de {totalPages}
      </span>
      <Button asChild variant="outline" disabled={currentPage >= totalPages}>
        <Link href={`${baseUrl}?page=${currentPage + 1}&per_page=${perPage}`}>
          Próxima
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
