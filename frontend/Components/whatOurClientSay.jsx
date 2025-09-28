
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
//     <section className="bg-gray-50 py-16">
//       <div className="container mx-auto px-6 text-center">
//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
//           What Our Travelers Say
//         </h2>
//         <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
//           Hear from our happy travelers who explored the world with TouristApp.
//         </p>

//         {/* Testimonials Grid */}
//         <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
//           {testimonials.map((t, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded-xl p-6 text-left border border-gray-100
//               hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
//             >
//               {/* User Info */}
//               <div className="mb-4">
//             <div className="flex gap-2 items-center">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold text-lg">
//                   {t.name.charAt(0)}
//                 </div>
//                 <h4 className="font-semibold text-blue-900 text-lg">{t.name}</h4>
//                </div>
//                 <p className="text-sm text-yellow-600">{t.role}</p>
//               </div>

//               {/* Feedback */}
//               <p className="text-gray-600 text-sm leading-relaxed italic">
//                 “{t.feedback}”
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
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
  {
    name: "Zain",
    role: "Travel Blogger",
    feedback:
      "The best web application for finding hidden gems and travel deals. I discovered Sydney in a whole new way!",
  },
  {
    name: "John Smith",
    role: "Adventure Seeker",
    feedback:
      "The best app for finding hidden gems and travel deals. I discovered Turkey in a whole new way!",
  },
];

function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-16" id="reviews">
      <div className="container max-w-screen mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
          What Our Travelers Say
        </h2>
        <p className="text-amber-700 mt-3 max-w-2xl mx-auto">
          Hear from our happy travelers who explored the world with TouristApp.
        </p>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-left border border-amber-100
              hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
            >
              {/* User Info */}
              <div className="mb-4">
            <div className="flex gap-2 items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-900 font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <h4 className="font-semibold text-amber-900 text-lg">{t.name}</h4>
               </div>
                <p className="text-sm text-yellow-600">{t.role}</p>
              </div>

              {/* Feedback */}
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{t.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;