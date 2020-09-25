import React from 'react';

const Total = ({ parts }) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalArray = parts.map((part) => part.exercises);
  const totalExercises = totalArray.reduce(reducer);
  return (
    <>
      <p>Number of exercises {totalExercises} </p>
    </>
  );
};

export default Total;
