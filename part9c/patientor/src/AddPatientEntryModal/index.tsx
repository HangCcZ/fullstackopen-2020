import React, { useState } from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddHealthCheckEntryForm, {
  HealthCheckEntryFormValues,
} from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm, {
  HospitalEntryFormValues,
} from "./AddHospitalEntryForm";
import AddOccupationEntryForm, {
  OccupationHealthEntryFormValues,
} from "./AddOccupationEntryForm";
import { EntryTypeField } from "../AddPatientModal/FormField";
interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (
    values:
      | HealthCheckEntryFormValues
      | HospitalEntryFormValues
      | OccupationHealthEntryFormValues
  ) => void;
  error?: string;
}

/**@TODO - need rename */
const AddPatientEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => {
  const [entryType, setEntryType] = useState("HealthCheck");
  console.log("entryType is,", entryType);

  const renderForm = () => {
    if (entryType === "HealthCheck") {
      return <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />;
    } else if (entryType === "Hospital") {
      return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
    } else if (entryType === "OccupationalHealthcare") {
      return <AddOccupationEntryForm onSubmit={onSubmit} onCancel={onClose} />;
    } else {
      return null;
    }
  };

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a diagnose entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}

        <EntryTypeField setEntryType={setEntryType} entryType={entryType} />
        {/**@TODO add three conditional rendered forms here*/}
        {renderForm()}
      </Modal.Content>
    </Modal>
  );
};

export default AddPatientEntryModal;
