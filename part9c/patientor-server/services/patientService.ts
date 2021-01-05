import patientsData from '../data/patients.json';
import {Patient,OmitPatientSSN,newPatientEntry} from '../types/types';

const patients :Array<Patient> = patientsData as Array<Patient>;

const getPatients = ():Array<Patient>=>{
    return patients;
};

const getPatientsNoneSSN = ():OmitPatientSSN[]=>{
    return patients.map(({name,id,dateOfBirth,gender,occupation})=>({
        name,id,dateOfBirth,gender,occupation
    }));
};

const addPatient = (entry:newPatientEntry):Patient=>{
    
    const newPatient = {...entry,id:(Math.random()*1000).toString()};
    patients.push(newPatient);
    return newPatient;
};


export{getPatients,getPatientsNoneSSN,addPatient};