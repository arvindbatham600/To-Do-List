import React, { useEffect, useState } from "react";
import "./list.scss";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

// getting current Date, Time and Month from Date Object
// this is new comment
const today = new Date();
const date = today.getDate();
const daysOptions = { weekday: "long" };
const dayName = today.toLocaleDateString("en-US", daysOptions);
const monthOptions = { month: "long" };
const monthName = today.toLocaleDateString("en-US", monthOptions);

const List = () => {
  const [Tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  const [isAddTask, setIsAddTask] = useState(false);

  const handleAddButton = () => {
    setIsAddTask(!isAddTask);
    setNewTaskText("");
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          text: newTaskText,
          completed: false,
          time: getCurrentTime(),
        },
      ]);
      setNewTaskText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      handleAddButton();
      handleAddTask();
    }
  };

  const handleCheckBox = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    // Set a timeout to remove the task after 3 seconds

    setTimeout(() => {
      setTasks((prevTask) => prevTask.filter((task) => task.id !== taskId));
    }, 3000);
  };

  useEffect(() => {
    // CleanUp complete task after 3 second
    const timer = setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    }, 3000);

    // clear the timer when the component unmounts or when a new task is added
    return () => clearTimeout(timer);
  }, [Tasks]);

  // getting the time
  function getCurrentTime() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  }

  return (
    <div className="main-container">
      <div className="list-container">
        <div className="header">
          <div className="flex-container">
            <div className="left">
              <span>
                {dayName}, {date}
              </span>
            </div>
            <div className="right">{Tasks.length} Tasks</div>
          </div>
          <div className="month">{monthName}</div>
          <div className="addIcon" onClick={handleAddButton}>
            <AddIcon
              style={{
                fontSize: "45px",
                color: "white",
                borderRadius: "50%",
                backgroundColor: "#e45d5d",
              }}
            />
          </div>
        </div>

        {isAddTask && (
          <div className="add-task-container">
            <div className="addTask">
              <div className="left">
                <span>New task</span>
                <input
                  type="text"
                  id="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyPress={handleKeyPress}
                ></input>
              </div>
              <div
                className="right"
                onClick={() => {
                  handleAddButton();
                  handleAddTask();
                }}
              >
                <SendIcon
                  style={{
                    fontSize: "30px",
                    color: "white",
                    borderRadius: "50%",
                    backgroundColor: "#e45d5d",
                    padding: "5px",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="item-list">
          <ul>
            {Tasks.length >= 1 &&
              Tasks.map((data) => (
                <li key={data.id}>
                  <div className="flex-container">
                    <div className="left">
                      <div
                        className={`container ${
                          data.completed ? "cross-text" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          id={`task-${data.id}`}
                          name="task"
                          value="bike"
                          checked={data.completed || false}
                          onChange={() => handleCheckBox(data.id)}
                        />
                        <label htmlFor={`task-${data.id}`}>
                          <span>{data.text}</span>
                        </label>
                      </div>
                    </div>
                    <div className="right">{data.time}</div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default List;
