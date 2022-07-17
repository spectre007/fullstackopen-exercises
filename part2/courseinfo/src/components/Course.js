import React from "react";

const Header = ({ courseName }) => <h2>{courseName}</h2>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p> {part.name} {part.exercises}</p>
  )
}

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.map(obj => obj.exercises).reduce((a, b) => a + b, 0)} />
    </>
  )
}

export default Course