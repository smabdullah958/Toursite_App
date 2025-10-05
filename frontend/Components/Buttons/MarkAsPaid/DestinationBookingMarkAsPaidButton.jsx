"use client"
import React  from 'react'

import DestinationMarkAsPaid from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/DestinationMarkAsPaid"
import { useDispatch} from 'react-redux'


const DestinationBookingMarkAsPaidButton = ({id}) => {
    let dispatch=useDispatch()


  return (
<div>
       <button            onClick={()=>dispatch(DestinationMarkAsPaid({id}) )} 
             className="px-4 py-2 rounded-lg mt-3 bg-yellow-500 text-white font-bold shadow-md hover:bg-yellow-600 transition-all duration-200"    >      ✔ Mark as Paid</button>

    </div>
  )
}

export default DestinationBookingMarkAsPaidButton
