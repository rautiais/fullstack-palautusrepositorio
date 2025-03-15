const Course = ({ course }) => {
  return (
    <div>
      <Header course={course["name"]} />
      <Content parts={course["parts"]} />
      <Total parts={course["parts"]} />
    </div>
  )
}

  const Header = (props) => {
    console.log(props)
    return(
    <div>
      <h2> {props.course} </h2>
    </div>
  )
  }

  const Content = (props) => {
    return(
      <div>
        {props.parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    )
  }

    const Part = (props) => {
      return(
        <div>
          <p>
            {props.part.name} {props.part.exercises}
          </p>
        </div>
      )
    }

  
  const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return(
      <div>
        <b>
          total of {total} exercises
        </b>
      </div>
    )
  }

  export default Course