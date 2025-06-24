const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>

      <p>{a} plus {b} is {a + b} </p>
    </div>
  )
}

//keep the console open all the time !!!
//i promise to keep the console open all the time during this course
//and for the rest of my life while doing webdevelopment

export default App;