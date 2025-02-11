"use client";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
        <p className="text-gray-600">You're successfully logged in.</p>
      </div>
    </AuthGuard>
  );
}
