import { FC, useContext } from "react";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "./../ContextProvider";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "..";

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const { username, setUsername } = useContext(Context);

  const handleLogOut = async (): Promise<void> => {
    await signOut(firebaseAuth);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CO2CAR
        </Typography>
        <Typography sx={{ flexGrow: 1 }}>{username}</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/home");
            }}
          >
            Strona Główna
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profil
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              handleLogOut();
            }}
          >
            Wyloguj
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
