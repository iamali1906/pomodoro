import { useEffect } from "react";
import { useGlobalContext } from "../../context/Global";

export const Notification = () => {
  const { notification, closeNotification } = useGlobalContext();
  useEffect(() => {
    let timer: any;
    if (notification.open) {
      timer = setTimeout(() => {
        closeNotification();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [notification]);

  if (!notification.open) return null;
  return (
    <div
      className={`absolute top-1 right-1 w-[300px] rounded-sm p-4  text-white ${
        notification.type === "error"
          ? "bg-red-400"
          : notification.type === "success" && "bg-green-400"
      }`}
    >
      {notification.open && notification.message}
    </div>
  );
};
