import { Checkbox } from "@/components/ui/checkbox";
import { InterviewSummary } from "@/models/interview/interview-summary-model";
import { formatDatetimeNoHour } from "@/utils/format-datetime";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<InterviewSummary>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Nome",
    cell: ({ row }) => {
      const summary = row.original;
      const userName = summary.username;

      return (
        <div className="flex items-center gap-2">
          {summary.avatarUrl ? (
            <Image
              src={summary.avatarUrl}
              alt={userName || "Avatar do usuário"}
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
              {userName?.match(/\b(\w)/g)?.join("") || "U"}
            </div>
          )}
          <span className="capitalize">{userName || "-"}</span>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "jobRole",
    header: "Cargo",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("jobRole") || "-"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => (
      <div>{formatDatetimeNoHour(row.getValue("createdAt")) || "-"}</div>
    ),
  },
];
