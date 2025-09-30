// // "use client";
// // import Link from "next/link";
// // import React from "react";
// // import LogOut from "@/Components/Buttons/LogOut";
// // import { useSelector } from "react-redux";

// // const HomePage = () => {
// //   const { IsLogIn } = useSelector((state) => state.CheckLogInSlice);

// //   const links = [
// //     {
// //       href: "/AdminDashboard/PostDestination",
// //       label: "Post Destination",
// //       icon: "🏖️",
// //       description: "Add new travel destinations",
// //     },
// //     {
// //       href: "/AdminDashboard/PostPackages",
// //       label: "Post Packages",
// //       icon: "📦",
// //       description: "Create travel packages",
// //     },
// //     {
// //       href: "/AdminDashboard/GetDestinationBooking",
// //       label: "Destination Booking",
// //       icon: "🎯",
// //       description: "Manage destination bookings",
// //     },
// //     {
// //       href: "/AdminDashboard/GetPackageBookNow",
// //       label: "Package Booking",
// //       icon: "✈️",
// //       description: "Handle package reservations",
// //     },
// //     {
// //       href: "/AdminDashboard/PostOurTeam",
// //       label: "Post Team",
// //       icon: "👥",
// //       description: "Add team members",
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
// //       {/* Background Effects */}
// //       <div className="absolute inset-0 bg-black/30"></div>
// //       <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
// //       <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-1000"></div>
// //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-500"></div>

// //       <div className="md:hidden relative pt-5 px-5 flex justify-end">
// //         <LogOut />
// //       </div>

// //       {/* Main Content */}
// //       <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-3 sm:p-0  md:pt-6">
// //         {/* Header */}
// //         <div className="text-center mb-12">
// //           <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
// //             Admin
// //             <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
// //               Dashboard
// //             </span>
// //           </h1>
// //           <p className="text-lg sm:text-xl text-gray-200 font-light">
// //             Manage your travel business with ease
// //           </p>
// //           <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mt-6 rounded-full"></div>
// //         </div>

// //         {/* Cards Grid */}
// //         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
// //           {links.map((link) => (
// //             <Link
// //               key={link.href}
// //               href={link.href}
// //               className="group relative block"
// //             >
// //               <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
// //               <div className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 h-full
// //                              hover:bg-white/20 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10
// //                              transform hover:-translate-y-1 transition-all duration-300">
// //                 {/* Icon */}
// //                 <div className="text-5xl mb-4 transform group-hover:scale-105 transition-transform duration-300">
// //                   <span role="img" aria-label={link.label}>{link.icon}</span>
// //                 </div>

// //                 {/* Title */}
// //                 <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
// //                   {link.label}
// //                 </h3>

// //                 {/* Description */}
// //                 <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
// //                   {link.description}
// //                 </p>

// //                 {/* Arrow Icon */}
// //                 <div className="absolute bottom-4 right-4 text-white/50 group-hover:text-yellow-300 transform group-hover:translate-x-1 transition-all duration-300">
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
// //                   </svg>
// //                 </div>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>

// //         {/* Footer */}
// //         <div className="mt-16 mb-3 text-center ">
// //           <div className="flex items-center justify-center space-x-4 text-gray-300">
// //             <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
// //             <span className="text-sm font-medium ">Tourist App</span>
// //             <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Floating Particles */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-30"></div>
// //         <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-20 delay-700"></div>
// //         <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40 delay-1000"></div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomePage;





// "use client";
// import Link from "next/link";
// import React from "react";
// import LogOut from "@/Components/Buttons/LogOut";
// import { useSelector } from "react-redux";

// const HomePage = () => {
//   const { IsLogIn } = useSelector((state) => state.CheckLogInSlice);

