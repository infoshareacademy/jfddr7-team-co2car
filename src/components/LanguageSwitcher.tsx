import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useRef, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context } from "./../ContextProvider";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "..";
import { useTranslation, Trans } from "react-i18next";
import "../i18n";

const lngs = {
  en: { nativeName: "EN" },
  pl: { nativeName: "PL" },
};

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
