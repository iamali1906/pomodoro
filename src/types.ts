export type User = {
  username: string;
  email: string;
  password: string;
};

export type Settings = {
  id?: string | number | null;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
};

export type Session = {
  taskId: number | string;
  type: "short_break" | "long_break" | "work";
};
