import { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Section = ({text}) => <h1>{text}</h1>;

const Anecdote = (props) => {
  return (
    <div>
      <div> {props.anecdote} </div>
      <div> has {props.count} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [voteCount, setVoteCount] = useState(new Array(anecdotes.length).fill(0));

  const maxVotesIndex = voteCount.indexOf(Math.max(...voteCount));

  const randomSelect = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomInt);
  }

  const vote = (selected) => {
    return () => {
      const newCount = [...voteCount];
      newCount[selected] += 1;
      setVoteCount(newCount);
    }
  }

  return (
    <div>
      <Section text={"Anecdote of the day"} />
      <Anecdote
        anecdote={anecdotes[selected]}
        count={voteCount[selected]}
      />
      <Button
        text={"vote"}
        onClick={vote(selected)}
      />
      <Button
        text={"next anecdote"}
        onClick={randomSelect}
      />

      <Section text={"Anecdote with most votes"} />
      <Anecdote
        anecdote={anecdotes[maxVotesIndex]}
        count={voteCount[maxVotesIndex]}
      />
    </div>
  )
}

export default App