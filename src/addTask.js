import React from 'react'

class addTask extends React.Component {
    state = {
        taskName: "Odkurzyć",
        completed: "",
    }
}

render() {
    return (
    <div>
        <p className={this.state.completed}>${this.taskName}</p>
    </div>
    )
}