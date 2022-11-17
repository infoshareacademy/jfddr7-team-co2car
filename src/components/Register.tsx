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
  Link as MUILink,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";
import { Wrapper } from "./styles/Wrapper.styles";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { StyledLogin } from "./styles/Login.styles";
import { LandingPage } from "./LandingPage";

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
    if (registerPassword !== repeatedPassword) {
      setError("These passwords are different");
      return;
    }
    if (!registerPassword || !repeatedPassword || !registerEmail) {
      setError("All fields are required");
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
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleFirebaseError = (code: unknown) => {
    switch (code) {
      case WEAK_PASSWORD_ERROR:
        setError("Your password need to contain at least 6 characters");
        break;
      case INVALID_EMAIL_ERROR:
        setError("Incorrect email address");
        break;
      case USER_ALREADY_EXISTS_ERROR:
        setError("An account with this email already exists");
        break;
      default:
        break;
    }
    setTimeout(() => {
      setError("");
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
              padding={3}
              textAlign="center"
              marginTop={2}
            >
              Sign up to use the app
            </Typography>
            <TextField
              onChange={(event) => setRegisterEmail(event.target.value)}
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder="enter your email"
              label="E-mail"
            />
            <TextField
              onChange={(event) => setRegisterPassword(event.target.value)}
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="enter your password"
              label="Password"
            />
            <TextField
              onChange={(event) => setRepeatedPassword(event.target.value)}
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="repeat the password"
              label="Repeated password"
            />
            <Typography sx={{ height: 20, color: "secondary.main" }}>
              {error}
            </Typography>
            <Button
              onClick={onRegister}
              sx={{ marginTop: 3 }}
              variant="contained"
            >
              Sign up
            </Button>
            <p>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account?
                <br />
                Go to login
              </Button>
            </p>
          </Box>
        </form>
      </StyledLogin>
      <Footer />
    </Wrapper>
  );
};
