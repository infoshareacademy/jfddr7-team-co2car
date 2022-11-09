import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Context } from "../../ContextProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
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
      <div className={styles.container}>
        <p className={styles.header}>
          Proszę zaloguj się żeby korzystać z aplikacji
        </p>
        <form className={styles.form}>
          <div className={styles.inputs}>
            <input
              type="text"
              name="login"
              placeholder="Wpisz email"
              onChange={(event) => setLogin(event.target.value)}
            />
            <input
              type="password"
              name="Password"
              placeholder="Wpisz hasło"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="button" onClick={onLogin}>
            Zaloguj
          </button>
          <p>
            <Link to="/register">Przejdź do rejestracji</Link>
          </p>
          {/* <button
            type=“button”
            onClick={() => {
              navigate(“/registration”);
            }}
          >
            Przejdź do rejestracji
          </button> */}
        </form>
      </div>
    </>
  );
};