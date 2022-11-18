import { createContext, FC, ReactElement, useState } from "react";

interface ContextState {
  username: string;
  setUsername: (username: string) => void;
  trip: {};
  setTrip: (trip: {}) => void;
  emission: number;
  setEmission: (emission: number) => void;
  totalEmission: number | string;
  setTotalEmission: (emission: number | string) => void;
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
  const [totalEmission, setTotalEmission] = useState<number | string>(0);

  return (
    <Context.Provider
      value={{
        username,
        setUsername,
        trip,
        setTrip,
        emission,
        setEmission,
        totalEmission,
        setTotalEmission,
      }}
    >
      {children}
    </Context.Provider>
  );
};
