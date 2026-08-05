function Task() {
  return (
    <div>
      {/* Task Item */}
      <div className="list-group-item d-flex justify-content-between align-items-center">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" />

          <label className="form-check-label ms-2">
            Complete Bootstrap tutorial
          </label>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-warning">Edit</button>
          <button className="btn btn-sm btn-outline-danger">Delete</button>
        </div>
      </div>

      {/* Input Row */}
      <div className="list-group-item d-flex gap-2 align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new task"
        />

        <button className="btn btn-primary">Add</button>
        <button className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
}
export default Task;
