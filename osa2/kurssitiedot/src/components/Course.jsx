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
      <h1> {props.course} </h1>
    </div>
  )
  }

  const Content = (props) => {
    return(
      <div>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
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
    return(
      <div>
        <b>
          total of  {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} exercises
        </b>
      </div>
    )
  }

  export default Course