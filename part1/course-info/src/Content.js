import React from 'react';

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const showParts = (parts) => {
  return parts.map((part) => <Part part={part} key={part.name} />);
};

const Content = (props) => {
  return <>{showParts(props.parts)}</>;
};

export default Content;
