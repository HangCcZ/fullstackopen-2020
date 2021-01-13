import patientsData from "../data/patients";
import {
  Patient,
  OmitPatientSSN,
  newPatientEntry,
  newVisitEntry,
  Entry,
} from "../types/types";

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
  const patientFound = patients.find((patient) => patient.id === id);
  return patientFound ? patientFound : undefined;
};

const addPatient = (entry: newPatientEntry): Patient => {
  const newPatient = { ...entry, id: (Math.random() * 1000).toString() };
  patients.push(newPatient);
  return newPatient;
};

const addVisitEntry = (entry: newVisitEntry, id: string): Entry | undefined => {
  const newEntry = {
    ...entry,
    id: (Math.random() * 1000).toString(),
  } as Entry;
  const patientFound = patients.find((patient) => patient.id === id);
  if (patientFound) {
    patientFound.entries.push(newEntry);
  }
  return undefined;
};

export {
  getPatients,
  getPatientsNoneSSN,
  addPatient,
  getPatientByID,
  addVisitEntry,
};
