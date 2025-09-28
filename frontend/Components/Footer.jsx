// // // import Link from "next/link"; 
// // // import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, Plane, Globe } from "lucide-react"; 
 
// // // function Footer() { 
// // //   return ( 
// // //     <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden"> 
// // //       {/* Background Effects */}
// // //       <div className="absolute inset-0 bg-black/20"></div>
// // //       <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
// // //       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
// // //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
// // //       <div className="relative z-10">
// // //         <div className="container mx-auto px-6 py-16"> 
// // //           {/* Main Content Grid */}
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"> 
             
// // //             {/* Brand Section */} 
// // //             <div className="lg:col-span-1"> 
// // //               <div className="flex items-center space-x-3 mb-6">
// // //                 <div className="relative">
// // //                   <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3">
// // //                     <Globe className="w-7 h-7 text-white" />
// // //                   </div>
// // //                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
// // //                     <Plane className="w-3 h-3 text-white" />
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
// // //                     TouristApp
// // //                   </h2>
// // //                 </div>
// // //               </div>
// // //               <p className="text-gray-300 text-sm leading-relaxed mb-6"> 
// // //                 🌟 Travel. Explore. Discover.<br /> 
// // //                 <span className="text-yellow-400 font-medium">Your adventure starts here.</span><br />
// // //                 Making dream destinations accessible to everyone.
// // //               </p>
              
// // //               {/* Trust Badges */}
// // //               <div className="flex flex-wrap gap-3">
// // //                 <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
// // //                   <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
// // //                     <span className="text-xs font-bold text-white">✓</span>
// // //                   </div>
// // //                   <span className="text-xs text-gray-300">Trusted by 10K+</span>
// // //                 </div>
// // //                 <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
// // //                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
// // //                     <span className="text-xs font-bold text-white">🛡️</span>
// // //                   </div>
// // //                   <span className="text-xs text-gray-300">Secure Booking</span>
// // //                 </div>
// // //               </div>
// // //             </div> 
     
// // //             {/* Quick Links */} 
// // //             <div> 
// // //               <h3 className="text-xl font-bold mb-6 relative">
// // //                 <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
// // //                   Quick Links
// // //                 </span>
// // //                 <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></div>
// // //               </h3> 
// // //               <ul className="space-y-4"> 
// // //                 {[
// // //                   { href: "/Destination", text: "Destinations", icon: "🏝️" },
// // //                   { href: "/Packages", text: "Travel Packages", icon: "📦" },
// // //                   { href: "/OurTeam", text: "About Our Team", icon: "👥" },
// // //                   { href: "/reviews", text: "Reviews", icon: "⭐" }
// // //                 ].map((link, index) => (
// // //                   <li key={index}>
// // //                     <Link 
// // //                       href={link.href} 
// // //                       className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-300 group"
// // //                     >
// // //                       <span className="text-sm group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
// // //                       <span className="group-hover:translate-x-1 transition-transform duration-300">{link.text}</span>
// // //                       <div className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 rounded-full"></div>
// // //                     </Link>
// // //                   </li>
// // //                 ))}
// // //               </ul> 
// // //             </div> 
     
// // //             {/* Popular Destinations */} 
// // //             <div> 
// // //               <h3 className="text-xl font-bold mb-6 relative">
// // //                 <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
// // //                   Popular Destinations
// // //                 </span>
// // //                 <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full"></div>
// // //               </h3> 
// // //               <ul className="space-y-4"> 
// // //                 {[
// // //                   { name: "Maldives", icon: "🏖️", rating: "4.9", visits: "2.1k" },
// // //                   { name: "Paris", icon: "🗼", rating: "4.8", visits: "3.5k" },
// // //                   { name: "Dubai", icon: "🏜️", rating: "4.7", visits: "1.8k" },
// // //                   { name: "Turkey", icon: "⛰️", rating: "4.9", visits: "2.9k" }
// // //                 ].map((dest, index) => (
// // //                   <li key={index} className="group cursor-pointer">
// // //                     <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
// // //                       <div className="flex items-center space-x-3">
// // //                         <span className="text-lg group-hover:scale-110 transition-transform duration-300">{dest.icon}</span>
// // //                         <div>
// // //                           <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{dest.name}</p>
// // //                           <div className="flex items-center space-x-2 text-xs">
// // //                             <span className="text-yellow-400">⭐ {dest.rating}</span>
// // //                             <span className="text-gray-500">•</span>
// // //                             <span className="text-gray-400">{dest.visits} visits</span>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// // //                         <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
// // //                           <span className="text-white text-xs">→</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </li>
// // //                 ))}
// // //               </ul> 
// // //             </div> 
     
