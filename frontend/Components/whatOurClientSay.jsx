// // "use client";

// // const testimonials = [
// //   {
// //     name: "Ali Khan",
// //     role: "Traveler",
// //     feedback:
// //       "TouristApp made my Maldives trip unforgettable! Everything was smooth, from booking to the actual experience.",
// //   },
// //   {
// //     name: "Sarah Ahmed",
// //     role: "Adventure Seeker",
// //     feedback:
// //       "I loved the packages for Dubai! The team was supportive and guided me at every step. Highly recommended!",
// //   },
// //   {
// //     name: "John Smith",
// //     role: "Travel Blogger",
// //     feedback:
// //       "The best app for finding hidden gems and travel deals. I discovered Turkey in a whole new way!",
// //   },
// // ];

// // function Testimonials() {
// //   return (
// //     <section className="bg-gray-100 py-16">
// //       <div className="container mx-auto px-6 text-center">
// //         {/* Heading */}
// //         <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
// //           What Our Travelers Say
// //         </h2>
// //         <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
// //           Hear from our happy travelers who explored the world with TouristApp.
// //         </p>

// //         {/* Testimonials Grid */}
// //         <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
// //           {testimonials.map((t, index) => (
// //             <div
// //               key={index}
// //               className="bg-white shadow-lg rounded-2xl p-6 text-left hover:shadow-xl transition duration-300"
// //             >
// //               {/* User Info */}
// //               <div className="flex items-center gap-4 mb-4">
// //                 <div>
// //                   <h4 className="font-semibold text-blue-900">{t.name}</h4>
// //                   <p className="text-sm text-gray-500">{t.role}</p>
// //                 </div>
// //               </div>

// //               {/* Feedback */}
// //               <p className="text-gray-600 text-sm leading-relaxed">
// //                 "{t.feedback}"
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // export default Testimonials;

// "use client";

// const testimonials = [
//   {
//     name: "Ali Khan",
//     role: "Traveler",
//     feedback:
//       "TouristApp made my Maldives trip unforgettable! Everything was smooth, from booking to the actual experience.",
//   },
//   {
//     name: "Sarah Ahmed",
//     role: "Adventure Seeker",
//     feedback:
//       "I loved the packages for Dubai! The team was supportive and guided me at every step. Highly recommended!",
//   },
//   {
//     name: "John Smith",
//     role: "Travel Blogger",
//     feedback:
//       "The best app for finding hidden gems and travel deals. I discovered Turkey in a whole new way!",
//   },
// ];

// function Testimonials() {
//   return (
//     <section className="bg-gradient-to-b from-gray-100 to-gray-50 py-16">
//       <div className="container mx-auto px-6 text-center">
//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 animate-fade-in-down">
//           What Our Travelers Say
//         </h2>
//         <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg animate-fade-in-up">
//           Hear from our happy travelers who explored the world with TouristApp.
//         </p>

//         {/* Testimonials Grid */}
//         <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {testimonials.map((t, index) => (
//             <div
//               key={index}
//               className="relative bg-white shadow-lg rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
//               style={{ animationDelay: `${index * 0.2}s` }}
//             >
//               {/* Decorative Quote Icon */}
//               <span className="absolute top-4 left-4 text-blue-200 text-4xl opacity-50">“</span>
              
//               {/* User Info */}
//               <div className="flex items-center gap-4 mb-4 relative z-10">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-lg">
//                   {t.name.charAt(0)}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-blue-900">{t.name}</h4>
//                   <p className="text-sm text-gray-500">{t.role}</p>
//                 </div>
//               </div>

//               {/* Feedback */}
//               <p className="text-gray-600 text-sm leading-relaxed relative z-10">
//                 "{t.feedback}"
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Inline CSS for Animations */}
//       <style jsx>{`
//         @keyframes fadeInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fade-in-down {
//           animation: fadeInDown 0.6s ease-out forwards;
//         }
//         .animate-fade-in-up {
//           animation: fadeInUp 0.6s ease-out forwards;
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.6s ease-out forwards;
//         }
//       `}</style>
//     </section>
//   );
// }

// export default Testimonials;


"use client";

const testimonials = [
  {
    name: "Ali Khan",
    role: "Traveler",
    feedback:
      "TouristApp made my Maldives trip unforgettable! Everything was smooth, from booking to the actual experience.",
  },
  {
    name: "Sarah Ahmed",
    role: "Adventure Seeker",
    feedback:
      "I loved the packages for Dubai! The team was supportive and guided me at every step. Highly recommended!",
  },
  {
    name: "John Smith",
    role: "Travel Blogger",
    feedback:
      "The best app for finding hidden gems and travel deals. I discovered Turkey in a whole new way!",
  },
];

function Testimonials() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          What Our Travelers Say
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Hear from our happy travelers who explored the world with TouristApp.
        </p>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-left border border-gray-100
              hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
            >
              {/* User Info */}
              <div className="mb-4">
            <div className="flex gap-2 items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <h4 className="font-semibold text-blue-900 text-lg">{t.name}</h4>
               </div>
                <p className="text-sm text-yellow-600">{t.role}</p>
              </div>

              {/* Feedback */}
              <p className="text-gray-600 text-sm leading-relaxed italic">
                “{t.feedback}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
