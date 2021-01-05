type Diagnose = {
    code:string,
    name:string,
    latin?:string
};

type Patient = {
    name:string,
    id:string,
    dateOfBirth:string,
    gender:string,
    occupation:string,
    ssn:string
};

enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

type OmitPatientSSN = Omit<Patient,'ssn'>;

type newPatientEntry = Omit<Patient,'id'>;

export {Diagnose,Patient,OmitPatientSSN,newPatientEntry,Gender};