// // //             {/* Contact Us */} 
// // //             <div> 
// // //               <h3 className="text-xl font-bold mb-6 relative">
// // //                 <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
// // //                   Get in Touch
// // //                 </span>
// // //                 <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-400 to-transparent rounded-full"></div>
// // //               </h3> 
// // //               <ul className="space-y-5"> 
// // //                 {[
// // //                   { 
// // //                     icon: MapPin, 
// // //                     text: "Karachi, Pakistan", 
// // //                     subtext: "Office Hours: 9 AM - 6 PM",
// // //                     color: "from-red-400 to-red-600"
// // //                   },
// // //                   { 
// // //                     icon: Phone, 
// // //                     text: "+92 300 1234567", 
// // //                     subtext: "24/7 Customer Support",
// // //                     color: "from-green-400 to-green-600"
// // //                   },
// // //                   { 
// // //                     icon: Mail, 
// // //                     text: "support@touristapp.com", 
// // //                     subtext: "Quick Response Guaranteed",
// // //                     color: "from-blue-400 to-blue-600"
// // //                   }
// // //                 ].map((contact, index) => (
// // //                   <li key={index} className="group cursor-pointer">
// // //                     <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
// // //                       <div className={`w-10 h-10 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
// // //                         <contact.icon className="w-5 h-5 text-white" />
// // //                       </div>
// // //                       <div>
// // //                         <p className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">{contact.text}</p>
// // //                         <p className="text-xs text-gray-400 mt-1">{contact.subtext}</p>
// // //                       </div>
// // //                     </div>
// // //                   </li>
// // //                 ))}
// // //               </ul> 
// // //             </div> 
// // //           </div>

// // //           </div>
// // //         {/* Bottom Bar */} 
// // //         <div className="border-t border-white/20 py-8"> 
// // //           <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
// // //             <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
// // //               <p className="text-sm text-gray-400"> 
// // //                 © {new Date().getFullYear()} TouristApp. All rights reserved. 
// // //               </p>
// // //               </div>
     
// // //             {/* Social Media */} 
// // //             <div className="flex space-x-4"> 
// // //               {[
// // //                 { Icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
// // //                 { Icon: Instagram, color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500", label: "Instagram" },
// // //                 { Icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
// // //                 { Icon: Youtube, color: "hover:bg-red-600", label: "YouTube" }
// // //               ].map((social, index) => (
// // //                 <Link 
// // //                   key={index}
// // //                   href="#" 
// // //                   className={`w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-gray-300 hover:text-white ${social.color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
// // //                   title={social.label}
// // //                 >
// // //                   <social.Icon size={18} />
// // //                 </Link>
// // //               ))}
// // //             </div> 
// // //           </div> 
// // //         </div>
// // //       </div>

// // //       {/* Floating Particles */}
// // //       <div className="absolute inset-0 pointer-events-none overflow-hidden">
// // //         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-40"></div>
// // //         <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-30 delay-700"></div>
// // //         <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-20 delay-1000"></div>
// // //         <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-50 delay-300"></div>
// // //       </div>
// // //     </footer> 
// // //   ); 
// // // } 
 
// // // export default Footer;





// // import Link from "next/link"; 
// // import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, Plane, Globe } from "lucide-react";  
// // import Image from "next/image";

// // function Footer() { 
// //   return ( 
// //     <footer className="relative bg-gradient-to-br from-amber-300 via-yellow-500 to-orange-200 text-white overflow-hidden"> 
// //       {/* Background Effects */}
// //       <div className="absolute inset-0 bg-black/20"></div>
// //       <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
// //       <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
// //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
// //       <div className="relative z-10">
// //         <div className="container mx-auto px-6 py-16"> 
// //           {/* Main Content Grid */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"> 
             
// //             {/* Brand Section */} 
// //         <Image 
// //          src="/log.png"
// //         alt="logo"
// //         fill
// //           className="object-contain"
// //          priority/>

