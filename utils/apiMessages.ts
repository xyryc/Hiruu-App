import i18n from "./i18n";

export const translateApiMessage = (messageKey: string): string => {
  const translationKey = `api.${messageKey}`;
  const translated = i18n.t(translationKey);

  // If no translation found, return the original key
  return translated === translationKey ? messageKey : translated;
};
