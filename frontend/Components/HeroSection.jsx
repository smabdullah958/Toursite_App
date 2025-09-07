
'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LogIn from './Buttons/LogIn';
import LogOut from './Buttons/LogOut';
import Link from 'next/link';
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const Images = [
    {
      img: "/t1.avif",
      title: "Discover Paradise",
      subtitle: "Explore the world's most breathtaking destinations"
    },
    {
      img: "/t2.webp", 
      title: "Adventure Awaits",
      subtitle: "Create memories that will last a lifetime"
    },
    {
      img: "/t3.png",
      title: "Journey Beyond",
      subtitle: "Experience the beauty of diverse cultures"
    },
    {
      img: "/t4.jpeg",
      title: "Explore More",
      subtitle: "Uncover hidden gems around the globe"
    },
    {
      img: "/t5.jpeg",
      title: "Dream Destinations",
      subtitle: "Where every moment becomes a story"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [Images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Login/Logout buttons - positioned at top right */}
      <div className="absolute top-4 right-4 z-40 md:hidden">
           <div className="md:hidden flex justify-end">
              <LogOut/><LogIn/>
                  </div>
      </div>

      {/* Background Images */}
      {Images.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="w-full h-full object-cover"       />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {Images[currentSlide].title}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {Images[currentSlide].subtitle}
          </p>

          <Link href="/Destination" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Explore Now
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {Images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;