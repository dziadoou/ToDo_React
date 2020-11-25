import "./Task.css";

const Task = (props) => {
  return (
    <div className="container">
      <span>
        {props.name}
        {props.name.length >= 25 ? <br /> : null}
        {"  /  "}
      </span>
      <span>
        {props.deadline}
        {"  /  "}
      </span>
      <span>
        {props.time}
        {"  /  "}
      </span>
      <span>
        {props.prio}
        {"    "}
        <span>
          <input
            type="checkbox"
            value={props.checked}
            onChange={() => props.handleBoxChange(props.id)}
            checked={props.selectedBool}
          />
        </span>
      </span>
      <br />
    </div>
  );
};

export default Task;
