export type Diagnose = {
    code:string,
    name:string,
    latin?:string
};

export interface Entry{
    story:string;
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
  }

export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type OmitPatientSSN = Omit<Patient,'ssn'>;

export type newPatientEntry = Omit<Patient,'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;