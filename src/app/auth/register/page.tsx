"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterFormData {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const schema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Only Latin letters, numbers, and underscores are allowed"),
    name: z.string().min(2, "Name must be at least 2 characters").regex(/^[a-zA-Z]+$/, "Only Latin letters are allowed"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", {
        username: data.username,
        name: data.name,
        password: data.password,
      });
      router.push("/auth/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError("root", { message: err.response?.data?.message || "Registration failed." });
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
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {errors.root && <p className="text-red-500 bg-red-100 p-2 rounded">{errors.root.message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Username" {...register("username")} error={errors.username} />
          <Input label="Name" {...register("name")} error={errors.name} />
          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password}
            showPasswordToggle={true}
          />
          <Input
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
            showPasswordToggle={true}
          />
          <Button type="submit" className="w-full bg-blue-500 text-white" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
