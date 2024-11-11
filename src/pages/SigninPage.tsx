import { useForm } from "react-hook-form";
import { signInSchema } from "../util/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../component";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import { postData } from "../services/api";

function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });
  const { openNotification } = useGlobalContext();
  const navigate = useNavigate();
  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    console.log(values);
    try {
      const data = await postData<any>("/user/login", values);
      if (data?.token) {
        console.log("data==>", data);
        localStorage.setItem("token", data.token);
        openNotification({
          open: true,
          message: "login successfully",
          type: "success",
        });
        navigate("/");
      }
    } catch (error: any) {
      if (error.response.status === 400)
        openNotification({
          open: true,
          message: "invalid credentials",
          type: "error",
        });
    }
  };
  console.log(errors);
  return (
    <div className="bg-primary h-screen pt-8 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 mx-auto py-8 px-5 bg-secondary rounded-lg"
      >
        <h2 className="font-bold text-xl mb-5">Sign in to your Account</h2>

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
          value="Sign in"
          className=" py-2 border w-full rounded-lg cursor-pointer "
        />
        <p className="mt-4 text-sm">
          Don't have an account yet?{" "}
          <Link to="/signup" className="inline">
            Sign up
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default SigninPage;
