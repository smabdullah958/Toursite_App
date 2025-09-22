"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const { IsLogIn, Role, Loading } = useSelector((state) => state.CheckLogInSlice);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Prevent hydration mismatch
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Skip until mounted
    if (!Loading) {
      if (!IsLogIn || Role !== "Admin") {
        router.push("/");
      } 
    }
  }, [IsLogIn, Role, Loading, router, isMounted]);

  if (!isMounted || Loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-b-4 mx-auto mb-4"></div>
          <p className="text-xl md:text-2xl text-gray-600 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is logged in and has Admin role
  if (IsLogIn && Role === "Admin") {
    return <div>{children}</div>;
  }

  // Fallback (shouldn't reach here due to useEffect redirect)
  return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-b-4 mx-auto mb-4"></div>
          <p className="text-xl md:text-2xl text-gray-600 animate-pulse">Loading...</p>
        </div>
      </div>
  );
}