import { forwardRef } from "react";

type Props = {
  type: "text" | "number" | "email" | "password";
  label?: string;
  error?: string | undefined;
  register?: any;
  inputClass?: string;
  readOnly?: boolean;
  placeholder?: string;
};

export const Input = forwardRef(
  (
    { type, label, error, register, inputClass, placeholder = "" }: Props,
    ref
  ) => {
    return (
      <div className="mb-5">
        {label && <label className="block mb-2"> {label}</label>}
        <input
          type={type}
          className={`${inputClass || "w-full p-2 rounded bg-charcoal-solid"}`}
          ref={ref}
          {...register}
          placeholder={placeholder}
        />
        {error && <small>{error}</small>}
      </div>
    );
  }
);