//   const links = [
//     {
//       href: "/AdminDashboard/PostDestination",
//       label: "Post Destination",
//       icon: "🏖️",
//       description: "Add new travel destinations",
//     },
//     {
//       href: "/AdminDashboard/PostPackages",
//       label: "Post Packages",
//       icon: "📦",
//       description: "Create travel packages",
//     },
//     {
//       href: "/AdminDashboard/GetDestinationBooking",
//       label: "Destination Booking",
//       icon: "🎯",
//       description: "Manage destination bookings",
//     },
//     {
//       href: "/AdminDashboard/GetPackageBookNow",
//       label: "Package Booking",
//       icon: "✈️",
//       description: "Handle package reservations",
//     },
//     {
//       href: "/AdminDashboard/PostOurTeam",
//       label: "Post Team",
//       icon: "👥",
//       description: "Add team members",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 relative overflow-hidden">
//       {/* Desert Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-0 w-full h-full"
//              style={{
//                backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
//                                 radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px)`,
//                backgroundSize: '100px 100px, 60px 60px'
//              }}>
//         </div>
//       </div>

//       {/* Desert Dune Shapes */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-96 h-64 bg-gradient-to-br from-amber-300/20 to-yellow-400/10 rounded-full transform -translate-x-32 -translate-y-20 blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-amber-400/15 to-yellow-300/10 rounded-full transform translate-x-20 translate-y-20 blur-2xl"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-300/10 to-amber-200/15 rounded-full blur-3xl"></div>
//       </div>

//       <div className="md:hidden relative pt-5 px-5 flex justify-end">
//         <LogOut />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 min-h-screen  flex flex-col items-center justify-center p-3 sm:p-0 md:pt-6">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
//             <span className="text-amber-900 drop-shadow-lg">Admin</span>
//             <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent ml-3 drop-shadow-lg">
//               Dashboard
//             </span>
//           </h1>
//           <p className="text-lg sm:text-xl text-amber-800 font-medium">
//             Manage your travel business with Arabian elegance
//           </p>
//           <div className="w-32 h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 mx-auto mt-6 rounded-full shadow-sm"></div>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-screen w-full">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="group relative block"
//             >
//               {/* Glow Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-amber-300/30 via-yellow-300/20 to-amber-400/25 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

//               {/* Main Card */}
//               <div className="relative bg-gradient-to-br from-yellow-50/90 to-amber-50/80 backdrop-blur-sm
//                              border-2 border-amber-200/50 rounded-xl p-6 h-full shadow-lg
//                              hover:from-amber-50/95 hover:to-yellow-50/90 hover:border-amber-300/70
//                              hover:shadow-2xl hover:shadow-amber-200/30
//                              transform hover:-translate-y-2 transition-all duration-300">

//                 {/* Desert Sand Border */}
//                 <div className="absolute inset-0 rounded-xl border border-gradient-to-r from-amber-300/20 via-yellow-300/30 to-amber-400/20"></div>

//                 {/* Icon */}
//                 <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
//                   <span role="img" aria-label={link.label}>{link.icon}</span>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-xl font-bold text-amber-900 mb-3 group-hover:text-amber-800 transition-colors duration-300">
//                   {link.label}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-amber-700 text-sm leading-relaxed group-hover:text-amber-800 transition-colors duration-300 font-medium">
//                   {link.description}
//                 </p>

//                 {/* Arabian-style Arrow */}
//                 <div className="absolute bottom-4 right-4 text-amber-500 group-hover:text-amber-700 transform group-hover:translate-x-1 transition-all duration-300">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Footer with Arabian Touch */}
//         <div className="mt-16 mb-3 text-center">
//           <div className="flex items-center justify-center space-x-4 text-amber-700">
//             <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-pulse shadow-sm"></div>
//             <span className="text-sm font-bold tracking-wider text-amber-900">IBN SAHRA TRAVELS</span>
//             <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full animate-pulse delay-300 shadow-sm"></div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Desert Particles */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-40"></div>
//         <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-ping opacity-30 delay-700"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-amber-600 rounded-full animate-ping opacity-50 delay-1000"></div>
//         <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-600 rounded-full animate-ping opacity-60 delay-1500"></div>
//       </div>

//       {/* Desert Wind Effect */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-100/30 to-transparent pointer-events-none"></div>
//     </div>
//   );
// };

// export default HomePage;











