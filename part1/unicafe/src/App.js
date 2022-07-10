import { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
};

const Section = ({title}) => <h1>{title}</h1>;

const StatisticLine = ({text, value}) => <div>{text} {value}</div>

const Statistics = ({good, neutral, bad}) => {
  if ((good + neutral + bad) === 0) {
    return (
      <div>
        <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"all"} value={good + neutral + bad} />
      <StatisticLine text={"average"} value={averageScore({good, neutral, bad})} />
      <StatisticLine text={"positive"} value={percentagePositive({good, neutral, bad})} />
    </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;