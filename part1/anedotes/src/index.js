import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [voteCount, setVoteCount] = useState(anecdotes.map(() => 0));
  const [maxIndex, setMaxIndex] = useState(0);

  const generateRandom = () => {
    setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)));
  };

  const updateMaxIndex = (newVoteCount) => {
    setMaxIndex(newVoteCount.indexOf(Math.max(...newVoteCount)));
  };

  const increaseVote = () => {
    let newVoteCount = [...voteCount];
    newVoteCount[selected] += 1;
    setVoteCount(newVoteCount);
    updateMaxIndex(newVoteCount);
  };

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        {props.anecdotes[selected]}
        <p>has {voteCount[selected]} votes</p>
        <button onClick={generateRandom}>Next Anecdote</button>
        <button onClick={increaseVote}>Vote This Quote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{props.anecdotes[maxIndex]}</p>
        <p>has {voteCount[maxIndex]} votes</p>
      </div>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
