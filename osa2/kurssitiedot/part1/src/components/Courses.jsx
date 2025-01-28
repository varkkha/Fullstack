const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h2>
          {props.course.name}
        </h2>
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
        {props.parts.map(part => (
          <Part key={part.id} content={part} />
        ))}
      </div>
    )
  }

  const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

  const Total = (props) => {
    console.log(props)
    const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
      <div>
        <b>
          total of {totalExercises} excercises
        </b>
      </div>
    )
  }

export default Course