import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import type { Task } from "../types/task";
import { api } from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");

  // Fetch data
  useEffect(() => {
    api.get("/todos?_limit=10").then((res) => {
      const formatted: Task[] = res.data.map((t: any) => ({
        id: t.id,
        title: t.title,
        status: t.completed ? "completed" : "pending",
        user: "User " + t.userId,
      }));
      setTasks(formatted);
    });
  }, []);

  // Toggle status
  const toggleStatus = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task,
      ),
    );
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const addTask = () => {
    if (!newTask) return;

    const task: Task = {
      id: Date.now(),
      title: newTask,
      status: "pending",
      user: "You",
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask("");
  };

  return (
    <>
      <input
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <div style={{ padding: "20px" }}>
        <h1>Task Dashboard</h1>

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={toggleStatus} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
