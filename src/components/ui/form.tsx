"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Form = ({ onSubmit, register, errors, loading }: any) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input label="Username" {...register("username")} error={errors.username?.message} />
      <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
};