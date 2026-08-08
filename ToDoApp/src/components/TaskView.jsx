function TaskView({ TaskInfo, MarkDownTask, EditTask, DeleteTask }) {
  console.log("Task rendered:", TaskInfo);
  return (
    <div>
      {/* Task Item */}
      <div
        className={`list-group-item d-flex justify-content-between align-items-center`}
      >
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={TaskInfo.isMarkdone}
            onChange={() => MarkDownTask(TaskInfo.id)}
          />

          <label
            className={`form-check-label ms-2 TaskInfo ${TaskInfo.isMarkdone ? "text-decoration-line-through" : ""}`}
          >
            {TaskInfo.taskText}
          </label>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-warning"
            disabled={TaskInfo.isMarkdone}
            onClick={() => {
              EditTask(TaskInfo.id);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              DeleteTask(TaskInfo.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default TaskView;
