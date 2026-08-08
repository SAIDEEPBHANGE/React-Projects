import { useState } from "react";

function TaskInput({ TaskInfo, SaveTask, CancelTask }) {
  const [taskText, setTaskText] = useState(TaskInfo.taskText);
  return (
    <div className="list-group-item d-flex gap-2 align-items-center">
      <input
        type="text"
        className="form-control"
        placeholder="Enter new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={() => SaveTask(TaskInfo.id, taskText)}
      >
        Save
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => CancelTask(TaskInfo.id)}
      >
        Cancel
      </button>
    </div>
  );
}
export default TaskInput;