// //             {/* Quick Links */} 
// //             <div> 
// //               <h3 className="text-xl font-bold mb-6 relative">
// //                 <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
// //                   Quick Links
// //                 </span>
// //                 <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
// //               </h3> 
// //               <ul className="space-y-4"> 
// //                 {[
// //                   { href: "/Destination", text: "Destinations", icon: "🏝️" },
// //                   { href: "/Packages", text: "Travel Packages", icon: "📦" },
// //                   { href: "/OurTeam", text: "About Our Team", icon: "👥" },
// //                   { href: "#reviews", text: "Reviews", icon: "⭐" }
// //                 ].map((link, index) => (
// //                   <li key={index}>
// //                     <Link 
// //                       href={link.href} 
// //                       className="flex items-center space-x-3 text-amber-100 hover:text-amber-300 transition-all duration-300 group"
// //                     >
// //                       <span className="text-sm group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
// //                       <span className="group-hover:translate-x-1 transition-transform duration-300">{link.text}</span>
// //                       <div className="w-0 group-hover:w-2 h-0.5 bg-amber-300 transition-all duration-300 rounded-full"></div>
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul> 
// //             </div> 
     
// //             {/* Popular Destinations */} 
// //             <div> 
// //               <h3 className="text-xl font-bold mb-6 relative">
// //                 <span className="bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
// //                   Popular Destinations
// //                 </span>
// //                 <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
// //               </h3> 
// //               <ul className="space-y-4"> 
// //                 {[
// //                   { name: "Maldives", icon: "🏖️", rating: "4.9", visits: "2.1k" },
// //                   { name: "Paris", icon: "🗼", rating: "4.8", visits: "3.5k" },
// //                   { name: "Dubai", icon: "🏜️", rating: "4.7", visits: "1.8k" },
// //                   { name: "Turkey", icon: "⛰️", rating: "4.9", visits: "2.9k" }
// //                 ].map((dest, index) => (
// //                   <li key={index} className="group cursor-pointer">
// //                     <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
// //                       <div className="flex items-center space-x-3">
// //                         <span className="text-lg group-hover:scale-110 transition-transform duration-300">{dest.icon}</span>
// //                         <div>
// //                           <p className="text-amber-100 group-hover:text-white transition-colors duration-300">{dest.name}</p>
// //                           <div className="flex items-center space-x-2 text-xs">
// //                             <span className="text-amber-300">⭐ {dest.rating}</span>
// //                             <span className="text-amber-500">•</span>
// //                             <span className="text-amber-200">{dest.visits} visits</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                         <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
// //                           <span className="text-white text-xs">→</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </li>
// //                 ))}
// //               </ul> 
// //             </div> 
     
// //             {/* Contact Us */} 
// //             <div> 
// //               <h3 className="text-xl font-bold mb-6 relative">
// //                 <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
// //                   Get in Touch
// //                 </span>
// //                 <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-400 to-transparent rounded-full"></div>
// //               </h3> 
// //               <ul className="space-y-5"> 
// //                 {[
// //                   { 
// //                     icon: MapPin, 
// //                     text: "Karachi, Pakistan", 
// //                     subtext: "Office Hours: 9 AM - 6 PM",
// //                     color: "from-amber-400 to-amber-600"
// //                   },
// //                   { 
// //                     icon: Phone, 
// //                     text: "+92 300 1234567", 
// //                     subtext: "24/7 Customer Support",
// //                     color: "from-yellow-400 to-yellow-600"
// //                   },
// //                   { 
// //                     icon: Mail, 
// //                     text: "support@touristapp.com", 
// //                     subtext: "Quick Response Guaranteed",
// //                     color: "from-orange-400 to-orange-600"
// //                   }
// //                 ].map((contact, index) => (
// //                   <li key={index} className="group cursor-pointer">
// //                     <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
// //                       <div className={`w-10 h-10 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
// //                         <contact.icon className="w-5 h-5 text-white" />
// //                       </div>
// //                       <div>
// //                         <p className="text-amber-100 group-hover:text-white transition-colors duration-300 font-medium">{contact.text}</p>
// //                         <p className="text-xs text-amber-200 mt-1">{contact.subtext}</p>
// //                       </div>
// //                     </div>
// //                   </li>
// //                 ))}
// //               </ul> 
// //             </div> 
// //           </div>

// //           </div>
// //         {/* Bottom Bar */} 
// //         <div className="border-t border-white/20 py-8"> 
// //           <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
// //             <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
// //               <p className="text-sm text-amber-200"> 
// //                 © {new Date().getFullYear()} TouristApp. All rights reserved. 
// //               </p>
// //               </div>
     
