import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'

class App extends Component {
  state = {
    tasks: [
      { taskName: 'Odkurzanie', completed: false},
      { taskName: 'Zmywanie naczyń', completed: false}
    ],
    taskName: ''
  }

handleChange = (event) => {
  this.setState({ taskName: event.target.value})
}

handleClick = (event) => {
  let tasks =  this.state.tasks
  tasks.push({taskName: this.state.taskName, completed: false})
  this.state( {tasks })
}

  render() {
    return (
      <div className="App">
        <div>
          <TextField hintText="Put your text" onChange={this.handleChange}></TextField>
          <RaisedButton label="Add" primary={true} onClick={this.handleClick}></RaisedButton>
        </div>
        <div>
          {this.state.tasks.map((task, index) => (
          <div>{task.taskName}</div>
          ))}
      </div>
      </div>
    )
  }
}

export default App
