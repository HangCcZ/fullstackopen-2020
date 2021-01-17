import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export const SET_PATIENT_LIST = "SET_PATIENT_LIST";
export const ADD_PATIENT = "ADD_PATIENT";
export const ADD_PATIENT_DETAIL = "ADD_PATIENT_DETAIL";
export const SET_DIAGNOSES_LIST = "SET_DIAGNOSES_LIST";
export const ADD_PATIENT_ENTRY = "ADD_PATIENT_ENTRY";
export type Action =
  | {
      type: "ADD_PATIENT_DETAIL";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT_ENTRY";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_PATIENT_DETAIL":
      return {
        ...state,
        patientsDetail: {
          ...state.patientsDetail,
          [action.payload.id]: action.payload,
        },
      };

    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
        patientsDetail: {
          ...state.patientsDetail,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
