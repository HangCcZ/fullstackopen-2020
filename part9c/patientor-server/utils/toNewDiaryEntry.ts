/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {newPatientEntry,Gender} from '../types/types';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text:any):text is string=>{
    return typeof text==='string' || text instanceof String;
};

const isGender = (param:any): param is Gender=>{
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseName = (name:any):string=>{
    if(!name || !isString(name)){
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDateOfBirth = (dateOfBirth:any):string=>{
    if(!dateOfBirth || !isString(dateOfBirth)){
         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing dateOfBirth: ${dateOfBirth}`);
    }
    return dateOfBirth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender:any):string=>{
    if(!gender || !isString(gender) ||!isGender(gender)){
         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
         throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseOccupation = (occupation:any):string=>{
    if(!occupation || !isString(occupation)){
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
   }
   return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSSN = (ssn:any):string=>{
    if(!ssn || !isString(ssn)){
         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
         throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewDiaryEntry = (object:any):newPatientEntry=>{

    return {
        name:parseName(object.name),
        gender:parseGender(object.gender),
        occupation:parseOccupation(object.occupation),
        ssn:parseSSN(object.ssn),
        dateOfBirth:parseDateOfBirth(object.dateOfBirth)

    };

};


export {toNewDiaryEntry};