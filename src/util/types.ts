export type LoginInputs = {
  email: string;
  password: string;
};

export type Notificaiton = {
  open: boolean;
  message: string;
  type: "error" | "success" | null;
};
