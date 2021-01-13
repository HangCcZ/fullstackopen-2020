import express from "express";
import cors from "cors";
import { getEntries } from "./services/diagnoseService";
import {
  getPatients,
  addPatient,
  getPatientByID,
  addVisitEntry,
} from "./services/patientService";
import { toNewDiaryEntry } from "./utils/toNewDiaryEntry";
import { toNewVisitEntry } from "./utils/toNewVisitEntry";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnosis", (_req, res) => {
  res.send(getEntries());
});

app.get("/api/patients", (_req, res) => {
  res.send(getPatients());
});

app.post("/api/patients", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = toNewDiaryEntry(req.body);
    const addedEntry = addPatient(newPatientEntry);
    res.send(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

app.get("/api/patients/:id", (req, res) => {
  const patient = getPatientByID(req.params.id);
  if (patient) {
    return res.send(patient);
  } else {
    return res.send("Patient not found");
  }
});

app.post("/api/patients/:id/entries", (req, res) => {
  try {
    const newEntry = toNewVisitEntry(req.body);
    const addedEntry = addVisitEntry(newEntry, req.params.id);
    return res.send(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.status(400).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
