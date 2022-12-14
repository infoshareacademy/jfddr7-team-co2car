import { useState, useContext, useRef } from "react";
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
import { StyledLogin } from "./styles/Login.styles";
import { Wrapper } from "./styles/Wrapper.styles";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { LandingPage } from "./LandingPage";
import { useTranslation } from "react-i18next";
import "../i18n";

const INVALID_EMAIL_ERROR = "auth/invalid-email";
const WRONG_PASSWORD_ERROR = "auth/wrong-password";
const USER_NOT_FOUND_ERROR = "auth/user-not-found";

interface ErrorProps {
  error: boolean;
}

const noErrors: ErrorProps = {
  error: false,
};

export const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUsername } = useContext(Context);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(noErrors);
  const [passwordError, setPasswordError] = useState(noErrors);
  const bottomDivRef = useRef(null);

  const emailLabels = {
    placeholder: `${t("emailPlaceholder")}`,
    label: `${t("emailLabel")}`,
  };
  const passwordLabels = {
    placeholder: `${t("passwordPlaceholder")}`,
    label: `${t("passwordLabel")}`,
  };

  const clearErrors = () => {
    setTimeout(() => {
      setErrorMessage("");
      setEmailError(noErrors);
      setPasswordError(noErrors);
    }, 5000);
  };

  const onLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (!login || !password) {
      setErrorMessage(`${t("errorAllFields")}`);
      setEmailError({ error: true });
      setPasswordError({ error: true });
      clearErrors();
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, login, password);
      setUsername(login);
      navigate("/home");
    } catch ({ code, message }) {
      handleFirebaseError(code);
    }
  };

  const handleFirebaseError = (code: unknown) => {
    switch (code) {
      case INVALID_EMAIL_ERROR:
        setErrorMessage(`${t("errorInvalidEmail")}`);
        setEmailError({ error: true });
        break;
      case WRONG_PASSWORD_ERROR:
        setErrorMessage(`${t("errorIncorrectPassword")}`);
        setPasswordError({ error: true });
        break;
      case USER_NOT_FOUND_ERROR:
        setErrorMessage(`${t("errorNoAccount")}`);
        setEmailError({ error: true });
        break;
      default:
        break;
    }
    clearErrors();
  };

  return (
    <Wrapper>
      <Navigation variant={"login"} bottomDivRef={bottomDivRef} />
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
            <div ref={bottomDivRef}></div>
            <Typography
              color="primary.main"
              variant="h5"
              textAlign="center"
              marginTop={5}
            >
              CO???Car
            </Typography>
            <Typography color="primary.main" paddingBottom={2} textAlign="center">
              {t("signInAnd")}
            </Typography>
            <TextField
              {...emailError}
              {...emailLabels}
              onChange={(event) => setLogin(event.target.value)}
              margin="normal"
              type={"email"}
              variant="outlined"
            />
            <TextField
              {...passwordError}
              {...passwordLabels}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              type={"password"}
              variant="outlined"
            />
            <Button onClick={onLogin} sx={{ margin: 2 }} variant="contained">
              {t("signIn")}
            </Button>
            <Typography paddingBottom={3} sx={{ height: 20, color: "#D32F2F" }}>
              {errorMessage}
            </Typography>
            <Box margin="normal" sx={{ height: "80px" }} />
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              {t("dontHave")}
              <br />
              {t("goToRegister")}
            </Button>
            <Button
              onClick={() => {
                navigate("/home");
              }}
              sx={{ marginTop: 3, marginBottom: 7 }}
              variant="contained"
            >
              {t("continue")}
            </Button>
          </Box>
        </form>
      </StyledLogin>
      <Footer />
    </Wrapper>
  );
};
