import React from "react";
import "./App.css";
import FormMain from "./FormMain";
import TaskList from "./TaskList";
import ButtonForEverything from "./ButtonForEverything";
import ConfirmedTask from "./ConfirmedTask";
import DisabledBtn from "./DisabledBtn";

class App extends React.Component {
  counterID = 0;

  minDate = new Date().toISOString().slice(0, 10); //current date
  currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); //current time for html5

  state = {
    tasks: [], //array of tasks
    confirmed: [], //array of completed tasks
    editBtn: true, //should Edit button be disabled?
    checkedEditCounter: 0, //counts checked checkboxes to enable Edit and Select all btns
    selectedToEdit: {
      task: "",
      deadline: this.minDate,
      time: this.currentTime,
      prio: 5,
      checked: false,
    }, // ^ default object for FormMain
    editInsteadOfAdd: false, // checks if Add btn should be named Confirm edit after clicking Edit btn
  };

  handleDoneBtn = () => {
    const confirmedTask = this.state.tasks.filter(
      (task) => task.checked === true
    );

    let confirmed = this.state.confirmed.concat(confirmedTask);
    let tasks = this.state.tasks.filter((task) => task.checked === false);
    let checkedTasks = this.state.tasks.filter((task) => task.checked === true);
    let count = this.state.checkedEditCounter;
    count -= checkedTasks.length;

    this.setState({
      confirmed,
      tasks,
      editBtn: false,
      checkedEditCounter: count,
    });
  };

  handleDeleteBtn = () => {
    const remainedTasks = this.state.tasks.filter(
      (task) => task.checked === false
    );
    let count = this.state.checkedEditCounter;
    const deletedTasks = this.state.tasks.filter(
      (task) => task.checked === true
    );
    count -= deletedTasks.length;

    this.setState({
      tasks: remainedTasks,
      checkedEditCounter: count,
    });
  };

  handleEditBtn = () => {
    const selectedTask = this.state.tasks.filter(
      (task) => task.checked === true
    );
    let task = selectedTask[0];
    let index = task.id;

    let checkedEditCounter = this.state.checkedEditCounter;
    checkedEditCounter -= 1;

    const tasks = this.state.tasks.filter((task) => task.id !== index);

    this.setState({
      tasks,
      selectedToEdit: task,
      editInsteadOfAdd: true,
      checkedEditCounter,
    });
  };

  handleAddBtn = (task, deadline, time, prio, checked) => {
    task = task.replace(/\s\s+/g, " "); //replacing more than one whitespace with ' '
    const addedTask = {
      id: this.counterID,
      task,
      deadline,
      time,
      prio,
      checked,
    };
    this.counterID++;

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, addedTask],
      selectedToEdit: {
        task: "",
        deadline: this.minDate,
        time: this.currentTime,
        prio: 5,
        checked: false,
      },
      editInsteadOfAdd: false,
    }));
    return true;
  };

  handleCheckboxChange = (id) => {
    let count = this.state.checkedEditCounter;
    const tasks = this.state.tasks;
    const index = tasks.findIndex((task) => task.id === id);
    tasks[index].checked = !tasks[index].checked;
    if (tasks[index].checked === true) {
      count++;
    } else {
      count--;
    }
    this.setState({
      tasks,
      checkedEditCounter: count,
    });
  };

  handleCheckAllBtn = () => {
    let taskList = this.state.tasks;
    taskList.forEach((task) =>
      task.checked === true ? (task.checked = true) : (task.checked = true)
    );
    const count = taskList.length;

    this.setState({
      tasks: taskList,
      checkedEditCounter: count,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.checkedEditCounter !== this.state.checkedEditCounter) {
      if (this.state.checkedEditCounter === 1) {
        this.setState({
          editBtn: false,
        });
      } else {
        this.setState({
          editBtn: true,
        });
      }
    }
  }

  render() {
    let confirmedTasks = this.state.confirmed.map((task) => (
      <ConfirmedTask key={task.id} name={task.task} />
    ));
    confirmedTasks.reverse();
    if (confirmedTasks.length > 5) {
      confirmedTasks = confirmedTasks.slice(0, 5);
    }

    return (
      <div className="App">
        <FormMain
          add={this.handleAddBtn}
          default={this.state.selectedToEdit}
          editInsteadOfAdd={this.state.editInsteadOfAdd}
        />

        <h1 style={{ borderTop: "2px solid white", marginTop: "20px" }}>
          Your ToDo List :
        </h1>

        <ButtonForEverything click={this.handleDoneBtn} name="Done" />
        <ButtonForEverything click={this.handleDeleteBtn} name="Delete" />
        {this.state.editBtn ? (
          <DisabledBtn
            name="Edit"
            disabled={!this.state.editBtn}
            text="You can edit only one task at the same time!"
          />
        ) : (
          <ButtonForEverything click={this.handleEditBtn} name="Edit" />
        )}

        {this.state.tasks.length > 0 ? (
          <ButtonForEverything
            click={this.handleCheckAllBtn}
            name="Select all"
          />
        ) : (
          <DisabledBtn
            text="You need at least one task to check it"
            name="Select all"
          />
        )}

        <h5 style={{ marginTop: "5px" }}>Task / Deadline / Time / Priority</h5>

        <TaskList
          tasks={this.state.tasks}
          handleBoxChange={this.handleCheckboxChange}
        />

        <h5 style={{ borderTop: "2px solid white", marginTop: "50px" }}>
          Your most recent completed tasks :
        </h5>
        <div style={{ wordWrap: "break-word", maxWidth: "375px" }}>
          {confirmedTasks.length > 0 ? (
            confirmedTasks
          ) : (
            <div>
              <i>You haven't completed any tasks so far!</i>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
