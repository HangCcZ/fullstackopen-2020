import React from 'react';
import {Patient} from '../types'
import {Link} from 'react-router-dom';
import { Button,Icon} from 'semantic-ui-react';

const renderGenderIcon = (gender: string)=>{
    if(gender==='male'){
        return(
            <Icon mars/>
        );
    }
    else if(gender==='female'){
        return (<Icon venus/>);
    }
    return(<Icon genderless/>);
};

const PatientInfo: React.FC<Patient> = ({name,gender,occupation,dateOfBirth,entries,ssn})=>{
    
    return(
        <div>
            <div> <h1>Patientor</h1>
            <Link to="/"><Button primary>Home</Button></Link></div>
           
            <div>
                {name} {renderGenderIcon(gender)}
                {ssn}
                {occupation}
            </div>
        </div>
    );
};

export default PatientInfo;