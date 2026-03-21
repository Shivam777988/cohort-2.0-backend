import { createBrowserRouter } from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import Protected from "./features/auth/components/Protected"
import Dashboard from "./features/home/pages/Dashboard"
import Home from "./features/home/pages/Home"
import UploadPage from "./features/home/pages/UploadPage"
import LibraryPage from "./features/home/pages/LibraryPage"
import AboutPage from "./features/home/pages/AboutPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Dashboard /></Protected>,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <AboutPage /> },
            { path: "upload", element: <UploadPage /> },
            { path: "songs", element: <LibraryPage /> },
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
])

