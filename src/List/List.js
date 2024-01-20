import React from "react";
import "./list.scss";
import AddIcon from "@mui/icons-material/Add";

// getting current Date, Time and Month from Date Object
const today = new Date();
const date = today.getDate();
const daysOptions = { weekday: "long" };
const dayName = today.toLocaleDateString("en-US", daysOptions);
const monthOptions = { month: "long" };
const monthName = today.toLocaleDateString("en-US", monthOptions);
const time = today.toLocaleTimeString();
const hour = today.getHours();
const minute = today.getMinutes();
const period = hour >= 12 ? "PM" : "AM";
const formattedHour = hour % 12 || 12; // converting hour into 12-hour format.
const currentTime = `${formattedHour}:${minute} ${period}`;

console.log(time);

const List = () => (
  <div className="main-container">
    <div className="list-container">
      <div className="header">
        <div className="flex-container">
          <div className="left">
            <span>
              {dayName}, {date}
            </span>
          </div>
          <div className="right">12 Tasks</div>
        </div>
        <div className="month">{monthName}</div>
      </div>
      <div className="addIcon">
        <AddIcon
          style={{
            fontSize: "45px",
            color: "white",
            borderRadius: "50%",
            backgroundColor: "#e45d5d",
          }}
        />
      </div>
      <div className="item-list">
        <ul>
          <li>
            <div className="flex-container">
              <div className="left">
                <div className="container">
                  <input type="checkbox" id="task" name="task" value="bike" />
                  <span>Make To-Do list</span>
                </div>
              </div>
              <div className="right">{currentTime}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default List;
