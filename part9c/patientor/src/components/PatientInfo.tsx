import React from "react";
import { Patient } from "../types";

import { Icon } from "semantic-ui-react";

const renderGenderIcon = (gender: string) => {
  if (gender === "male") {
    return <Icon className="mars" />;
  } else if (gender === "female") {
    return <Icon className="venus" />;
  }
  return <Icon className="genderless" />;
};

const PatientInfo: React.FC<Patient> = ({
  name,
  gender,
  occupation,
  ssn,
  id,
}) => {
  return (
    <div>
      <div>
        <h2>
          {name}
          {renderGenderIcon(gender)}
        </h2>
        <div>ssn:{ssn}</div>
        <div>occupation: {occupation}</div>
      </div>
    </div>
  );
};

export default PatientInfo;