// //             {/* Social Media */} 
// //             <div className="flex space-x-4"> 
// //               {[
// //                 { Icon: Facebook, color: "hover:bg-amber-600", label: "Facebook" },
// //                 { Icon: Instagram, color: "hover:bg-gradient-to-br hover:from-amber-500 hover:to-yellow-500", label: "Instagram" },
// //                 { Icon: Twitter, color: "hover:bg-yellow-600", label: "Twitter" },
// //                 { Icon: Youtube, color: "hover:bg-orange-600", label: "YouTube" }
// //               ].map((social, index) => (
// //                 <Link 
// //                   key={index}
// //                   href="#" 
// //                   className={`w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-amber-100 hover:text-white ${social.color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
// //                   title={social.label}
// //                 >
// //                   <social.Icon size={18} />
// //                 </Link>
// //               ))}
// //             </div> 
// //           </div> 
// //         </div>
// //       </div>

// //       {/* Floating Particles */}
// //       <div className="absolute inset-0 pointer-events-none overflow-hidden">
// //         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-40"></div>
// //         <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-30 delay-700"></div>
// //         <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-20 delay-1000"></div>
// //         <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-amber-300 rounded-full animate-ping opacity-50 delay-300"></div>
// //       </div>
// //     </footer> 
// //   ); 
// // } 
 
// // export default Footer;



// import Link from "next/link"; 
// import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, Plane, Globe } from "lucide-react";  
// import Image from "next/image";

// function Footer() { 
//   return ( 
//     <footer className="relative bg-gradient-to-br from-amber-300 via-yellow-500 to-orange-200 text-white overflow-hidden"> 
//       {/* Background Effects */}
//       <div className="absolute inset-0 bg-black/20"></div>
//       <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
//       <div className="relative z-10">
//         <div className="container mx-auto px-6 pt-10  md:py-16"> 
//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 "> 
             
//             {/* Brand Section */} 
//             <div className="lg:col-span-1"> 
//               <div className="flex items-center space-x-3 ">
//                 <div className="relative w-20 sm:w-32">
//                   <Image 
//                     src="/log.png"
//                     alt="Ibn Sahra Logo"
//                     width={140}
//                     height={200}
//                     className="object-contain rounded-lg"
//                     priority
//                   />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-100 to-yellow-100 bg-clip-text text-transparent">
//                     Ibn Sahra
//                   </h2>
//                   <p className="text-xs text-amber-200">Travel</p>
//                 </div>
//               </div>
//               <p className="text-amber-100 text-sm leading-relaxed mb-6"> 
//                 🌟 Travel. Explore. Discover.<br /> 
//                 <span className="text-amber-200 font-medium">Your adventure starts here.</span><br />
//                 Making dream destinations accessible to everyone.
//               </p>
              
//               {/* Trust Badges */}
//               <div className="flex flex-wrap gap-3">
//                 <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
//                   <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
//                     <span className="text-xs font-bold text-white">✓</span>
//                   </div>
//                   <span className="text-xs text-amber-200">Trusted by 10K+</span>
//                 </div>
//                 <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
//                   <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
//                     <span className="text-xs font-bold text-white">🛡️</span>
//                   </div>
//                   <span className="text-xs text-amber-200">Secure Booking</span>
//                 </div>
//               </div>
//             </div> 

//             {/* Quick Links */} 
//             <div> 
//               <h3 className="text-xl font-bold mb-6 relative">
//                 <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
//                   Quick Links
//                 </span>
//                 <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
//               </h3> 
//               <ul className="space-y-4"> 
//                 {[
//                   { href: "/Destination", text: "Destinations", icon: "🏝️" },
//                   { href: "/Packages", text: "Travel Packages", icon: "📦" },
//                   { href: "/OurTeam", text: "About Our Team", icon: "👥" },
//                   { href: "#reviews", text: "Reviews", icon: "⭐" }
//                 ].map((link, index) => (
//                   <li key={index}>
//                     <Link 
//                       href={link.href} 
//                       className="flex items-center space-x-3 text-amber-100 hover:text-amber-300 transition-all duration-300 group"
//                     >
//                       <span className="text-sm group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
//                       <span className="group-hover:translate-x-1 transition-transform duration-300">{link.text}</span>
//                       <div className="w-0 group-hover:w-2 h-0.5 bg-amber-300 transition-all duration-300 rounded-full"></div>
//                     </Link>
//                   </li>
//                 ))}
//               </ul> 
//             </div> 
     
