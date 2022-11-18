import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <ButtonGroup variant="contained" color="primary">
      <Button
        onClick={() => {
          i18n.changeLanguage("en");
        }}
        disabled={i18n.resolvedLanguage === "en"}
      >
        EN
      </Button>
      <Button
        onClick={() => {
          i18n.changeLanguage("pl");
        }}
        disabled={i18n.resolvedLanguage === "pl"}
      >
        PL
      </Button>
    </ButtonGroup>
  );
};
