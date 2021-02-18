import { IState, TAction } from "./AppContext";

// reducer
export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case "LOADING": {
      return { ...state, loading: true };
    }
    case "SUCCESS": {
      return { ...state, loading: false, buchungen: action.payload };
    }
    case "ERROR": {
      return { ...state, loading: false, error: action.payload };
    }
    case "ADDING": {
      return { ...state, buchungen: [...state.buchungen, action.payload] };
    }
    case "DELETE": {
      const newBuchungen = state.buchungen.filter(
        (buchung) => buchung._id !== action.payload
      );
      return { ...state, buchungen: newBuchungen };
    }
    case "SET_CURRENT": {
      return { ...state, current: action.payload };
    }
    case "UPDATE": {
      const newBuchungen = state.buchungen.map((buchung) =>
        buchung._id === action.payload._id ? action.payload : buchung
      );
      return { ...state, buchungen: newBuchungen };
    }
    case "CLEAR_CURRENT": {
      return { ...state, current: null };
    }
    default: {
      return state;
    }
  }
};
