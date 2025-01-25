const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.course.name}
      </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
    <p>
    {props.content.name} {props.content.exercises}
    </p>
    </div>
  )
}


const Content = (props) => {
  return (
    <div>
      <Part content={props.parts[0]}/>
      <Part content={props.parts[1]}/>
      <Part content={props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Tehtäviä yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts = {course.parts}  />
    </div>
  )
}

export default App
