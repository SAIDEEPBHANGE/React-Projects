function TaskCount({ taskCount }) {
  return (
    <div className="d-flex justify-content-between mb-3">
      <span className="badge bg-primary"> Total: {taskCount.total} </span>
      <span className="badge bg-success">
        Completed: {taskCount.completed}
      </span>
      <span className="badge bg-warning text-dark">
        Pending: {taskCount.pending}
      </span>
    </div>
  );
}
export default TaskCount;
