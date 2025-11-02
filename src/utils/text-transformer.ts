export function limitarTexto(texto: string, limite: number = 20): string {
  if (texto.length <= limite) return texto;
  return texto.slice(0, limite) + '...';
}
