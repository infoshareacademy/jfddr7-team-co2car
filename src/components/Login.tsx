// import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Context } from "../ContextProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Typography, Button } from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useContext(Context);
  const onLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    await signInWithEmailAndPassword(auth, login, password);
    setUsername(login);
    navigate("/home");
  };
  return (
    <>
      <div>
        <Typography variant="h5" padding={3} textAlign="center">
          Zaloguj się, aby korzystać z aplikacji
        </Typography>
        <form>
          <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth={400}
            alignItems={"center"}
            justifyContent={"center"}
            margin={"auto"}
            marginTop={5}
            padding={3}
            borderRadius={5}
            // boxShadow={5, 5, 10 #ccc}
            sx={{
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <TextField
              onChange={(event) => setLogin(event.target.value)}
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder="wpisz swój email"
              label="E-mail"
            />
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="wpisz swóje hasło"
              label="Hasło"
            />

            <Button
              onClick={onLogin}
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="warning"
            >
              Zaloguj
            </Button>
            <p>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
              >
                Nie masz konta? Przejdź do rejestracji
              </Button>
            </p>
          </Box>
        </form>
      </div>
    </>
  );
};

{
  /* <Box
  display={"flex"}
  flexDirection={"column"}
  maxWidth={400}
  alignItems={"center"}
  justifyContent={"center"}
  margin={"auto"}
  marginTop={5}
  padding={3}
  borderRadius={5}
  boxShadow={5px 5px 10px #ccc}
  sx={{":hover":{
    boxShadow:"10px 10px 20px #ccc"
  },}}
>

<Button to="/register">Przejdź do rejestracji</Button>

</Box> */
}
