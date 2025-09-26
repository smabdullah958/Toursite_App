"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckLogIn from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck";
import { useRouter, usePathname } from "next/navigation";
import Loader from "@/app/loading";

const CheckLoginProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { Role, IsLogIn, Loading } = useSelector(state => state.CheckLogInSlice);

  useEffect(() => {
    dispatch(CheckLogIn());
  }, [dispatch]);

  useEffect(() => {
    if (Loading) return;
    // ✅ Only redirect from "/" (landing page)
    if (pathname === "/") {
      if (IsLogIn && Role === "Admin") {
        router.replace("/AdminDashboard");
      } else if (IsLogIn && Role !== "Admin") {
        router.replace("/"); // or your user home
      }
    }
  }, [IsLogIn, Role, Loading, pathname, router]);

  

  return <>{children}</>;
};

export default CheckLoginProvider;
