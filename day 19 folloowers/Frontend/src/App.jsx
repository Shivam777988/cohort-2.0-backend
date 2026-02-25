import { useState } from 'react'

import AppRoutes from './AppRoutes'
import "./style.scss"
import { AuthProvider } from './features/auth.context'
function App() {


  return (
    <>
    <AuthProvider> <AppRoutes/>
    </AuthProvider>
     
   
    </>
  )
}

export default App
