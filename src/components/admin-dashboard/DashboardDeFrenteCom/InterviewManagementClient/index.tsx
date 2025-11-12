"use client";

import React, { useState } from "react";
import { InterviewSummary } from "@/models/interview/interview-summary-model";
import { DataTableInterviews } from "../DeFrenteComTable/table";
import { InterviewDetailPane } from "../DeFrenteComDetail";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface InterviewManagementClientProps {
  initialData: InterviewSummary[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  perPage: number;
}

export function InterviewManagementClient({
  initialData,
  totalPages,
  totalItems,
  currentPage,
  perPage,
}: InterviewManagementClientProps) {
  const [selectedId, setSelectedId] = useState<number | "new" | null>(null);
  const [rows, setRows] = useState<InterviewSummary[]>(initialData);

  const clearSelection = () => {
    setSelectedId(null);
  };

  const handleRowSelect = (id: number) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 gap-6 items-center">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl text-center font-semibold">
            Lista de Entrevistas
          </h1>
          <Button onClick={() => setSelectedId("new")} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Entrevista
          </Button>
        </div>
        <DataTableInterviews
          data={rows}
          totalPages={totalPages}
          totalItems={totalItems}
          currentPage={currentPage}
          perPage={perPage}
          onRowSelect={handleRowSelect}
          selectedId={selectedId}
        />
      </div>

      <div className="lg:col-span-1 flex justify-center">
        <div className="max-w-11/12">
          <InterviewDetailPane
            selectedId={selectedId}
            onClear={clearSelection}
            onUpsertRow={(row: InterviewSummary) => {
              setRows((prev) => {
                const exists = prev.some((r) => r.id === row.id);
                if (exists) {
                  return prev.map((r) => (r.id === row.id ? { ...r, ...row } : r));
                }
                return [row, ...prev];
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
