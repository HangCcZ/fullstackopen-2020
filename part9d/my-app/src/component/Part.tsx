import React from 'react'
import {CoursePart} from '../types'
const Part:React.FC<{coursePart:CoursePart}>=({coursePart})=>{
    console.log(coursePart)
    switch(coursePart.name){
        case "Fundamentals":
            return (
                <div>{coursePart.name} {coursePart.description} {coursePart.exerciseCount}</div>
            );
            
        case "Using props to pass data":
            return (<div>{coursePart.name} {coursePart.groupProjectCount} {coursePart.exerciseCount}</div>);
            
        case "Deeper type usage":
            return (<div>{coursePart.name} {coursePart.exerciseSubmissionLink} {coursePart.description} {coursePart.exerciseCount}</div>)
        case "2021 Full Stack Course":
            return (<div>{coursePart.name} {coursePart.description} {coursePart.exerciseCount} {coursePart.credits}</div>)
        default:
            return null
    }
};

export default Part