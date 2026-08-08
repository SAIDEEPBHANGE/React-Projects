import TaskView from "./TaskView";
import TaskInput from "./TaskInput";
function TaskList({
  tasksList,
  SaveTask,
  CancelTask,
  MarkDownTask,
  EditTask,
  DeleteTask,
}) {
  console.log("TaskList: ", tasksList);
  return (
    <div className="list-group">
      {tasksList.map((element) =>
        !element.isEditing ? (
          <TaskView
            key={element.id}
            TaskInfo={element}
            MarkDownTask={MarkDownTask}
            EditTask={EditTask}
            DeleteTask={DeleteTask}
          />
        ) : (
          <TaskInput
            key={element.id}
            TaskInfo={element}
            SaveTask={SaveTask}
            CancelTask={CancelTask}
          />
        ),
      )}
    </div>
  );
}

export default TaskList;
