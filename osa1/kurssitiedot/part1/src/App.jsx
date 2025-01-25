const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.course}
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
        Tehtäviä yhteensä {props.total}
      </p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'

  const parts = [

    {
      name: 'Fundamentals of React',
      exercises: 10,
    },

    {
      name: 'Using props to pass data',
      exercises: 7,
    },

    {
      name: 'State of a component',
      exercises: 14,
    }

  ]

  const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total total = {totalExercises}  />
    </div>
  )
}

export default App
