import React from "react";
import Link from "next/link";
import LogIn from "../Buttons/LogIn";
import LogOut from "../Buttons/LogOut";
import Image from "next/image";
const AdminHeader= () => {
  return (
    <header className=" sticky top-0 z-50">
      <div className="   hidden md:flex justify-between items-center md:h-16 bg-gradient-to-br from-[#deca99] via-[#CD853F] to-[#A0522D] shadow-lg  mx-auto px-3 lg:px-6  h-16 2xl:h-40  ">
        
        {/* Logo / Brand */}

      <div className="relative w-32 h-20 2xl:size-36">
  <Image
    src="/log.png"
    alt="logo"
    fill
    className="object-contain"
    priority
  />
</div>



        {/* Navigation Links */}
        <nav className="flex gap-6 text-lg 2xl:text-4xl font-medium">
          <Link   href="/AdminDashboard"
            className="text-white hover:text-yellow-300 transition-colors duration-300">
            Home
          </Link>

          <Link
            href="/Destination"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Destination
          </Link>
        
        <Link
            href="/Packages"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Packages
          </Link>

        <Link
            href="/OurTeam"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Our Team
          </Link>
          

        </nav>

      <div className="flex gap-2">
         <LogOut/><LogIn/></div>

      </div>
    </header>
  );
};

export default AdminHeader;
