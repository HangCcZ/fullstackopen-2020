import React from 'react'
import Part from './Part'
import {CoursePart} from '../types'


const Content:React.FC<{courseParts:CoursePart[]}>=({courseParts})=>{
    return (<>
      {courseParts.map(coursePart=>{ 
      return <Part key={coursePart.name} coursePart={coursePart}/>})}
    </>);
}

export default Content;