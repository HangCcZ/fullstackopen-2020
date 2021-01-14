import diagnosesData from "../data/diagnoses.json";
import { Diagnosis } from "../types/types";

const diagnoses: Array<Diagnosis> = diagnosesData as Array<Diagnosis>;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

const getDiagnosisCode = (code: string): Diagnosis | undefined => {
  const diagnoseResult = diagnoses.find((diagnose) => diagnose.code === code);
  return diagnoseResult;
};

export { getEntries, getDiagnosisCode };
