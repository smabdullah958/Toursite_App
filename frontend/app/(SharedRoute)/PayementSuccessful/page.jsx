//if payement is stripe and it is recive successful than it will display this route
import React from 'react'

const PayementSuccessful = () => {
  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
        <p className="mt-4 text-lg">Thank you for your booking.</p>
</div>
</div>
  )
}

export default PayementSuccessful
