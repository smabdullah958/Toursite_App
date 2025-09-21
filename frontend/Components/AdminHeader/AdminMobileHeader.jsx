
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AdminMobileHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  let closeMenu=()=>{
    setTimeout(() => {
        setShowMenu(false)
    }, 1000);
  }

  return (
    <header className="md:hidden bg-[#92c7f2] shadow-lg ">
      {/* Top bar with logo + burger */}
      <div className=" px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <p className="text-xl  font-bold text-white tracking-wide hover:scale-105 transition-transform">
          🌍 TouristApp
        </p>

        {/* Burger button */}
        {showMenu?
        //CROSS ICON
            <span className="mr-5">
            <button onClick={()=>setShowMenu(false)}>
              <span className="absolute w-6 h-[2px] bg-white rotate-45 "></span>
              <span className="absolute w-6 h-[2px] bg-white -rotate-45"></span>
              </button>
            </span>:<button
          onClick={() => setShowMenu(true)}
          className="focus:outline-none"
        >
          <Image src="/burger.webp" alt="menu" width={30} height={30} />
        </button>}
      </div>

      {/* Slide-down menu */}
      {showMenu &&(
        <div className="absolute top-16 left-0 w-full bg-[#92c7f2] shadow-md z-50 animate-slideDown">
          <nav className="flex flex-col gap-4 p-6 text-lg font-medium">
            <Link
              href="/"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              href="/PostDestination"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              onClick={closeMenu}
            >
              PostDestination
            </Link>
            <Link
              href="/Destination"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              onClick={closeMenu}
            >
              Destination
            </Link>
            <Link
              href="/PostPackages"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              onClick={closeMenu}
            >
              Packages
            </Link>
          
          <Link
              href="/GetDestinationBooking"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              onClick={closeMenu}
            >
              DestinationBooking
            </Link>

             <Link
              href="/GetPackageBookNow"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              onClick={closeMenu}
            >
              Package Booking
            </Link>

             <Link
              href="/PostOurTeam"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
              onClick={closeMenu}
            >
                     Post Team
            </Link>



          </nav>
    
        </div>
      )}
    </header>
  );
};

export default AdminMobileHeader;
