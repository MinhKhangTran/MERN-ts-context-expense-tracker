import * as React from "react";
import { reducer } from "./reducer";
import axios from "axios";
export const API_ENDPOINT =
  "https://expense-tracker-api-mkt.herokuapp.com/api/a1/buchungen";

// Context mit Reducer

// ReducerTypes
export interface IBuchung {
  _id?: string;
  titel: string;
  betrag: number;
  createdAt?: string;
}
export interface IState {
  buchungen?: IBuchung[];
  loading?: boolean;
  error?: string | null;
  current: null | IBuchung;
}
export type TAction =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: IBuchung[] }
  | { type: "ERROR"; payload: string }
  | { type: "ADDING"; payload: IBuchung }
  | { type: "DELETE"; payload: string }
  | { type: "UPDATE"; payload: IBuchung }
  | { type: "SET_CURRENT"; payload: IBuchung }
  | { type: "CLEAR_CURRENT" };

// ContextProps
interface IContextProps {
  state: IState;
  dispatch: React.Dispatch<TAction>;
  getBuchungen: () => void;
  deleteBuchung: (id: string) => void;
  addBuchung: (daten: IEingabe) => void;
  updateBuchung: (id: IBuchung) => void;
  setCurrent: (item: IBuchung) => void;
  clearCurrent: () => void;
}

// Context
const AppContext = React.createContext<IContextProps>({} as IContextProps);

// initState
const initState: IState = { buchungen: [], current: null };

// Eingabe
export interface IEingabe {
  titel: string;
  betrag: number;
}

// Provider
export const AppProvider = ({ children }: React.PropsWithChildren<{}>) => {
  // useReducer
  const [state, dispatch] = React.useReducer(reducer, initState);

  const getBuchungen = async () => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.get(API_ENDPOINT);
      // console.log(data);
      dispatch({ type: "SUCCESS", payload: data.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "Es gab ein Problem :/" });
    }
  };

  const addBuchung = async (daten: IEingabe) => {
    const { data } = await axios.post(API_ENDPOINT, daten);
    dispatch({ type: "ADDING", payload: data.data });
  };

  const deleteBuchung = async (id: string) => {
    try {
      const { data } = await axios.delete(`${API_ENDPOINT}/${id}`);
      dispatch({ type: "DELETE", payload: id });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "Es gab ein Problem :/" });
    }
  };

  const updateBuchung = async (item: IBuchung) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const { data } = await axios.put(
        `${API_ENDPOINT}/${item._id}`,
        item,
        config
      );
      dispatch({ type: "UPDATE", payload: data.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "Es gab ein Problem :/" });
    }
  };

  const setCurrent = (item: IBuchung) => {
    dispatch({ type: "SET_CURRENT", payload: item });
  };

  const clearCurrent = () => {
    dispatch({ type: "CLEAR_CURRENT" });
  };

  React.useEffect(() => {
    getBuchungen();
  }, []);
  return (
    <AppContext.Provider
      value={{
        state,
        getBuchungen,
        dispatch,
        deleteBuchung,
        addBuchung,
        updateBuchung,
        setCurrent,
        clearCurrent
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom Hook Context
export const useBuchungContext = () => {
  return React.useContext(AppContext);
};
