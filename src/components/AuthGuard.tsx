"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token && pathname !== "/auth/login" && pathname !== "/auth/register") {
      router.push("/auth/login");
    }

    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return <>{children}</>;
}
