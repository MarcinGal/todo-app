import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'

class App extends Component {
  state = {
    tasks: [
      { taskName: 'Odkurzanie', completed: false },
      { taskName: 'Zmywanie naczyń', completed: false }
    ],
    taskName: ''
  }

  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }

  handleClick = (event) => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks
      const newTask = ({ taskName: this.state.taskName, completed: false })
      tasks.push(newTask)
      this.setState({ tasks, taskName: '' })
      fetch('https://poniedzialek-ee614.firebaseio.com/tasks.json', {
        method: 'POST',
        body: JSON.stringify(newTask)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <TextField
            hintText="Put your text"
            value={this.state.taskName}
            onChange={this.handleChange}>
          </TextField>
          <RaisedButton
            label="Add"
            primary={true}
            onClick={this.handleClick}>
          </RaisedButton>
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
