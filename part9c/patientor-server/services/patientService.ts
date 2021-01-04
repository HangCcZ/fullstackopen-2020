import patientsData from '../data/patients.json';
import {Patient,OmitPatientSSN} from '../types/types';

const patients :Array<Patient> = patientsData as Array<Patient>;

const getPatients = ():Array<Patient>=>{
    return patients;
};

const getPatientsNoneSSN = ():OmitPatientSSN[]=>{
    return patients.map(({name,id,dateOfBirth,gender,occupation})=>({
        name,id,dateOfBirth,gender,occupation
    }));
};


export{getPatients,getPatientsNoneSSN};