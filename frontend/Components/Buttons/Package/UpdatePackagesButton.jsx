// "use client"
// import React from 'react'
// import { useDispatch } from 'react-redux'
// import {DisplayPackageForm} from '@/Libraries/ReduxToolkit/Slices/Packages/UpdateSlice'

// const UpdatePackages = ({id}) => {
//     let dispatch=useDispatch()
//   return (
//     <div>
//       <button onClick={()=>dispatch(DisplayPackageForm(id))}
//        className="px-6 py-2 rounded-xl  bg-gradient-to-r from-[#3fb7eb] to-[#23a4dc] text-white font-semibold shadow-lg  transition-all duration-500 transform hover:scale-105 active:scale-95 mr-5 opacity-100 hover:from-[#0693cf] hover:to-[#0f94cd]">
//        Update</button>
//     </div>
//   )
// }

// export default UpdatePackages







"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import {DisplayPackageForm} from '@/Libraries/ReduxToolkit/Slices/Packages/UpdateSlice'

const UpdatePackages = ({id}) => {
    let dispatch=useDispatch()
  return (
    <div>
      <button 
        onClick={()=>dispatch(DisplayPackageForm(id))}
        className="group relative text-white font-bold px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 
         hover:from-amber-500 hover:to-yellow-500 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 transform hover:from-amber-500 hover:to-yellow-500 hover:scale-105 hover:shadow-xl mr-5 overflow-hidden"
      >
        <span className="relative z-10">Update</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%]"></span>
      </button>
    </div>
  )
}

export default UpdatePackages