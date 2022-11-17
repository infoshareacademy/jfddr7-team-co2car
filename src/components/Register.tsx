import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Context } from "../ContextProvider";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import {
  Box,
  TextField,
  Typography,
  Button,
  Link as MUILink,
} from "@mui/material";
import { Wrapper } from "./styles/Wrapper.styles";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { StyledLogin } from "./styles/Login.styles";
import { LandingPage } from "./LandingPage";

const USER_ALREADY_EXISTS_ERROR = "auth/email-already-in-use";
const WEAK_PASSWORD_ERROR = "auth/weak-password";
const INVALID_EMAIL_ERROR = "auth/invalid-email";

interface ErrorProps {
  error: boolean;
}

const noErrors: ErrorProps = {
  error: false,
};

export const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const navigate = useNavigate();
  const { setUsername } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(noErrors);
  const [passwordError, setPasswordError] = useState(noErrors);

  const clearErrors = () => {
    setTimeout(() => {
      setErrorMessage("");
      setEmailError(noErrors);
      setPasswordError(noErrors);
    }, 5000);
  }

  const onRegister = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (!registerPassword || !repeatedPassword || !registerEmail) {
      setErrorMessage("All fields are required");
      setEmailError({error: true});
      setPasswordError({error: true});
      clearErrors();
      return;
    }
    if (registerPassword !== repeatedPassword) {
      setErrorMessage("The passwords are different");
      setPasswordError({error: true});
      clearErrors();
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setUsername(registerEmail);
      navigate("/signin");
    } catch ({ code, message }) {
      handleFirebaseError(code);
    }
  };

  const handleFirebaseError = (code: unknown) => {
    switch (code) {
      case WEAK_PASSWORD_ERROR:
        setErrorMessage("Password needs at least 6 characters");
        setPasswordError({error: true});
        break;
      case INVALID_EMAIL_ERROR:
        setErrorMessage("Incorrect email address");
        setEmailError({error: true});
        break;
      case USER_ALREADY_EXISTS_ERROR:
        setErrorMessage("Account for this email already exists");
        setEmailError({error: true});
        break;
      default:
        break;
    }
    clearErrors();
  };

  return (
    <Wrapper>
      <Navigation variant={"login"}/>
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
              Sign up and check your car's emissions!
            </Typography>
            <TextField
              {...emailError}
              onChange={(event) => setRegisterEmail(event.target.value)}
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder="enter your email"
              label="E-mail"
              autoComplete="off"
            />
            <TextField
              {...passwordError}
              onChange={(event) => setRegisterPassword(event.target.value)}
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="enter your password"
              label="Password"
              autoComplete="off"
            />
            <TextField
              {...passwordError}
              onChange={(event) => setRepeatedPassword(event.target.value)}
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="repeat the password"
              label="Repeated password"
              autoComplete="off"
            />
            <Button
              onClick={onRegister} sx={{ margin: 2 }} variant="contained">
              Sign up
            </Button>
            <Typography paddingBottom={3} sx={{ height: 20, color: "#D32F2F"}}>
              {errorMessage}
            </Typography>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account?
                <br />
                Go to login instead.
              </Button>
              <Button
              onClick={() => {
                navigate("/home");
              }}
              sx={{ marginTop: 3, marginBottom: 7 }}
              variant="contained"
            >
              Continue <br />without signing&nbsp;in
            </Button>
          </Box>
        </form>
      </StyledLogin>
      <Footer />
    </Wrapper>
  );
};
