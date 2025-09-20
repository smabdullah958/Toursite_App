"use client"
import React  from 'react'

import PackageMarkAsPaid from "@/Libraries/ReduxToolkit/AsyncThunck/PackagaBookNow/PackageMarkAsPaid"
import { useDispatch} from 'react-redux'


const PackageBookingMarkAsPaidButton = ({id}) => {
    let dispatch=useDispatch()


  return (
<div>
       <button            onClick={()=>dispatch(PackageMarkAsPaid({id}) )} 
             className="px-4 py-2 rounded-lg mt-3 bg-green-500 text-white font-bold shadow-md hover:bg-green-600 transition-all duration-200"    >      ✔ Mark as Paid</button>

    </div>
  )
}

export default PackageBookingMarkAsPaidButton
