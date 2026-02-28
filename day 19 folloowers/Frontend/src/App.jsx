import { useState } from 'react'

import AppRoutes from './AppRoutes'
import "./features/shared/style.scss"
import { AuthProvider } from './features/auth.context'
import { PostContextProvider } from './features/posts/post.context'

function App() {


  return (
    <>
    <AuthProvider> 
      <PostContextProvider> <AppRoutes/>
      </PostContextProvider>
     
    </AuthProvider>
     
   
    </>
  )
}

export default App
