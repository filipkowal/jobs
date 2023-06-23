export const allUppercase = (text: string): string =>
  text.replace(/([A-Z])/g, " $&").replace(/^./, text[0].toUpperCase());
