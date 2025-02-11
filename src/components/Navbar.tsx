"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearAccessToken, selectAuth } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { accessToken } = useSelector(selectAuth);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(clearAccessToken());
    localStorage.removeItem("accessToken");

    // Використовуємо `replace()` для миттєвого перенаправлення на головну
    router.replace("/");
  };

  if (!isMounted) return null; // Запобігає гідратаційним помилкам

  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Auth App
      </Link>
      <div className="space-x-4">
        {accessToken ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded transition-colors duration-200 hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded transition-colors duration-200 hover:bg-gray-300"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-500 text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-blue-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
