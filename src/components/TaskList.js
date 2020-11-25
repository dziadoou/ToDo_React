import Task from "./Task";

const TaskList = (props) => {
  const addedTasks = props.tasks.map((oneTask) => {
    return (
      <Task
        key={oneTask.id}
        id={oneTask.id}
        name={oneTask.task}
        deadline={oneTask.deadline}
        time={oneTask.time}
        prio={oneTask.prio}
        checked={oneTask.checked}
        handleBoxChange={props.handleBoxChange}
        selectedBool={oneTask.checked}
      />
    );
  });

  if (addedTasks.length > 1) {
    addedTasks.sort((a, b) => {
      const temp1 = a.props;
      const temp2 = b.props;
      let t1 = temp1.prio;
      let t2 = temp2.prio;
      if (t1 === t2) {
        t1 = temp1.deadline;
        t2 = temp2.deadline;
        if (t1 === t2) {
          t1 = temp1.time;
          t2 = temp2.time;
          return t1 < t2 ? -1 : t1 > t2 ? 1 : 0;
        } else {
          return t1 < t2 ? -1 : t1 > t2 ? 1 : 0;
        }
      } else {
        return t2 < t1 ? -1 : t2 > t1 ? 1 : 0;
      }
    });
  }

  return <div>{addedTasks}</div>;
};

export default TaskList;
