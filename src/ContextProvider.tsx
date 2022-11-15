import { createContext, FC, ReactElement, useState } from "react";

interface ContextState {
  username: string;
  setUsername: (username: string) => void;
  trip: {};
  setTrip: (trip: {}) => void;
  emission: number;
  setEmission: (emission: number) => void;
}
/*songs: string[];
  setSongs: (songs: string[]) => void;*/
interface ContextProviderProps {
  children: ReactElement;
}

const defaultContextValue = {} as ContextState;
export const Context = createContext(defaultContextValue);

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [trip, setTrip] = useState({});
  const [emission, setEmission] = useState(0);

  return (
    <Context.Provider
      value={{ username, setUsername, trip, setTrip, emission, setEmission }}
    >
      {children}
    </Context.Provider>
  );
};
