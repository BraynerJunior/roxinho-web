"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Loader2, Search, ChevronsUpDown } from "lucide-react";
import { findUsersByName } from "@/actions/users/find-users-by-name";
import { findUserByIdAction } from "@/actions/users/find-users-by-id";

interface UserSearchSelectProps {
  value?: number;
  onChange: (userId: number) => void;
  disabled?: boolean;
}

export function UserSearchSelect({
  value,
  onChange,
  disabled,
}: UserSearchSelectProps) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [isPending, startTransition] = useTransition();

  const [isSelecting, setIsSelecting] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value) {
      startTransition(async () => {
        try {
          const user = await findUserByIdAction(value);
          if (!user || user.id === null) {
            console.warn("Usuário não encontrado ou ID nulo para:", value);
            setUsers([]);
            return;
          }
          const safeName = user.name ?? "Sem nome";
          setSearch(safeName);
          setUsers([{ id: user.id, name: safeName }]);
        } catch (error) {
          console.error("Erro ao buscar usuário inicial:", error);
          setUsers([]);
        }
      });
    } else {
      setSearch("");
      setUsers([]);
    }
  }, [value]);

  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }

    const term = search.trim();

    if (term.length < 2) {
      if (term.length === 0) setUsers([]);
      return;
    }

    const timeout = setTimeout(() => {
      startTransition(async () => {
        try {
          const { data } = await findUsersByName(term);
          setUsers(
            data.map((user) => ({
              id: user.id!,
              name: user.name ?? "Sem nome",
            }))
          );
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, isSelecting]);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
            disabled={disabled}
          >
            {search || "Buscar usuário..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-[300px]">
          <Command>
            <CommandInput
              placeholder="Digite para buscar..."
              value={search}
              onValueChange={setSearch}
              disabled={disabled}
            />
            <CommandList>
              {isPending && (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}

              {!isPending && users.length === 0 && search.length >= 2 && (
                <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
              )}

              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => {
                    setIsSelecting(true);
                    onChange(user.id);
                    setSearch(user.name);
                    setOpen(false);
                  }}
                  value={user.name}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {user.name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