//             {/* Popular Destinations */} 
//             <div> 
//               <h3 className="text-xl font-bold mb-6 relative">
//                 <span className="bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
//                   Popular Destinations
//                 </span>
//                 <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
//               </h3> 
//               <ul className="space-y-4"> 
//                 {[
//                   { name: "Maldives", icon: "🏖️", rating: "4.9", visits: "2.1k" },
//                   { name: "Paris", icon: "🗼", rating: "4.8", visits: "3.5k" },
//                   { name: "Dubai", icon: "🏜️", rating: "4.7", visits: "1.8k" },
//                   { name: "Turkey", icon: "⛰️", rating: "4.9", visits: "2.9k" }
//                 ].map((dest, index) => (
//                   <li key={index} className="group cursor-pointer">
//                     <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
//                       <div className="flex items-center space-x-3">
//                         <span className="text-lg group-hover:scale-110 transition-transform duration-300">{dest.icon}</span>
//                         <div>
//                           <p className="text-amber-100 group-hover:text-white transition-colors duration-300">{dest.name}</p>
//                           <div className="flex items-center space-x-2 text-xs">
//                             <span className="text-amber-300">⭐ {dest.rating}</span>
//                             <span className="text-amber-500">•</span>
//                             <span className="text-amber-200">{dest.visits} visits</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
//                           <span className="text-white text-xs">→</span>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul> 
//             </div> 
     
//             {/* Contact Us */} 
//             <div> 
//               <h3 className="text-xl font-bold mb-6 relative">
//                 <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
//                   Get in Touch
//                 </span>
//                 <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-400 to-transparent rounded-full"></div>
//               </h3> 
//               <ul className="space-y-5"> 
//                 {[
//                   { 
//                     icon: MapPin, 
//                     text: "Karachi, Pakistan", 
//                     subtext: "Office Hours: 9 AM - 6 PM",
//                     color: "from-amber-400 to-amber-600"
//                   },
//                   { 
//                     icon: Phone, 
//                     text: "+92 300 1234567", 
//                     subtext: "24/7 Customer Support",
//                     color: "from-yellow-400 to-yellow-600"
//                   },
//                   { 
//                     icon: Mail, 
//                     text: "support@touristapp.com", 
//                     subtext: "Quick Response Guaranteed",
//                     color: "from-orange-400 to-orange-600"
//                   }
//                 ].map((contact, index) => (
//                   <li key={index} className="group cursor-pointer">
//                     <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
//                       <div className={`w-10 h-10 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
//                         <contact.icon className="w-5 h-5 text-white" />
//                       </div>
//                       <div>
//                         <p className="text-amber-100 group-hover:text-white transition-colors duration-300 font-medium">{contact.text}</p>
//                         <p className="text-xs text-amber-200 mt-1">{contact.subtext}</p>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul> 
//             </div> 
//           </div>
//         </div>

//         {/* Bottom Bar */} 
//         <div className="border-t border-white/20 py-8"> 
//           <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
//             <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
//               <p className="text-sm text-amber-200"> 
//                 © {new Date().getFullYear()} Ibn Sahra Travel & Tours. All rights reserved. 
//               </p>
//             </div>
     
//             {/* Social Media */} 
//             <div className="flex space-x-4"> 
//               {[
//                 { Icon: Facebook, color: "hover:bg-amber-600", label: "Facebook" },
//                 { Icon: Instagram, color: "hover:bg-gradient-to-br hover:from-amber-500 hover:to-yellow-500", label: "Instagram" },
//                 { Icon: Twitter, color: "hover:bg-yellow-600", label: "Twitter" },
//                 { Icon: Youtube, color: "hover:bg-orange-600", label: "YouTube" }
//               ].map((social, index) => (
//                 <Link 
//                   key={index}
//                   href="#" 
//                   className={`w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-amber-100 hover:text-white ${social.color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
//                   title={social.label}
//                 >
//                   <social.Icon size={18} />
//                 </Link>
//               ))}
//             </div> 
//           </div> 
//         </div>
//       </div>

//       {/* Floating Particles */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-40"></div>
//         <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-30 delay-700"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-20 delay-1000"></div>
//         <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-amber-300 rounded-full animate-ping opacity-50 delay-300"></div>
//       </div>
//     </footer> 
//   ); 
// } 
 
// export default Footer;






import Link from "next/link"; 
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";  
import Image from "next/image";

