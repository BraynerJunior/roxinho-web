export function limitarTexto(
  texto: string,
  limite: number = 20,
  addDot: boolean = false
): string {
  if (texto.length <= limite) return texto;
  let result = texto.slice(0, limite);

  if (addDot) {
    result = result + "...";
  }

  return result;
}
