import { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
};

const Section = ({title}) => <h1>{title}</h1>;

const Result = ({text, result}) => <div>{text} {result}</div>

function averageScore({good, neutral, bad}) {
  const sum = good + neutral + bad;
  return (good - bad)/sum;
}

function percentagePositive({good, neutral, bad}) {
  const sum = good + neutral + bad;
  return `${100 * good/sum} %`;
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Section title={"give feedback"} />
      <Button
        onClick={() => setGood(good + 1)}
        text={"good"}
      />
      <Button
        onClick={() => setNeutral(neutral + 1)}
        text={"neutral"}
      />
      <Button
        onClick={() => setBad(bad + 1)}
        text={"bad"}
      />

      <Section title={"statistics"} />
      <Result text={"good"} result={good} />
      <Result text={"neutral"} result={neutral} />
      <Result text={"bad"} result={bad} />
      <Result text={"all"} result={good + neutral + bad} />
      <Result text={"average"} result={averageScore({good, neutral, bad})} />
      <Result text={"positive"} result={percentagePositive({good, neutral, bad})} />
    </div>
  )
}

export default App;