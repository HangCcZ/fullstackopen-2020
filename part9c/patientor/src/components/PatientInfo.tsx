import React from "react";
import { Patient, Entry } from "../types";
import axios from "axios";
import { Icon, Item } from "semantic-ui-react";
import { useStateValue, addPatientDetail } from "../state";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import EntryDetails from "./EntryDetails";
import { Button } from "semantic-ui-react";
import AddPatientEntryModal from "../AddPatientEntryModal";
import { HealthCheckEntryFormValues } from "../AddPatientEntryModal/AddHealthCheckEntryForm";
import { HospitalEntryFormValues } from "../AddPatientEntryModal/AddHospitalEntryForm";
import { OccupationHealthEntryFormValues } from "../AddPatientEntryModal/AddOccupationEntryForm";
import { EntryTypeField } from "../AddPatientModal/FormField";

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
  const [error, setError] = React.useState<string | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patientsDetail).find(
    (patient: Patient) => patient.id === id
  );

  /**TODO */
  const submitNewPatient = async (
    values:
      | HealthCheckEntryFormValues
      | HospitalEntryFormValues
      | OccupationHealthEntryFormValues
  ) => {
    try {
      if (patient) {
        console.log(`all values in patientinfo`, values);
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        console.log(updatedPatient);
        /**TODO */
        dispatch({ type: "ADD_PATIENT_ENTRY", payload: updatedPatient });
        closeModal();
      }
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const renderEntries = (entries: Entry[]) => {
    return (
      <Item.Group>
        {entries.map((entry) => {
          return <EntryDetails key={entry.id} entry={entry} />;
        })}
      </Item.Group>
    );
  };

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
          <br />
          <div>
            <h3>entries:</h3>
            <div>{patient.entries ? renderEntries(patient.entries) : null}</div>
          </div>
          <div>
            <AddPatientEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewPatient}
              error={error}
              onClose={closeModal}
            />
            {/**open modal -> select entry type -> render form based on entry type selected*/}
            <Button onClick={() => openModal()}>Add New Entry</Button>
          </div>
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
