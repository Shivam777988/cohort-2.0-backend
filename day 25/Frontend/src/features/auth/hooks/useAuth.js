import { login, register, getMe, logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, initialized, setInitialized } = context

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            setInitialized(true)
        } catch (error) {
            console.error("Registration failed:", error.message)
            throw error // Re-throw so components can handle it
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ username, email, password }) {
        setLoading(true)
        try {
            const data = await login({ username, email, password })
            setUser(data.user)
            setInitialized(true)
        } catch (error) {
            console.error("Login failed:", error.message)
            throw error // Re-throw so components can handle it
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMe() {
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            // If getMe fails (401), user is not authenticated
            setUser(null)
            console.log("User not authenticated:", error.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            setInitialized(false)
        } catch (error) {
            console.error("Logout failed:", error.message)
            // Still set user to null even if logout API fails
            setUser(null)
            setInitialized(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!initialized) {
            setInitialized(true)
            handleGetMe()
        } else if (user) {
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [initialized])

    return ({
        user, loading, handleRegister, handleLogin, handleLogout, handleGetMe
    })
}