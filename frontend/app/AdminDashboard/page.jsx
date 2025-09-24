"use client";
import Link from "next/link";
import React from "react";
import LogOut from "@/Components/Buttons/LogOut";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { IsLogIn } = useSelector((state) => state.CheckLogInSlice);

  const links = [
    {
      href: "/AdminDashboard/PostDestination",
      label: "Post Destination",
      icon: "🏖️",
      description: "Add new travel destinations",
    },
    {
      href: "/AdminDashboard/PostPackages",
      label: "Post Packages",
      icon: "📦",
      description: "Create travel packages",
    },
    {
      href: "/AdminDashboard/GetDestinationBooking",
      label: "Destination Booking",
      icon: "🎯",
      description: "Manage destination bookings",
    },
    {
      href: "/AdminDashboard/GetPackageBookNow",
      label: "Package Booking",
      icon: "✈️",
      description: "Handle package reservations",
    },
    {
      href: "/AdminDashboard/PostOurTeam",
      label: "Post Team",
      icon: "👥",
      description: "Add team members",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-500"></div>

      <div className="md:hidden relative pt-5 px-5 flex justify-end">
        <LogOut />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-3 sm:p-0  md:pt-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            Admin
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 font-light">
            Manage your travel business with ease
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 h-full
                             hover:bg-white/20 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10
                             transform hover:-translate-y-1 transition-all duration-300">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <span role="img" aria-label={link.label}>{link.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                  {link.label}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                  {link.description}
                </p>

                {/* Arrow Icon */}
                <div className="absolute bottom-4 right-4 text-white/50 group-hover:text-yellow-300 transform group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 mb-3 text-center ">
          <div className="flex items-center justify-center space-x-4 text-gray-300">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium ">Tourist App</span>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-20 delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40 delay-1000"></div>
      </div>
    </div>
  );
};

export default HomePage;