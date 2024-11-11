import { useState } from "react";
import TaskList from "../component/task/TaskList";
import { TimerContent } from "../component/timer";
import { getData, postData, putData } from "../services/api";

const TimerPage = () => {
  const [task, setTask] = useState<any>(null);

  const calculateRemainingTime = async (id: any) => {
    const data = await getData<any>(`/tasks/calculate/${id}`);
    if (data) {
      console.log("data", data);
      setTask(data);
    }
  };

  const sessionStartHandler = async (task: any) => {
    await calculateRemainingTime(task.id);
  };

  return (
    <div className="flex-1 p-4 md:p-8">
      <TimerContent task={task} setTask={setTask} />

      <TaskList task={task} startSession={sessionStartHandler} />
    </div>
  );
};

export default TimerPage;
