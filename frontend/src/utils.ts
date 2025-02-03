export const lineBreakString = (
  quote: string,
  start: number,
  end: number
): string => {
  const regex = new RegExp(`(\\S+\\s*){${start},${end}}`, "g");
  return quote.replace(regex, "$&\n");
};
