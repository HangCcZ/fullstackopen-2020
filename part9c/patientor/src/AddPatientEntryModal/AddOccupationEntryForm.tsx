import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { Entry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type OccupationHealthEntryFormValues = Omit<
  OccupationalHealthcareEntry,
  "id" | "entries"
>;

interface Props {
  onSubmit: (values: OccupationHealthEntryFormValues) => void;
  onCancel: () => void;
}

export const AddOccupationEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();
  console.log(`diagnoses:`, diagnoses);
  return (
    <Formik
      initialValues={{
        date: "",
        type: "OccupationalHealthcare",
        specialist: "",
        description: "",
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        console.log(`all values`, values);
        const requiredError = "Field is required";

        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />

            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />

            <Field
              label="Sick Leave Start Date"
              placeholder="Sick Leave Start Date"
              name="sickLeave.startDate"
              component={TextField}
            />

            <Field
              label="Sick Leave End Date"
              placeholder="Sick Leave End Date"
              name="sickLeave.endDate"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationEntryForm;
