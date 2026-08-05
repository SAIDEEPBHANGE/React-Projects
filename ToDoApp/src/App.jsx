import { useState } from "react";
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
  let keyId = 0;
  const AddTaskinList = () => {
    const taskEle = {
      id: ++keyId,
      taskText: inputTask,
      isMarkdone: false,
      isEditing: false,
    };
    setTasksList([...tasksList, taskEle]);
    setInputTask("");
  };
  const ClearInputTask = () => {
    setInputTask("");
  };
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
          />
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
