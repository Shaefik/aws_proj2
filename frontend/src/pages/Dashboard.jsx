import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"

import API from "../api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
const navigate = useNavigate();
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await API.post("/tasks", { title, completed: false });
    setTitle("");
    fetchTasks();
  };
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};
const toggleComplete = async (id, currentStatus) => {
  await API.put(`/tasks/${id}`, { completed: !currentStatus });
  fetchTasks();
};
const deleteTask = async (id) => {
  await API.delete(`/tasks/${id}`);
  fetchTasks();
};
  return (

 <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Dashboard </h2>
        
        <hr />

        <div className="task-input-section">
          <input
            className="task-input"
            placeholder="Enter new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-item">
                
              <span
                className={task.completed ? "task-completed" : ""}
              >
                {task.title}
              </span>

              <div className="task-buttons">
                <button
                  className="toggle-btn"
                  onClick={() =>
                    toggleComplete(task._id, task.completed)
                  }
                >
                  Toggle
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;