import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../AddPatientModal/FormField";
/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type HealthCheckEntryFormValues = Omit<
  HealthCheckEntry,
  "id" | "entries"
>;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

export const AddHealthCheckEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();
  console.log(`diagnoses:`, diagnoses);
  return (
    <Formik
      initialValues={{
        date: "",
        type: "HealthCheck",
        specialist: "",
        description: "",
        healthCheckRating: 3,
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
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
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
              label="healthCheckRating"
              placeholder="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
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

export default AddHealthCheckEntryForm;
