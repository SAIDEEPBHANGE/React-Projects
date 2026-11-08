import { useState } from "react";

function App() {
  document.title = "ToDo App";

  const [taskIdCnt, setTaskIdCnt] = useState(1);
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (!taskInput.trim()) return;

    const taskInfo = {
      taskid: taskIdCnt,
      TaskText: taskInput.trim(),
      isEditing: false,
      isDone: false,
      createdAt: new Date().toISOString(),
      modifiedAt: null,
    };

    setTaskList((prev) => [...prev, taskInfo]);
    setTaskIdCnt((prev) => prev + 1);
    setTaskInput("");
  };

  const deleteTask = (id) => {
    setTaskList((prev) => prev.filter((task) => task.taskid !== id));
  };

  const toggleComplete = (id) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.taskid === id ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  };

  const editTask = (id) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.taskid === id ? { ...task, isEditing: true } : task,
      ),
    );
  };

  const updateTask = (id, updatedText) => {
    if (!updatedText.trim()) return;

    setTaskList((prev) =>
      prev.map((task) =>
        task.taskid === id
          ? {
              ...task,
              TaskText: updatedText.trim(),
              isEditing: false,
              modifiedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  };

  const cancelEdit = (id) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.taskid === id ? { ...task, isEditing: false } : task,
      ),
    );
  };

  const clearTask = () => {
    setTaskInput("");
  };
  return (
    <div className="container py-5 min-vh-100">
      <div className="card shadow-lg mx-auto">
        <div className="card-body p-3 p-md-5">
          <h2 className="fw-bold text-center mb-4">Todo Application</h2>

          {/* Add Todo */}
          <div className="row g-2 mb-4">
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTask();
                }}
              />
            </div>

            <div className="col-12 col-md-4 d-flex gap-1">
              <button className="btn btn-primary w-100" onClick={addTask}>
                Add Todo
              </button>
              <button className="btn btn-danger w-100" onClick={clearTask}>
                Clear Text
              </button>
            </div>
          </div>

          {/* Todo Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Todo</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {taskList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-muted py-4">
                      No tasks available. Add your first task!
                    </td>
                  </tr>
                ) : (
                  taskList.map((task, index) => (
                    <tr key={task.taskid}>
                      <td>{index + 1}</td>

                      <td className="text-start">
                        {task.isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={task.TaskText}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateTask(task.taskid, e.target.value);
                              }
                            }}
                            id={`edit-${task.taskid}`}
                          />
                        ) : (
                          <span
                            className={
                              task.isDone
                                ? "text-decoration-line-through text-muted"
                                : ""
                            }
                          >
                            {task.TaskText}
                          </span>
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            task.isDone ? "bg-success" : "bg-warning text-dark"
                          }`}
                        >
                          {task.isDone ? "Completed" : "Pending"}
                        </span>
                      </td>

                      <td>
                        <small>
                          {new Date(task.createdAt).toLocaleDateString()}
                        </small>
                      </td>

                      <td>
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                          {task.isEditing ? (
                            <>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() =>
                                  updateTask(
                                    task.taskid,
                                    document.getElementById(
                                      `edit-${task.taskid}`,
                                    ).value,
                                  )
                                }
                              >
                                Save
                              </button>

                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => cancelEdit(task.taskid)}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => toggleComplete(task.taskid)}
                              >
                                {task.isDone ? "Undo" : "Complete"}
                              </button>

                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() => editTask(task.taskid)}
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteTask(task.taskid)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Task Summary */}
          <div className="d-flex flex-wrap justify-content-between gap-2 mt-3">
            <span>Total: {taskList.length}</span>
            <span>Completed: {taskList.filter((t) => t.isDone).length}</span>
            <span>Pending: {taskList.filter((t) => !t.isDone).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
