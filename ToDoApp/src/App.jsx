import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [taskCount, setTaskCount] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [keyId, setKeyId] = useState(0);
  const AddTaskinList = () => {
    const trimmedTask = inputTask.trim();
    if (trimmedTask === "") return alert("Type Something!");
    if (
      tasksList.some(
        (e) => e.taskText.toUpperCase() === trimmedTask.toUpperCase(),
      )
    )
      return alert("Task is Already is Preset!");
    const taskEle = {
      id: keyId,
      taskText: trimmedTask,
      isMarkdone: false,
      isEditing: false,
    };
    setTasksList([...tasksList, taskEle]);
    setInputTask("");
    setKeyId(keyId++);
  };
  const ClearInputTask = () => {
    setInputTask("");
  };
  const SaveTask = (id, taskText) => {
    const trimmedTask = taskText.trim();
    if (trimmedTask === "") return alert("Type Something!");
    if (
      tasksList.some(
        (e) => e.taskText.toUpperCase() === trimmedTask.toUpperCase(),
      )
    )
      return alert("Task is Already is Preset!");
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, taskText: trimmedTask, isEditing: false }
          : task,
      ),
    );
  };
  const CancelTask = (id) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task,
      ),
    );
  };
  const MarkDownTask = (id) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isMarkdone: true } : task,
      ),
    );
  };
  const EditTask = (id) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task,
      ),
    );
  };
  const DeleteTask = (id) => {
    setTasksList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const ClearCompleted = () => {
    setTasksList((prevTasks) =>
      prevTasks.filter((tasks) => tasks.isMarkdone !== true),
    );
  };
  const MarkAllComplete = () => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        !task.isEditing
          ? {
              ...task,
              isMarkdone: true,
            }
          : task,
      ),
    );
  };
  useEffect(() => {
    setTaskCount({
      total: tasksList.length,
      completed: tasksList.filter((task) => task.isMarkdone === true).length,
      pending: tasksList.filter((task) => task.isMarkdone !== true).length,
    });
  }, [tasksList]);
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="card shadow border-0 rounded-4">
          {/* Header */}
          <Header />
          {/* Body */}
          <Body
            taskCount={taskCount}
            AddTaskinList={AddTaskinList}
            ClearInputTask={ClearInputTask}
            setInputTask={setInputTask}
            inputTask={inputTask}
            tasksList={tasksList}
            SaveTask={SaveTask}
            CancelTask={CancelTask}
            MarkDownTask={MarkDownTask}
            EditTask={EditTask}
            DeleteTask={DeleteTask}
          />
          {/* Footer */}
          <Footer
            ClearCompleted={ClearCompleted}
            MarkAllComplete={MarkAllComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
