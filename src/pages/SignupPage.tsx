import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../util/validations";
import { Input } from "../component";
import { postData } from "../services/api";
import { User } from "../types";
import { useGlobalContext } from "../context/Global";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });
  const { openNotification } = useGlobalContext();
  const navigate = useNavigate();
  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      const data = await postData<User>("/user/register", values);
      if (data.username) {
        openNotification({
          open: true,
          message: "user registered successfully",
          type: "success",
        });
        navigate("/signin");
      }
    } catch (error: any) {
      if (error.response.status === 400)
        openNotification({
          open: true,
          message: "user already exists",
          type: "error",
        });
    }
  };

  return (
    <div className="bg-primary h-screen pt-8 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 mx-auto py-8 px-5 bg-secondary rounded-lg"
      >
        <h2 className="font-bold text-xl mb-5">Sign in to your Account</h2>

        <Input
          label="First Name"
          type="text"
          register={register("username")}
          error={errors.username?.message}
        />
        <Input
          label="Your Email"
          type="text"
          register={register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          register={register("password")}
          error={errors.password?.message}
        />

        <input
          type="submit"
          value="Create an account"
          className=" py-2 border w-full rounded-lg cursor-pointer "
        />
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="inline">
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
