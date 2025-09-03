// components/NavbarWrapper.jsx
"use client";

import { usePathname } from "next/navigation";

import MobileHeader from "@/Components/UserHeader/MobileHeader";
import Header from "@/Components/UserHeader/Header"
import AdminHeader from "@/Components/AdminHeader/AdminHeader"
import AdminMobileHeader from "@/Components/AdminHeader/AdminMobileHeader";
import { useSelector} from "react-redux";
export default function NavbarWrapper() {
  const pathname = usePathname();
//checkloginslice is come froma  store
  let {Role,IsLogIn}=useSelector((state)=>state.CheckLogInSlice)
  
  
//dont show a header on a reset password
  if (pathname.startsWith("/Reset_password/")) {
    return null; // don’t show anything
  }

  if (!IsLogIn) {
    // ✅ show default header if not logged in
    return (
      <div>
        <Header />
        <MobileHeader />
      </div>
    );
  }

  return (
    <div>
              {Role==="Admin"?(
                <div>
                    <AdminHeader/>
                    <AdminMobileHeader/>
                </div>
              ):(
                <div>
                <Header/>
                <MobileHeader/>
                </div>
              )
              }

    </div>
  );
}
