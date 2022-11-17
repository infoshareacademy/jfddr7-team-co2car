// import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Context } from "../ContextProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Typography, Button } from "@mui/material";
import { Link as MUILink } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";
import { StyledLogin } from "./styles/Login.styles";
import { Wrapper } from "./styles/Wrapper.styles";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

const INVALID_EMAIL_ERROR = "auth/invalid-email";
const WRONG_PASSWORD_ERROR = "auth/wrong-password";
const USER_NOT_FOUND_ERROR = "auth/user-not-found";

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useContext(Context);
  const [error, setError] = useState("");

  const onLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (!login || !password) {
      setError("All fields are required");
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
        setError("Incorrect email address");
        break;
      case WRONG_PASSWORD_ERROR:
        setError("Incorrect email or password");
        break;
      case USER_NOT_FOUND_ERROR:
        setError("Incorrect email or password");
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
        <Box
          maxWidth={600}
          padding={5}
          paddingTop={0}
          paddingBottom={0}
          marginTop={0}
          marginBottom={0}
        >
          <Typography
            color="primary.contrastText"
            variant="h4"
            padding={5}
            marginTop={2}
          >
            Reaching 100% CO₂ emission reduction target for both new cars and
            vans by 2035 is possible.
          </Typography>
          <Typography color="primary.contrastText" padding={3} marginTop={2}>
            The Council and the European Parliament reached a provisional
            agreement on stricter CO₂ emission performance standards for new
            cars and vans. Pending a formal adoption, the co-legislators agreed
            to a 55% CO₂ emission reduction target for new cars and 50% for new
            vans by 2030 compared to 2021 levels and to a 100% CO₂ emission
            reduction target for both new cars and vans by 2035.{" "}
            <MUILink
              href="https://www.consilium.europa.eu/en/infographics/fit-for-55-emissions-cars-and-vans/"
              target="blank"
              color="inherit"
            >
              Learn more
            </MUILink>
          </Typography>
          <Typography
            color="primary.contrastText"
            variant="h5"
            padding={3}
            marginTop={2}
            marginBottom={7}
          >
            Use CO₂CAR to check the emission levels for your current or next
            car!
          </Typography>
        </Box>
        <form>
          <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth={400}
            alignItems={"center"}
            justifyContent={"center"}
            margin={"auto"}
            padding={3}
            bgcolor={"#fff"}
            paddingTop={0}
            paddingBottom={0}
            marginTop={0}
            marginBottom={0}
            style={{ minHeight: "calc(100vh - 5em)" }}
          >
            <Typography
              color="primary.main"
              variant="h5"
              padding={3}
              textAlign="center"
              marginTop={2}
            >
              CO₂Car
            </Typography>
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
            <Button onClick={onLogin} sx={{ marginTop: 3 }} variant="contained">
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
              sx={{ marginTop: 3, marginBottom: 7 }}
              variant="contained"
            >
              Continue without signing in
            </Button>
          </Box>
        </form>
      </StyledLogin>
      <Footer />
    </Wrapper>
  );
};
