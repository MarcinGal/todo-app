import React, { Component } from 'react'
import { TextField, RaisedButton, ListItem, List } from 'material-ui'
import Checkbox from 'material-ui/Checkbox'
import DeleteIcon from 'material-ui/svg-icons/action/delete';

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
        if (!data) {
          return null;
        }
        const array = Object.entries(data)
        const tasksList = array.map(([id, values]) => {
          values.id = id
          return values
        })
        this.setState({ tasks: tasksList })
      })
  }

  handleClick = () => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks
      let newTask = ({ taskName: this.state.taskName, completed: false })
      fetch(`${API_URL}/tasks.json`, {
        method: 'POST',
        body: JSON.stringify(newTask)
      })
        .then(response => response.json())
        .then(data => {
          newTask.id = data.name
          tasks.push(newTask)
          this.setState({ tasks, taskName: '' })
        })
    }
  }

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleClick()
    }
  }

  handleDeleteClick = (id) => {
    fetch(`${API_URL}/tasks/${id}.json`, {
      method: 'DELETE'
    })
    .then(() => {
      this.loadData()
    })
  }

  loadData() {
    fetch(`${API_URL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          return null;
        }
        const array = Object.entries(data)
        const tasksList = array.map(([id, values]) => {
          values.id = id
          return values
        })
        this.setState({ tasks: tasksList })
      })
  }


  render() {
    return (
      <div className="App">
        <div>
          <TextField
            hintText="Put your text"
            value={this.state.taskName}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}>
          </TextField>
          <RaisedButton
            label="Add"
            primary={true}
            onClick={this.handleClick}>
          </RaisedButton>
        </div>
        <List>
          {this.state.tasks.map(task => (
            <ListItem
            key={task.id}
            primaryText={task.taskName}
            leftCheckbox={<Checkbox />}
            rightIcon={<DeleteIcon
            onClick={() => this.handleDeleteClick(task.id)}
            />}
            />
          ))}
        </List>
      </div>
    )
  }
}

export default App
