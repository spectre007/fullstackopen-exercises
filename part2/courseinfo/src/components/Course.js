import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

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