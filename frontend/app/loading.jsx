import React from 'react'

const Loader = () => {
  return (
        <div className="flex justify-center items-center h-screen bg-yellow-100">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin 3xl:w-24 3xl:h-24"></div>
    </div>

  )
}

export default Loader
