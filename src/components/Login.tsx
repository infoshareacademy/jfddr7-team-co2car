// import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Context } from "../ContextProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";

const INVALID_EMAIL_ERROR = "auth/invalid-email";

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useContext(Context);
  const [error, setError] = useState("");

  const onLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, login, password);
      setUsername(login);
      navigate("/home");
    } catch ({ code, message }) {
      if (code === INVALID_EMAIL_ERROR) {
        setError("Incorrect email address");
        setTimeout(() => {
          setError("");
        }, 5000);
        return;
      }
    }
  };

  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <Typography
            color="primary.main"
            variant="h5"
            padding={3}
            textAlign="center"
            marginTop={5}
          >
            Sign in to use the app
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
            >
              <TextField
                onChange={(event) => setLogin(event.target.value)}
                margin="normal"
                type={"email"}
                variant="outlined"
                placeholder="enter your email"
                label="E-mail"
              />
              <TextField
                onChange={(event) => setPassword(event.target.value)}
                margin="normal"
                type={"password"}
                variant="outlined"
                placeholder="enter your password"
                label="Password"
              />
              <Typography sx={{ height: 20, color: "secondary.main" }}>
                {error}
              </Typography>
              <Button
                onClick={onLogin}
                sx={{ marginTop: 3 }}
                variant="contained"
              >
                Sign in
              </Button>
              <p>
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  You don't have an account? Go to registration
                </Button>
              </p>
              <Button
                onClick={() => {
                  navigate("/home");
                }}
                sx={{ marginTop: 3 }}
                variant="contained"
              >
                Continue without signing in
              </Button>
            </Box>
          </form>
        </ThemeProvider>
      </div>
    </>
  );
};
