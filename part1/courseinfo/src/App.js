const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Content = (props) => {
  return (
    <div>
      <p> {props.data[0].name} {props.data[0].exercises}</p>
      <p> {props.data[1].name} {props.data[1].exercises}</p>
      <p> {props.data[2].name} {props.data[2].exercises}</p>
    </div>
  );
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.sum}</p>
  );
}

const App = () => {
  const course = "Half stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14
  const courseList = [
    { name: part1, exercises: exercises1 },
    { name: part2, exercises: exercises2 },
    { name: part3, exercises: exercises3 },
  ]

  return (
    <div>
      <Header course={ course } />
      <Content data={ courseList } />
      <Total sum={ exercises1 + exercises2 + exercises3 } />
    </div>
  );
}

export default App;
