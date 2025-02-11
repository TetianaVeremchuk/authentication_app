"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/store/authSlice";

interface LoginFormData {
  username: string;
  password: string;
}

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only Latin letters, numbers, and underscores are allowed"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", data);

      const token = response.data.accessToken;
      dispatch(setAccessToken(token));
      localStorage.setItem("accessToken", token);

      router.replace("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError("root", { message: err.response?.data?.message || "Invalid credentials" });
      } else {
        setError("root", { message: "An unexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {errors.root && <p className="text-red-500 bg-red-100 p-2 rounded">{errors.root.message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Username" {...register("username")} error={errors.username} />
          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password}
            showPasswordToggle={true}
          />
          <Button type="submit" className="w-full bg-blue-500 text-white" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
