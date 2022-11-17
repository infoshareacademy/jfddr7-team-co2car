import { FC, useContext, useRef, useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context } from "./../ContextProvider";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "..";

interface NavigationProps {
  variant?: string;
}

export const Navigation = ({ variant }: NavigationProps) => {
  const navigate = useNavigate();
  const { username } = useContext(Context);

  const handleLogOut = async (): Promise<void> => {
    await signOut(firebaseAuth);
    navigate("/");
  };

  const [loginSmallScreen, setLoginSmallScreen] = useState({})

  useEffect((): void => {
    if (variant === "login") {
      setLoginSmallScreen({className: "smallScreenOnly"});
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
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                handleLogOut();
              }}
            >
              Sign Out
            </Button>
          </Stack>
        )}
        {!username && (
          <Stack
          {...loginSmallScreen}
          direction="row" spacing={2}>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};
