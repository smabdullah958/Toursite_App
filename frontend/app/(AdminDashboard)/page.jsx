// import LogIn from '@/Components/Buttons/LogIn'
// import LogOut from '@/Components/Buttons/LogOut'
// import React from 'react'
// const HomePage = () => {
//   return (
//     <div>
//       <div className="md:hidden flex justify-end m-5 mt-2">

   
//       <LogOut/><LogIn/>
//           </div>
//     </div>
//   )
// }

// export default HomePage


import GetSixDestination from '@/Components/GetSixDestination'
import React from 'react'
import HeroSection from '@/Components/HeroSection'
const HomePage = () => {
  return (
    <div>
    {/* //inside hero section it has a login nad logout button */}
<HeroSection/>
<GetSixDestination/>

    </div>
  )
}

export default HomePage
