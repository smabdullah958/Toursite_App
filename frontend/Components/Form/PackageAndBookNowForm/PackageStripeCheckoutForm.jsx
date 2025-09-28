"use client"

import Loader from '@/Components/Loader'
import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSelector } from 'react-redux'

const StripeCheckoutForm = ({ clientSecret, onSuccess,bookingId }) => {

    const { Name, Email } = useSelector((state) => state.CheckLogInSlice)


  let route=useRouter()


  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const HandleButton = async (e) => {
    if (!stripe || !elements) return

    setLoading(true)
    setError("")

    const cardElement = elements.getElement(CardElement)

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement,
        billing_details:{
          name:Name,
          email:Email
        }
       },
    })



    if (error) {
      setError(error.message)
      setLoading(false)
    } else if (paymentIntent.status === "succeeded") {
      
      await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/PackageBooking/payment/success`,
       { bookingId},
        {withCredentials:true}
)
      
      onSuccess(paymentIntent)

           route.push("/PayementSuccessful")

      setLoading(false)
    }
  }

  return (
    <form className="space-y-4">
      {/* Card input */}
      <div className="border p-3 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Pay button */}
      <button
        onClick={HandleButton}
        disabled={loading || !stripe}
        className={`px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 duration-500 transition-all
        ${loading ?  "opacity-70 cursor-not-allowed" : "hover:scale-105"}`}
      >
        {loading ? <Loader /> : "Pay Now"}
      </button>
    </form>
  )
}

export default StripeCheckoutForm
