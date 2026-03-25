import { PieChart, Pie, Cell } from "recharts";
import type { Task } from "../types/task";

const TaskChart = ({ tasks }: { tasks: Task[] }) => {
  const data = [
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
    },
    {
      name: "Pending",
      value: tasks.filter((t) => t.status === "pending").length,
    },
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100}>
        <Cell fill="#00C49F" />
        <Cell fill="#FF8042" />
      </Pie>
    </PieChart>
  );
};

export default TaskChart;