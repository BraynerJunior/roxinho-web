"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { UserModel } from "@/models/user/user-model";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import React, { JSX } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toggleUserAccess } from "@/actions/dashboard/toggle-user-access-action";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

interface DataTableHomeProps {
  data: UserModel[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  perPage: number;
}

const roleToLabelMap: Record<string, JSX.Element> = {
  user: (
    <div className="flex items-center gap-2 text-right">
      Aceito
      <div className="rounded-full w-2 h-2 bg-green-500 animate-pulse group-hover:bg-green-800" />
    </div>
  ),
  admin: (
    <div className="flex items-center gap-2 text-right">
      Administrador
      <div className="rounded-full w-2 h-2 bg-blue-500 animate-pulse group-hover:bg-blue-800" />
    </div>
  ),
  not_allowed: (
    <div className="flex items-center gap-2 text-right">
      Pendente
      <div className="rounded-full w-2 h-2 bg-yellow-500 animate-pulse group-hover:bg-yellow-700" />
    </div>
  ),
};

export function getRoleLabel(role: string): JSX.Element {
  return (
    roleToLabelMap[role] ?? (
      <span className="flex items-center gap-1 text-gray-500">
        Desconhecido
        <div className="rounded-full w-2 h-2 bg-gray-400" />
      </span>
    )
  );
}

export const columns: ColumnDef<UserModel>[] = [
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
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name") || "-"}</div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "email",
    header: "E-mail",
    cell: ({ row }) => <div>{row.getValue("email") || "-"}</div>,
  },
  {
    accessorKey: "systemRole",
    header: "Acesso",
    cell: ({ row }) => {
      const user = row.original;
      const currentRole = row.getValue("systemRole") as string;
      
      const isAdmin = currentRole === "admin";
      const isPending = currentRole === "not_allowed";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger disabled={isAdmin} asChild>
            <div className="cursor-pointer group">
              {getRoleLabel(currentRole) || "-"}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-[180px]">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await toggleUserAccess(user.id, currentRole);
              }}
            >
              {isPending ? "Conceder acesso" : "Remover acesso"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Cargo",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role") || "-"}</div>
    ),
  },
];

export function DataTableHome({
  data,
  totalPages,
  totalItems,
  currentPage,
  perPage,
}: DataTableHomeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    params.set("perPage", String(perPage));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {{
                          asc: <IoIosArrowRoundDown />,
                          desc: <IoIosArrowRoundUp />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>{" "}
          — Total de usuários: <strong>{totalItems}</strong>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
