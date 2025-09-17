"use client"
import { store } from '@/Libraries/ReduxToolkit/Store'
import React from 'react'
import { Provider } from 'react-redux'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise=loadStripe(process.env.NEXT_PUBLIC_Publishable_Key)

const StoreProvider = ({children}) => {
  return (
    <div>
      <Provider store={store}>
       <Elements stripe={stripePromise}>
        {children}
   </Elements>
      </Provider>
    </div>
  )
}

export default StoreProvider
