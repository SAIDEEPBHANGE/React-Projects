import AddTask from "./AddTask";
import TaskCount from "./TaskCount";
import TaskList from "./TaskList";
function Body() {
  return (
    <div class="card-body p-4">
      {/* Add Task */}
      <AddTask />
      {/* Task Count */}
      <TaskCount />
      {/* Task List */}
      <TaskList />
    </div>
  );
}
export default Body;
