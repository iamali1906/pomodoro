import React, { useEffect, useState } from "react";
import { Button } from "../UI/Button";
import { Card, CardContent } from "../UI/Card";
import { CircularProgress } from "../../assets/timer/CircularProgress";
import { putData } from "../../services/api";

interface Props {
  task: any;
  setTask: any;
}

function formatTime(seconds: number) {
  if (seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export const TimerContent: React.FC<Props> = ({ task, setTask }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  console.log("here===>", task);

  useEffect(() => {
    // Clear existing interval and reset time when task changes
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    if (task) {
      if (task.active) {
        startInterval();
      }
      if (task.remainingTime > 0) {
        setTime(task.remainingTime);
      } else if (task.workDuration > 0) {
        setTime(task.workDuration * 60);
      }
      setIsRunning(task.active);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [task]);

  const startInterval = () => {
    if (!isRunning) {
      const id: any = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const timerHandler = () => {
    if (isRunning) {
      stopTask(task.id);
    } else {
      startTask(task.id);
    }
  };

  const startTask = async (id: any) => {
    console.log("startTask", id);
    const data = await putData<any>(`/tasks/start-task/${id}`, {});
    console.log("startTask", data);
    if (data) {
      console.log("data", data);
      setTask(data);
    }
  };

  const stopTask = async (id: any) => {
    console.log("startTask", id);
    const data = await putData<any>(`/tasks/stop-task/${id}`, {});
    console.log("startTask", data);
    if (data) {
      console.log("data", data);
      setTask(data);
    }
  };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center p-6">
        <h2 className="text-2xl my-4">{task?.detail?.title}</h2>
        <CircularProgress
          time={time}
          totalTime={task?.workDuration * 60 || 0}
        />
        <div className="text-4xl sm:text-6xl font-bold mb-8 ">
          {formatTime(time)}
        </div>
        {task ? (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={timerHandler}
              className="px-6 py-2 w-full sm:w-auto"
            >
              {isRunning ? "Pause" : "Start"}
            </Button>
          </div>
        ) : (
          <p className="text-blue-400">
            Please select task from below task lists
          </p>
        )}
      </CardContent>
    </Card>
  );
};