"use client";
import Link from "next/link";
import React from "react";
import LogOut from "@/Components/Buttons/LogOut";
// import { useSelector } from "react-redux";

const HomePage = () => {
  // const { IsLogIn } = useSelector((state) => state.CheckLogInSlice);

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 relative overflow-hidden">
      {/* Desert Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px)`,
               backgroundSize: '100px 100px, 60px 60px'
             }}>
        </div>
      </div>

      {/* Desert Dune Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-64 bg-gradient-to-br from-amber-300/20 to-yellow-400/10 rounded-full transform -translate-x-32 -translate-y-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-amber-400/15 to-yellow-300/10 rounded-full transform translate-x-20 translate-y-20 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-300/10 to-amber-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="md:hidden relative pt-5 px-5 flex justify-end">
        <LogOut />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 xl:mb-20">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold mb-4 lg:mb-6 xl:mb-8 tracking-tight">
            <span className="text-amber-900 drop-shadow-lg">Admin</span>
            <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent ml-3 drop-shadow-lg">
              Dashboard
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-amber-800 font-medium">
            Manage your travel business with Arabian elegance
          </p>
          <div className="w-32 lg:w-40 xl:w-48 h-1 lg:h-1.5 xl:h-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 mx-auto mt-6 lg:mt-8 xl:mt-10 rounded-full shadow-sm"></div>
        </div>

        {/* Cards Grid - Enhanced for large screens */}
        <div className="grid gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl 2xl:max-w-none w-full">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative block"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/30 via-yellow-300/20 to-amber-400/25 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

              {/* Main Card - Enhanced height for large screens */}
              <div className="relative bg-gradient-to-br from-yellow-50/90 to-amber-50/80 backdrop-blur-sm
                             border-2 border-amber-200/50 rounded-xl
                             p-6 lg:p-8 xl:p-10 2xl:p-12
                             h-48 md:h-56 lg:h-64 xl:h-80 2xl:h-96
                             shadow-lg
                             hover:from-amber-50/95 hover:to-yellow-50/90 hover:border-amber-300/70
                             hover:shadow-2xl hover:shadow-amber-200/30
                             transform hover:-translate-y-2 transition-all duration-300
                             flex flex-col justify-between">

                {/* Desert Sand Border */}
                <div className="absolute inset-0 rounded-xl border border-gradient-to-r from-amber-300/20 via-yellow-300/30 to-amber-400/20"></div>

                <div className="flex-1 flex flex-col">
                  {/* Icon */}
                  <div className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 lg:mb-6 xl:mb-8 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                    <span role="img" aria-label={link.label}>{link.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-amber-900 mb-3 lg:mb-4 xl:mb-6 group-hover:text-amber-800 transition-colors duration-300">
                    {link.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl text-amber-700 leading-relaxed group-hover:text-amber-800 transition-colors duration-300 font-medium flex-1">
                    {link.description}
                  </p>
                </div>

                {/* Arabian-style Arrow */}
                <div className="absolute bottom-4 lg:bottom-6 xl:bottom-8 2xl:bottom-10 right-4 lg:right-6 xl:right-8 2xl:right-10 text-amber-500 group-hover:text-amber-700 transform group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer with Arabian Touch */}
        <div className="mt-16 lg:mt-20 xl:mt-24 2xl:mt-32 mb-3 text-center">
          <div className="flex items-center justify-center space-x-4 lg:space-x-6 xl:space-x-8 text-amber-700">
            <div className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-pulse shadow-sm"></div>
            <span className="text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold tracking-wider text-amber-900">IBN SAHRA TRAVELS</span>
            <div className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full animate-pulse delay-300 shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Floating Desert Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 bg-amber-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-yellow-500 rounded-full animate-ping opacity-30 delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-amber-600 rounded-full animate-ping opacity-50 delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 lg:w-2 lg:h-2 xl:w-3 xl:h-3 bg-yellow-600 rounded-full animate-ping opacity-60 delay-1500"></div>
      </div>

      {/* Desert Wind Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 lg:h-40 xl:h-48 bg-gradient-to-t from-amber-100/30 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default HomePage;