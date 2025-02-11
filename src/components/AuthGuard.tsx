"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/authSlice";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken } = useSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token && !["/auth/login", "/auth/register"].includes(pathname)) {
      router.replace("/");
    }

    if (token && ["/auth/login", "/auth/register"].includes(pathname)) {
      router.replace("/dashboard");
    }

    setIsLoading(false);
  }, [pathname, router, accessToken]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return <>{children}</>;
}
