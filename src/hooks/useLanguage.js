import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  return {
    lang: i18n.language,
  };
};
