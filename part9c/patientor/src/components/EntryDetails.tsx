import { Entry } from "../types";
import React from "react";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;

    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;

    case "Hospital":
      return <HospitalEntry entry={entry} />;

    default:
      return <></>;
  }
};

export default EntryDetails;
