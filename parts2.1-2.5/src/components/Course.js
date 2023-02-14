const Course = ({courses}) => {
    return (
      <div>
       {courses.map(x => 
       <div key={x.id}>
        <h1>{x.name}</h1>
         <p>{x.parts.map(x => <li key={x.id}>{x.name} {x.exercises}</li>)}</p>
        <h3>Total: {x.parts.reduce((sum, x) => sum + x.exercises, 0)}</h3>
       </div>
       )} 
      </div>
    )
  }
  
  export default Course