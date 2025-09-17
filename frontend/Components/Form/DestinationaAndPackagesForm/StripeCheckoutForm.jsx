"use client"

import Loader from '@/Components/Loader'
import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const StripeCheckoutForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const HandleButton = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError("")

    const cardElement = elements.getElement(CardElement)

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement,
        billing_details:{
          name:"abdullah",
          email:"abdullah@gmail.com"
        }
       },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else if (paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent)

      alert("✅ Payment Success: " + JSON.stringify(paymentIntent, null, 2))

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
        className={`px-6 py-2 rounded-lg text-white font-semibold 
        ${loading ? "bg-indigo-300 opacity-50" : "bg-indigo-500 hover:bg-indigo-600"}`}
      >
        {loading ? <Loader /> : "Pay Now"}
      </button>
    </form>
  )
}

export default StripeCheckoutForm
