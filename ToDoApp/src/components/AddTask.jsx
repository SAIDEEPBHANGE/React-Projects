function AddTask({ AddTaskinList, ClearInputTask, setInputTask, inputTask }) {
  return (
    <div className="input-group mb-4">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Enter your task"
        value={inputTask}
        onChange={(e) => {
          setInputTask(e.target.value);
        }}
      />
      <button className="btn btn-primary px-4" onClick={AddTaskinList}>
        Add
      </button>
      <button className="btn btn-danger px-4" onClick={ClearInputTask}>
        Clear
      </button>
    </div>
  );
}
export default AddTask;
