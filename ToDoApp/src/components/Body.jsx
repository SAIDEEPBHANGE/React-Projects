import AddTask from "./AddTask";
import TaskCount from "./TaskCount";
import TaskList from "./TaskList";
function Body({
  taskCount,
  AddTaskinList,
  ClearInputTask,
  setInputTask,
  inputTask,
}) {
  return (
    <div className="card-body p-4">
      {/* Add Task */}
      <AddTask
        AddTaskinList={AddTaskinList}
        ClearInputTask={ClearInputTask}
        setInputTask={setInputTask}
        inputTask={inputTask}
      />
      {/* Task Count */}
      <TaskCount taskCount={taskCount} />
      {/* Task List */}
      <TaskList />
    </div>
  );
}
export default Body;
