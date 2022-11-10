// import styles from "./Register.module.css";
// import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Context } from "../ContextProvider";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Box, TextField, Typography, Button } from "@mui/material";

/*interface RegisterProps {
  registerEmail: string;
  registerPassword: string;
}*/

export const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();
  const { setUsername } = useContext(Context);

  const onRegister = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

    await signInWithEmailAndPassword(auth, registerEmail, registerPassword);

    //const user = { registerEmail, registerPassword };
    setUsername(registerEmail);
    navigate("/signin");
  };

  return (
    <>
      <div>
        <Typography variant="h5" padding={3} textAlign="center">
          Proszę zarejestruj się, żeby korzystać z aplikacji
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
              onChange={(event) => setRegisterEmail(event.target.value)}
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder="wpisz swój email"
              label="E-mail"
            />
            <TextField
              onChange={(event) => setRegisterPassword(event.target.value)}
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="wpisz swóje hasło"
              label="Hasło"
            />

            <Button
              onClick={onRegister}
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="warning"
            >
              Zarejestruj
            </Button>
            <p>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Masz konto? Przejdź do logowania
              </Button>
            </p>
          </Box>
        </form>
      </div>
    </>
  );
};
