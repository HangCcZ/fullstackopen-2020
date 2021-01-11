import patientsData from "../data/patients";
import { Patient, OmitPatientSSN, newPatientEntry } from "../types/types";

const patients: Array<Patient> = patientsData;
const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsNoneSSN = (): OmitPatientSSN[] => {
  return patients.map(
    ({ name, id, dateOfBirth, gender, occupation, entries }) => ({
      name,
      id,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatientByID = (id: string): Patient | undefined => {
  console.log(patients);
  const patientFound = patients.find((patient) => patient.id === id);
  console.log(patientFound);
  return patientFound ? patientFound : undefined;
};

const addPatient = (entry: newPatientEntry): Patient => {
  const newPatient = { ...entry, id: (Math.random() * 1000).toString() };
  patients.push(newPatient);
  return newPatient;
};

export { getPatients, getPatientsNoneSSN, addPatient, getPatientByID };
