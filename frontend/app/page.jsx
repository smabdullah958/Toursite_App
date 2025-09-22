import GetSixDestination from '@/Components/GetSixDestination'
import React from 'react'
import HeroSection from '@/Components/HeroSection'
import GetSixPackages from '@/Components/GetSixPackages'
import Footer from '@/Components/Footer'
import Testimonials from '@/Components/whatOurClientSay'
const HomePage = () => {
  return (
    <div>
    {/* //inside hero section it has a login nad logout button */}
<HeroSection/>
<GetSixDestination/>
<GetSixPackages/>
<Testimonials/>
<Footer/>

    </div>
  )
}

export default HomePage
