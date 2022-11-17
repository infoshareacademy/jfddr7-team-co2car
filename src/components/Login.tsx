import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Context } from "../ContextProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  TextField,
  Typography,
  Button,
  Link as MUILink,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";
import { StyledLogin } from "./styles/Login.styles";
import { Wrapper } from "./styles/Wrapper.styles";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { LandingPage } from "./LandingPage";

const INVALID_EMAIL_ERROR = "auth/invalid-email";
const WRONG_PASSWORD_ERROR = "auth/wrong-password";
const USER_NOT_FOUND_ERROR = "auth/user-not-found";

interface ErrorProps {
  email: {
    error: boolean;
  };
  password: {
    error: boolean;
  };
}

const noErrors: ErrorProps = {
  email: {
    error: false,
  },
  password: {
    error: false,
  },
};

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useContext(Context);
  const [error, setError] = useState("");

  const [errorProps, setErrorProps] = useState<ErrorProps>(noErrors);
  // const [passwordErrorProps, setPasswordErrorProps] = useState<ErrorProps>(noErrors);

  const onLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (!login) {
      setError("All fields are required");
      setErrorProps({
        email: { error: true },
        password: { error: false },
      });
      return;
    }
    if (!password) {
      setError("All fields are required");
      setErrorProps({
        email: { error: false },
        password: { error: true },
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, login, password);
      setUsername(login);
      navigate("/home");
    } catch ({ code, message }) {
      handleFirebaseError(code);
    }

    // przesunąć to gdzieś indziej, gdzie będzie działać ;)
    setTimeout(() => {
      setError("");
      setErrorProps(noErrors);
    }, 5000);
  };

  const handleFirebaseError = (code: unknown) => {
    switch (code) {
      case INVALID_EMAIL_ERROR:
        setError("Incorrect email format");
        setErrorProps({
          email: { error: true },
          password: { error: false },
        });
        break;
      case WRONG_PASSWORD_ERROR:
        setError("Incorrect email or password");
        setErrorProps({
          email: { error: true },
          password: { error: true },
        });
        break;
      case USER_NOT_FOUND_ERROR:
        setError("Incorrect email or password");
        setErrorProps({
          email: { error: true },
          password: { error: true },
        });
        break;
      default:
        break;
    }
    setTimeout(() => {
      setError("");
      setErrorProps(noErrors);
    }, 5000);
  };

  return (
    <Wrapper>
      <Navigation />
      <StyledLogin className="mainContent">
        <LandingPage />
        <form>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            margin={0}
            padding={3}
          >
            <Typography
              color="primary.main"
              variant="h5"
              textAlign="center"
              marginTop={5}
            >
              CO₂Car
            </Typography>
            <Typography color="primary.main" paddingBottom={2}>
              Sign in and check your car's emissions!
            </Typography>
            <TextField
              {...errorProps.email}
              onChange={(event) => setLogin(event.target.value)}
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder="enter your email"
              label="E-mail"
            />
            <TextField
              {...errorProps.password}
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
            <Button onClick={onLogin} sx={{ marginTop: 3 }} variant="contained">
              Sign in
            </Button>
            <p>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
              >
                Don't have an account yet?
                <br />
                Go to registration instead.
              </Button>
            </p>
            <Button
              onClick={() => {
                navigate("/home");
              }}
              sx={{ marginTop: 3, marginBottom: 7 }}
              variant="contained"
            >
              Continue without signing&nbsp;in
            </Button>
          </Box>
        </form>
      </StyledLogin>
      <Footer />
    </Wrapper>
  );
};