function Footer() { 
  return ( 
    <footer className="relative bg-gradient-to-br from-[#deca99] via-[#CD853F] to-[#A0522D] text-white overflow-hidden"> 
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(180,134,11,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(205,133,63,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16"> 
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"> 
             
            {/* Brand Section */} 
            <div className="lg:col-span-1"> 
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-32 h-28  ">
                  <Image 
                    src="/log.png"
                    alt="Ibn Sahra Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-amber-100">
                    Ibn Sahra
                  </h2>
                  <p className="text-sm text-amber-300">Travel & Tours</p>
                </div>
              </div>
              <p className="text-amber-200 text-sm leading-relaxed mb-8 max-w-xs"> 
                Discover extraordinary destinations with our premium travel experiences. Your journey to unforgettable memories starts here.
              </p>
              
              {/* Trust Indicators */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-amber-300">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-sm">Licensed Travel Agency</span>
                </div>
                <div className="flex items-center space-x-3 text-amber-300">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-sm">10+ Years Experience</span>
                </div>
              </div>
            </div> 

            {/* Quick Links */} 
            <div> 
              <h3 className="text-lg font-semibold mb-6 text-amber-100 border-b border-amber-700 pb-2">
                Quick Links
              </h3> 
              <ul className="space-y-3"> 
                {[
                  { href: "/Destination", text: "Destinations" },
                  { href: "/Packages", text: "Travel Packages" },
                  { href: "/OurTeam", text: "About Our Team" },
                  { href: "#reviews", text: "Reviews" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-amber-200 hover:text-amber-100 duration-300 text-sm block py-1 hover:translate-x-1 transform transition-transform"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul> 
            </div> 
     
            {/* Popular Destinations */} 
            <div> 
              <h3 className="text-lg font-semibold mb-6 text-amber-100 border-b border-amber-700 pb-2">
                Popular Destinations
              </h3> 
              <ul className="space-y-3"> 
                {[
                  { name: "Maldives", rating: "4.9" },
                  { name: "Paris", rating: "4.8" },
                  { name: "Dubai", rating: "4.7" },
                  { name: "Turkey", rating: "4.9" }
                ].map((dest, index) => (
                  <li key={index} className="group cursor-pointer">
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gradient-to-r from-amber-800/20 to-transparent hover:from-amber-700/30 transition-all duration-300">
                      <span className="text-amber-200 text-sm group-hover:text-amber-100 transition-colors">
                        {dest.name}
                      </span>
                      <span className="text-amber-400 text-xs">★ {dest.rating}</span>
                    </div>
                  </li>
                ))}
              </ul> 
            </div> 
     
            {/* Contact Us */} 
            <div> 
              <h3 className="text-lg font-semibold mb-6 text-amber-100 border-b border-amber-700 pb-2">
                Get in Touch
              </h3> 
              <ul className="space-y-4"> 
                {[
                  { 
                    icon: MapPin, 
                    text: "Karachi, Pakistan",
                    subtext: "Office Hours: 9 AM - 6 PM"
                  },
                  { 
                    icon: Phone, 
                    text: "+92 300 1234567",
                    subtext: "24/7 Customer Support"
                  },
                  { 
                    icon: Mail, 
                    text: "info@ibnsahra.com",
                    subtext: "Quick Response Guaranteed"
                  }
                ].map((contact, index) => (
                  <li key={index} className="group">
                    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-amber-800/20 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-700 to-yellow-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <contact.icon className="w-4 h-4 text-amber-100" />
                      </div>
                      <div>
                        <p className="text-amber-200 text-sm font-medium group-hover:text-amber-100 transition-colors">
                          {contact.text}
                        </p>
                        <p className="text-xs text-amber-400 mt-1">{contact.subtext}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul> 
            </div> 
          </div>
        </div>

        {/* Bottom Bar */} 
        <div className="border-t border-amber-700/50 bg-gradient-to-r from-amber-900/50 to-yellow-900/50 backdrop-blur-sm"> 
          <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-amber-300"> 
                © {new Date().getFullYear()} Ibn Sahra Travel & Tours. All rights reserved. 
              </p>
              <p>
              <span className="text-gray-300">Powered By</span>
                <Link href="https://www.linkedin.com/company/targlabs/" target="_blank"  className="text-purple-500 hover:text-purple-400">
                {" "}TargLabs</Link>
               </p>
            </div>
     
            {/* Social Media */} 
            <div className="flex space-x-3"> 
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Youtube, label: "YouTube" }
              ].map((social, index) => (
                <Link 
                  key={index}
                  href="#" 
                  className="w-9 h-9 bg-gradient-to-br from-amber-700 to-yellow-800 rounded-lg flex items-center justify-center text-amber-100 hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  title={social.label}
                >
                  <social.Icon size={16} />
                </Link>
              ))}
            </div> 
          </div> 
        </div>
      </div>
    </footer> 
  ); 
} 
 
export default Footer;