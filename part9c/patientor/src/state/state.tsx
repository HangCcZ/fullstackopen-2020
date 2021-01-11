import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";

import { Action } from "./reducer";
import { SET_PATIENT_LIST, ADD_PATIENT, ADD_PATIENT_DETAIL } from "./reducer";
export type State = {
  patients: { [id: string]: Patient };
  patientsDetail: { [id: string]: Patient };
};

const initialState: State = {
  patients: {},
  patientsDetail: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (payload: Patient[]) => {
  return {
    type: SET_PATIENT_LIST,
    payload,
  } as Action;
};

export const addPatient = (payload: Patient) => {
  return {
    type: ADD_PATIENT,
    payload,
  } as Action;
};

export const addPatientDetail = (payload: Patient) => {
  return {
    type: ADD_PATIENT_DETAIL,
    payload,
  } as Action;
};
