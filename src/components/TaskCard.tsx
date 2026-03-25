import type { Task } from "../types/task";

interface Props {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskCard: React.FC<Props> = ({ task, onToggle }) => {
  return (
    <div style={styles.card}>
      <h3>{task.title}</h3>
      <p>User: {task.user}</p>
      <p>Status: {task.status}</p>

      <button style={styles.button} onClick={() => onToggle(task.id)}>
        Toggle Status
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  button: {
    marginTop: "10px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default TaskCard;