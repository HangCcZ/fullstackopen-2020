/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HealthCheckRating } from "../types/types";

import { newVisitEntry } from "../types/types";
import { isString } from "./toNewDiaryEntry";

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isString(rating) || !isHealthCheckRating(rating)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
};

const parseDischarge = (discharge: any): string => {
  if (!discharge || !isString(discharge)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing discharge: ${discharge}`);
  }
  return discharge;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing employer name: ${employerName}`);
  }
  return employerName;
};

const parseSickLeave = (sickLeave: any): string => {
  if (!sickLeave || !isString(sickLeave)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing sick leave: ${sickLeave}`);
  }
  return sickLeave;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing description:${description}`);
  }
  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing date:${date}`);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing specialist:${specialist}`);
  }
  return specialist;
};

const parseType = (type: any): string => {
  const typeArr = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  if (!type || !isString(type) || !typeArr.includes(type)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing type:${type}`);
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewVisitEntry = (object: any): newVisitEntry => {
  const entryType = parseType(object.type);
  let specificEntries = {};
  switch (entryType) {
    case "HealthCheck":
      specificEntries = {
        ...specificEntries,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      // parse healthCheckRating
      break;
    case "Hospital":
      // parse discharge
      specificEntries = {
        ...specificEntries,
        discharge: parseDischarge(object.discharge),
      };
      break;
    case "OccupationalHealthcare":
      // parse employerName and sickLeave
      specificEntries = {
        ...specificEntries,
        employerName: parseEmployerName(object.employerName),
      };
      if (object.sickLeave) {
        specificEntries = {
          ...specificEntries,
          sickLeave: parseSickLeave(object.sickLeave),
        };
      }
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`No such type exist in entries system,${object.type}`);
  }

  return {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    type: parseType(object.type),
    diagnosisCodes: [],
    ...specificEntries,
  } as newVisitEntry;
};
