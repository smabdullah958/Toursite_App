"use client"
import React, { useEffect } from 'react'

import DestinationBookingUpdateThunck from "@/Libraries/ReduxToolkit/AsyncThunck/DestinationBookNow/UpdateBooking"
import { useDispatch, useSelector} from 'react-redux'


const DestinationBookingUpdateButton = ({id}) => {
    let dispatch=useDispatch()


  return (
<div>
       <button onClick={()=>dispatch(DestinationBookingUpdateThunck({id}) )} 
             className="px-4 py-2 rounded-lg mt-3 bg-green-500 text-white font-bold shadow-md hover:bg-green-600 transition-all duration-200"    >      ✔ Mark as Paid</button>

    </div>
  )
}

export default DestinationBookingUpdateButton
