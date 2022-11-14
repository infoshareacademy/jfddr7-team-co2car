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
import {
  Box,
  TextField,
  Typography,
  Button,
  ListItemSecondaryAction,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";

/*interface RegisterProps {
  registerEmail: string;
  registerPassword: string;
}*/

const USER_ALREADY_EXISTS_ERROR = "auth/email-already-in-use";
const WEAK_PASSWORD_ERROR = "auth/weak-password";
const INVALID_EMAIL_ERROR = "auth/invalid-email";

export const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const navigate = useNavigate();
  const { setUsername } = useContext(Context);
  const [error, setError] = useState("");

  const onRegister = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (registerPassword === repeatedPassword) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        // await signInWithEmailAndPassword(auth, registerEmail, registerPassword);
        setUsername(registerEmail);
        navigate("/signin");
      } catch ({ code, message }) {
        if (code === WEAK_PASSWORD_ERROR) {
          setError("Hasło musi mieć przynajmniej 6 znaków długości.");
          setTimeout(() => {
            setError("");
          }, 5000);
          return;
        }
        if (code === INVALID_EMAIL_ERROR) {
          setError("Niepoprawny adres e-mail.");
          setTimeout(() => {
            setError("");
          }, 5000);
          return;
        }
        if (code === USER_ALREADY_EXISTS_ERROR) {
          setError("Konto na podany adres e-mail już istnieje.");
          setTimeout(() => {
            setError("");
          }, 5000);
          return;
        }
      }
    } else {
      setError("Podane hasła nie są takie same.");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
  };

  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <Typography
            variant="h5"
            padding={3}
            textAlign="center"
            color="primary.main"
            marginTop={5}
          >
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

              {/* wprowadzam nowego inputa do powtórzenia hasła
               */}
              <TextField
                onChange={(event) => setRepeatedPassword(event.target.value)}
                margin="normal"
                type={"password"}
                variant="outlined"
                placeholder="powtórz swóje hasło"
                label="Powtórzone hasło"
              />

              <Typography sx={{ height: 20, color: "secondary.main" }}>
                {error}
              </Typography>

              <Button
                onClick={onRegister}
                sx={{ marginTop: 3, borderRadius: 3 }}
                variant="contained"
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
        </ThemeProvider>
      </div>
    </>
  );
};
