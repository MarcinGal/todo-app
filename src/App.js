import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'

const API_URL = 'https://poniedzialek-ee614.firebaseio.com'

class App extends Component {
  state = {
    tasks: [],
    taskName: ''
  }

  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }

  componentWillMount() {
    fetch(`${API_URL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        const array = Object.entries(data)
        const tasksList = array.map(task => task[1])
this.setState({tasks: tasksList })
      })
  }

  handleClick = (event) => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks
      const newTask = ({ taskName: this.state.taskName, completed: false })
      tasks.push(newTask)
      this.setState({ tasks, taskName: '' })
      fetch(`${API_URL}/tasks.json`, {
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
