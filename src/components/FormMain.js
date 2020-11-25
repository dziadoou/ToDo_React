import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PrioTooltip from "./PrioTooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class FormMain extends Component {
  minDate = new Date().toISOString().slice(0, 10); //current date
  currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); //current time for html5

  state = {
    task: this.props.default.task,
    deadline: this.props.default.deadline,
    time: this.props.default.time,
    prio: this.props.default.prio,
    checked: this.props.default.checked,
    editInsteadOfAdd: this.props.editInsteadOfAdd,
  };

  //do poprawy? czy konieczne te wszystkie ify?
  handleChange = (e) => {
    const type = e.target.type;
    if (type === "text") {
      this.setState({
        task: e.target.value,
      });
    } else if (type === "date") {
      this.setState({
        deadline: e.target.value,
      });
    } else if (type === "time") {
      this.setState({
        time: e.target.value,
      });
    } else if (type === "select-one") {
      this.setState({
        prio: e.target.value,
      });
    }
  };

  handleAdd = (e) => {
    e.preventDefault();
    const { task, deadline, time, prio, checked } = this.state;

    if (task.length < 2) {
      console.log("Your task's name is too short!");
    } else {
      const added = this.props.add(task, deadline, time, prio, checked);
      if (added) {
        this.setState({
          task: "",
          deadline: this.minDate,
          time: this.currentTime,
          prio: 5,
          checked: false,
        });
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.editInsteadOfAdd !== this.props.editInsteadOfAdd) {
      this.setState({
        task: this.props.default.task,
        deadline: this.props.default.deadline,
        time: this.props.default.time,
        prio: this.props.default.prio,
        checked: false,
        editInsteadOfAdd: this.props.editInsteadOfAdd,
      });
    }
  }

  render() {
    let maxDate = this.minDate.slice(0, 4) * 1 + 1;
    maxDate = maxDate + "-12-31";

    return (
      <Form className="container">
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Task name</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            placeholder="Writing a novel"
            type="text"
            value={this.state.task}
            maxLength="38"
          />
        </Form.Group>

        <Form.Row
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Form.Group style={{ margin: "10px" }} controlId="formGridCity1">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="date"
              value={this.state.deadline}
              max={maxDate}
              min={this.state.deadline}
            />
          </Form.Group>

          <Form.Group style={{ margin: "10px" }} controlId="formGridCity2">
            <Form.Label>Time</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="time"
              value={this.state.time}
            />
          </Form.Group>

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={PrioTooltip}
          >
            <Form.Group
              style={{ margin: "10px 10px 20px 10px" }}
              controlId="formGridState"
            >
              <Form.Label>Priority</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                as="select"
                value={this.state.prio}
                type="number"
              >
                <option>6</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </Form.Control>
            </Form.Group>
          </OverlayTrigger>
        </Form.Row>

        <Button
          onClick={this.handleAdd}
          variant="primary"
          type="submit"
          style={{ width: "50%" }}
        >
          {this.props.editInsteadOfAdd ? "Confirm edit" : "Add"}
        </Button>
      </Form>
    );
  }
}

export default FormMain;
