import express from 'express';
import cors from 'cors';
import {getEntries} from './services/diagnoseService';
import {getPatientsNoneSSN} from './services/patientService'
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping',(_req,res)=>{
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/api/diagnoses',(_req,res)=>{
    console.log('haha');
    res.send(getEntries());
});

app.get('/api/patients',(_req,res)=>{
    res.send(getPatientsNoneSSN());
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});