import { useEffect, useState } from "react";
import { Card, CardContent } from "../UI/Card";
import { deleteData, getData, postData } from "../../services/api";

type Detail = {
  title: string;
  description: string;
};

interface Task {
  id: number;
  detail: Detail;
  status: "pending" | "in_progress" | "completed";
  workDuration: number;
  active: boolean;
}

interface Props {
  startSession: (taskId: any) => void;
  task: any;
}

const TaskList = ({ startSession, task }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDetail, setTaskDetail] = useState<Detail>({
    title: "",
    description: "",
  });
  const [workDuration, setWorkDuration] = useState<number>(25);

  const addTask = async () => {
    if (taskDetail.title && taskDetail.description) {
      const data = await postData<any>("/tasks/", {
        title: taskDetail.title,
        workDuration: workDuration,
        description: taskDetail.description,
      });
      getTaskList();
    }
  };

  const getTaskList = async () => {
    const data = await getData<any>("/tasks");
    console.log("list res", data);
    setTasks(
      data.map((d: any) => ({
        id: d.id,
        detail: {
          title: d.title,
          description: d.description,
        },
        status: "pending",
        active: d.active,
        workDuration: Number(d.workDuration),
      }))
    );
    setTaskDetail({
      title: "",
      description: "",
    });
  };

  useEffect(() => {
    getTaskList();
  }, [task]);

  const deleteTask = async (taskId: number) => {
    await deleteData<any>(`/tasks/${taskId}`);
    getTaskList();
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardContent className="flex flex-col p-6">
        <div className="task-list">
          <h2 className="text-2xl font-bold">Task List</h2>
          <div className="my-2">
            <input
              type="text"
              value={taskDetail.title}
              onChange={(e) =>
                setTaskDetail({ ...taskDetail, title: e.target.value })
              }
              placeholder="Add a title..."
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              value={taskDetail.description}
              onChange={(e) =>
                setTaskDetail({ ...taskDetail, description: e.target.value })
              }
              placeholder="Add description..."
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="my-2">
            <label className="block mb-2">Work Duration (in minutes)</label>
            <input
              type="number"
              value={workDuration}
              onChange={(e) => setWorkDuration(Number(e.target.value))}
              placeholder="Add work duration..."
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            onClick={addTask}
            className="px-4 py-2 bg-primary text-white rounded w-full"
          >
            Add Task
          </button>
          <ul className="mt-4 text-slate-400">
            <li className="flex justify-between items-center p-2 border-b">
              <div className="">
                <span>Id</span>
                <span className="ml-4">Title</span>

                <span className="ml-4">Status</span>
              </div>
              <div>
                <span className="mr-14">Duration</span>
              </div>
            </li>
          </ul>

          <ul className="mt-4">
            {tasks.map((task, index) => {
              return (
                <li
                  key={task.id}
                  className="flex justify-between items-center p-2 border-b hover: cursor-pointer hover:bg-slate-300"
                  onClick={() => startSession(task)}
                >
                  <div className="">
                    <span className="ml-4 text-left">{index + 1} </span>
                    <span>{task.detail.title}</span>
                    <span className="ml-4">
                      {task?.active ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          Inactive
                        </span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="mr-4">
                      {Math.floor(task.workDuration)} min
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
