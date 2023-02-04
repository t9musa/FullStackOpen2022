const Header = (props) => {
  return (
    <div>
        <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part contentPart={props.content[0]} excercisePart={props.excercises[0]} />
      <Part contentPart={props.content[1]} excercisePart={props.excercises[1]} />
      <Part contentPart={props.content[2]} excercisePart={props.excercises[2]} />
    </div>
  )
}
const Part = (props) => {
  return (
    <div>
       <p>{props.contentPart} {props.excercisePart}</p>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
        <p>Number of exercises {props.excercises[0]+ props.excercises[1]+ props.excercises[2]}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const partArray = [part1, part2, part3]
  const excerciseArray= [exercises1, exercises2, exercises3]

  return (
    <div>
        <Header course={course}/>
        <Content content={partArray} excercises={excerciseArray}/>
        <Total excercises={excerciseArray}/>
    </div>
  )
}

export default App