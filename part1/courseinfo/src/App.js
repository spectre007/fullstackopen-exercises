const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Part = (props) => {
  return (
    <p> {props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.data[0].name} exercises={props.data[0].exercises} />
      <Part name={props.data[1].name} exercises={props.data[1].exercises} />
      <Part name={props.data[2].name} exercises={props.data[2].exercises} />
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
