import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import { useAuth } from './features/auth/hooks/useAuth'
import Feed from './features/posts/pages/Feed';

function AppRoutes() {
const{user}=useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                 <Route
  path="/"
  element={<Feed/>}
/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes


