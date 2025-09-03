"use client"
import { store } from '@/Libraries/ReduxToolkit/Store'
import React from 'react'
import { Provider } from 'react-redux'
const StoreProvider = ({children}) => {
  return (
    <div>
      <Provider store={store}>
        {children}
      </Provider>
    </div>
  )
}

export default StoreProvider
