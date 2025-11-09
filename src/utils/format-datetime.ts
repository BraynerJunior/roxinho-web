import {
  format,
  formatDistanceToNow as dateFnsformatDistanceToNow,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDatetime(rawDate: string): string {
  const date = new Date(rawDate);

  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatDatetimeNoHour(rawDate: string): string {
  const date = new Date(rawDate);

  return format(date, "dd/MM/yyyy", {
    locale: ptBR,
  });
}

export function formatDateMonthYear(
  rawDate: Date | string | null | undefined
): string {
  if (!rawDate) throw new Error("Data inválida");

  const date = new Date(rawDate!);
   if (isNaN(date.getTime())) throw new Error("Data inválida");

  return format(date, "MMMM 'de' yyyy", {
    locale: ptBR,
  });
}

export function formatDistanceToNow(rawDate: string): string {
  const date = new Date(rawDate);

  return dateFnsformatDistanceToNow(date, {
    locale: ptBR,
  });
}

export function formatHour(timestampMs: number): string {
  const date = new Date(timestampMs);

  return format(date, "HH:mm:ss", {
    locale: ptBR,
  });
}
