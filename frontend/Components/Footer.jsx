import Link from "next/link"; 
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";  
import Image from "next/image";

//custom tiktok 
const TikTokIcon = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);


function Footer() { 
  return ( 
    <footer className="relative bg-gradient-to-br from-[#deca99] via-[#CD853F] to-[#A0522D] text-white overflow-hidden"> 
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(180,134,11,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(205,133,63,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative z-10">
        <div className="max-w-full mx-auto px-6 sm:py-5 xl:py-10 2xl:py-16">  
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
                  <span className="text-sm">10+ Years</span>
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
                    text: "+971 54 588 9671",
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
          <div className="max-w-full mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
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
                { Icon: Facebook, label: "Facebook",link:"https://www.facebook.com/desertwanderlustuae?mibextid=wwXIfr&rdid=3Oc7RqOj03L2mY8O&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CrBDyFsdz%2F%3Fmibextid%3DwwXIfr#"},

                { Icon: Instagram, label: "Instagram" ,link:"https://www.instagram.com/ibnsahratravels/?igsh=NHM4eXM2cG1kMGd2&utm_source=qr#"},

                { Icon: TikTokIcon, label: "TikTok" ,link:"https://www.tiktok.com/@ibnsahratravels"}
              ].map((social, index) => (
                <Link 
                  key={index}
                  target="_blank"
                  href={`${social.link}`}
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