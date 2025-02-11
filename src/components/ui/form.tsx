"use client";

import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

interface FormProps<T extends FieldValues> {
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  loading: boolean;
}

export const Form = <T extends FieldValues>({
  onSubmit,
  register,
  errors,
  loading,
}: FormProps<T>) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input label="Username" {...register("username" as Path<T>)} error={errors.username?.message as string} />
      <Input label="Password" type="password" {...register("password" as Path<T>)} error={errors.password?.message as string} />
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
};
