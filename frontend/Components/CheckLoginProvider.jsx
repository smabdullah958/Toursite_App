"use client";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import  CheckLogIn  from "@/Libraries/ReduxToolkit/AsyncThunck/Auth/CheckLoginThunck";
import { useRouter } from "next/navigation";
const CheckLoginProvider = ({ children }) => {
  let route=useRouter()
  const dispatch = useDispatch();
//it is check user is admin or not  if admin than redirect toa  admin panel
  let {Role,IsLogIn}=useSelector((state)=>state.CheckLogInSlice)

  useEffect(() => {
    dispatch(CheckLogIn());
  }, [dispatch]);

  useEffect(()=>{
    if(IsLogIn){
      if(Role==="Admin"){
  route.push("/AdminDashboard")
}
else{
  route.push("/")
}

    }
  })

  return <>{children}</>;

};

export default CheckLoginProvider;
