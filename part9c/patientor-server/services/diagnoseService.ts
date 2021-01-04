import diagnosesData from '../data/diagnoses.json';
import {Diagnose} from '../types/types';

const diagnoses :Array<Diagnose> = diagnosesData as Array<Diagnose>;

const getEntries = ():Array<Diagnose>=>{
    return diagnoses;
};


export{getEntries};