import React from "react";
import { Patient } from "../types";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { useStateValue, addPatientDetail } from "../state";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
const renderGenderIcon = (gender: string) => {
  if (gender === "male") {
    return <Icon className="mars" />;
  } else if (gender === "female") {
    return <Icon className="venus" />;
  }
  return <Icon className="genderless" />;
};

const PatientInfo: React.FC = () => {
  const [{ patientsDetail }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = Object.values(patientsDetail).find(
    (patient: Patient) => patient.id === id
  );

  React.useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatientDetail(patient));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient) {
      fetchPatientDetail();
    }
  }, [dispatch, id, patient]);

  if (patient) {
    return (
      <div>
        <div>
          <h2>
            {patient.name}
            {renderGenderIcon(patient.gender)}
          </h2>
          <div>ssn:{patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>User does not exist</h2>
    </div>
  );
};

export default PatientInfo;
