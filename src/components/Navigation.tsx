import { useContext, useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context } from "./../ContextProvider";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "..";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import "../i18n";

interface NavigationProps {
  variant?: string;
}

export const Navigation = ({ variant }: NavigationProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { username } = useContext(Context);
  const [loginSmallScreen, setLoginSmallScreen] = useState({});

  const handleLogOut = async (): Promise<void> => {
    await signOut(firebaseAuth);
    navigate("/");
  };

  useEffect((): void => {
    if (variant === "login") {
      setLoginSmallScreen({ className: "smallScreenOnly" });
    }
  }, []);

  return (
    <AppBar position="static">
      <Toolbar sx={{ flexBasis: "100%" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CO₂CAR
        </Typography>
        {!!username && (
          <Stack direction="row" spacing={2}>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/home");
              }}
            >
              {t("home")}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/profile");
              }}
            >
              {t("profile")}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                handleLogOut();
              }}
            >
              {t("signOut")}
            </Button>
            <LanguageSwitcher />
          </Stack>
        )}
        {!username && (
          <Stack {...loginSmallScreen} direction="row" spacing={2}>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("signIn")}
            </Button>
            <LanguageSwitcher />
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};
