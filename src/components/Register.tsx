import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Context } from "../ContextProvider";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
import { useTranslation } from "react-i18next";
import "../i18n";

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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUsername } = useContext(Context);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(noErrors);
  const [passwordError, setPasswordError] = useState(noErrors);

  const emailLabels = {
    placeholder: `${t("emailPlaceholder")}`,
    label: `${t("emailLabel")}`,
  };
  const passwordLabels = {
    placeholder: `${t("passwordPlaceholder")}`,
    label: `${t("passwordLabel")}`,
  };
  const password2Labels = {
    placeholder: `${t("password2Placeholder")}`,
    label: `${t("password2Label")}`,
  };

  const clearErrors = () => {
    setTimeout(() => {
      setErrorMessage("");
      setEmailError(noErrors);
      setPasswordError(noErrors);
    }, 5000);
  };

  const onRegister = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (!registerPassword || !repeatedPassword || !registerEmail) {
      setErrorMessage(`${t("errorAllFields")}`);
      setEmailError({ error: true });
      setPasswordError({ error: true });
      clearErrors();
      return;
    }
    if (registerPassword !== repeatedPassword) {
      setErrorMessage(`${t("errorPasswordsDifferent")}`);
      setPasswordError({ error: true });
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
        setErrorMessage(`${t("errorWeakPassword")}`);
        setPasswordError({ error: true });
        break;
      case INVALID_EMAIL_ERROR:
        setErrorMessage(`${t("errorInvalidEmail")}`);
        setEmailError({ error: true });
        break;
      case USER_ALREADY_EXISTS_ERROR:
        setErrorMessage(`${t("errorAlreadyExists")}`);
        setEmailError({ error: true });
        break;
      default:
        break;
    }
    clearErrors();
  };

  return (
    <Wrapper>
      <Navigation variant={"login"} />
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
            <Typography color="primary.main" paddingBottom={2} textAlign="center">
              {t("signUpAnd")}
            </Typography>
            <TextField
              {...emailError}
              {...emailLabels}
              onChange={(event) => setRegisterEmail(event.target.value)}
              margin="normal"
              type={"email"}
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              {...passwordError}
              {...passwordLabels}
              onChange={(event) => setRegisterPassword(event.target.value)}
              margin="normal"
              type={"password"}
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              {...passwordError}
              {...password2Labels}
              onChange={(event) => setRepeatedPassword(event.target.value)}
              margin="normal"
              type={"password"}
              variant="outlined"
              autoComplete="off"
            />
            <Button onClick={onRegister} sx={{ margin: 2 }} variant="contained">
              {t("signUp")}
            </Button>
            <Typography paddingBottom={3} sx={{ height: 20, color: "#D32F2F" }}>
              {errorMessage}
            </Typography>
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("alreadyHave")}
              <br />
              {t("goToLogin")}
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
