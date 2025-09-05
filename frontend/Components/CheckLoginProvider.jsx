"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import  CheckLogIn  from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck";

const CheckLoginProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckLogIn());
  }, [dispatch]);

  return <>{children}</>;
};

export default CheckLoginProvider;
