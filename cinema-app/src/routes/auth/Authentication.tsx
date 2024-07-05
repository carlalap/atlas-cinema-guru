import { FormEvent, useState } from "react";
import Button from '../../components/general/Button';
import styles from './auth.module.css'
import Login from './Login';
import Register from "./Register";
import { login, register } from "../../services/Auth.service";

interface AuthenticationProps {
  setIsLoggedIn: (value: boolean) => void;
  setUserUsername: (value: string) => void;
}

export default function Authentication({
  setIsLoggedIn,
  setUserUsername
}: AuthenticationProps) {
  const [_switch, set_switch] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      username,
      password
    };

    const response = _switch ? login(data) : register(data);

    response
      .then((data) => {
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
        setUserUsername(username);
        setIsLoggedIn(true);
      })
  }

  function handleSwitch(state: boolean) {
    if (_switch !== state) {
      setUsername("")
      setPassword("")
    }
    set_switch(state)
  }

  return (
    <div className={styles.container2}>
      <Button
        className={`${styles.switch_button} ${_switch ? styles.selected : ""}`}
        onClick={() => handleSwitch(true)}
        text="Sign In"
      />
      <Button
        className={`${styles.switch_button} ${!_switch ? styles.selected : ""}`}
        onClick={() => handleSwitch(false)}
        text="Sign Up"
      />
      <form onSubmit={handleSubmit}>
        {
          _switch
            ? <Login
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
            />
            : <Register
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
            />
        }
      </form>
    </div>
  );
}