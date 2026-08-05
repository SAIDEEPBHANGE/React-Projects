import Task from "./Task";

function TaskList() {
  return (
    <div className="list-group">
      {Array.from({ length: 5 }).map((_, i) => (
        <Task key={i} />
      ))}
    </div>
  );
}

export default TaskList;
