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

  //for show loading while redirecting
    const [transitioning, setTransitioning] = useState(false);


  useEffect(() => {
    setMounted(true);
    dispatch(CheckLogIn());
  }, [dispatch]);

  //  Redirect after login check completes
  useEffect(() => {
    if (!mounted) return;

    if(!Loading){

    if (!IsLogIn || Role !== "Admin") {
      setTransitioning(true)
      router.replace("/"); 
    }

    else{
      setTransitioning(false)
    }
  }
  }, [mounted, Loading, IsLogIn, Role, router]);

  if (!mounted || Loading||transitioning) {
    return <Loader/>
  }

  
  if (IsLogIn && Role === "Admin") {
    return <>{children}</>;
  }

  // fallback while redirecting
  return <Loader/>;
};

export default CheckAdminLoginChecker;
