import { createBrowserRouter } from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import Landing from "./features/auth/pages/Landing"
import Protected from "./features/auth/components/Protected"
import Dashboard from "./features/home/pages/Dashboard"
import Home from "./features/home/pages/Home"
import UploadPage from "./features/home/pages/UploadPage"
import LibraryPage from "./features/home/pages/LibraryPage"
import AboutPage from "./features/home/pages/AboutPage"
import Pricing from "./features/payment/pages/Pricing"
import Checkout from "./features/payment/pages/Checkout"
import PaymentSuccess from "./features/payment/pages/PaymentSuccess"
import PaymentFailed from "./features/payment/pages/PaymentFailed"
import Account from "./features/payment/pages/Account"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/pricing",
        element: <Pricing />,
    },
    {
        path: "/checkout/:planId",
        element: <Protected><Checkout /></Protected>,
    },
    {
        path: "/payment-success/:sessionId",
        element: <PaymentSuccess />,
    },
    {
        path: "/payment-failed",
        element: <PaymentFailed />,
    },
    {
        path: "/app",
        element: <Protected><Dashboard /></Protected>,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <AboutPage /> },
            { path: "upload", element: <UploadPage /> },
            { path: "songs", element: <LibraryPage /> },
            { path: "account", element: <Account /> },
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

