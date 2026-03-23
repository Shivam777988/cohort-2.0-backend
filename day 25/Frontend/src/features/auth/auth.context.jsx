import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ initialized, setInitialized ] = useState(false)

    // Only check authentication once on app start
    useEffect(() => {
        if (!initialized) {
            // This will be handled by useAuth hook
            setInitialized(true)
        }
    }, [initialized])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, initialized, setInitialized }} >
            {children}
        </AuthContext.Provider>
    )

}