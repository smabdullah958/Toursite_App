

"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckLogIn from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck";
import { useRouter } from "next/navigation";
import Loader from "@/app/loading"

const CheckAdminLoginChecker = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { Role, IsLogIn, Loading } = useSelector((state) => state.CheckLogInSlice);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    dispatch(CheckLogIn());
  }, [dispatch]);

  // ✅ redirect runs *after* render, never inside return
  useEffect(() => {
    if (!mounted || Loading) return;

    if (!IsLogIn || Role !== "Admin") {
      router.replace("/"); // or router.push("/")
    }
  }, [mounted, Loading, IsLogIn, Role, router]);

  if (!mounted || Loading) {
    return <Loader/>
  }

  if (IsLogIn && Role === "Admin") {
    return <>{children}</>;
  }

  // fallback while redirecting
  return <Loader/>;
};

export default CheckAdminLoginChecker;
