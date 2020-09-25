import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = () => {
  const courses = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
      {
        name: 'Redux',
        exercises: 11,
      },
    ],
  };

  return (
    <div>
      <Header course={courses.name} />
      <Content parts={courses.parts} />
      <Total parts={courses.parts} />
    </div>
  );
};

export default Course;
