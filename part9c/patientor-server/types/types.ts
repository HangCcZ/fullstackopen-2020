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

type OmitPatientSSN = Omit<Patient,'ssn'>;

export {Diagnose,Patient,OmitPatientSSN};