import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'


const Protected = ({ children }) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center text-white overflow-hidden">
                {/* Decorative gradient orbs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

                <div className="flex flex-col items-center gap-6">
                    {/* Logo */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse">
                        <span className="text-3xl font-bold text-white">P</span>
                    </div>

                    {/* Loading spinner */}
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-2 border-slate-700"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-cyan-500 animate-spin"></div>
                    </div>

                    {/* Loading text */}
                    <div className="text-center">
                        <p className="text-lg font-semibold text-white mb-2">Loading Cortex AI</p>
                        <p className="text-sm text-slate-400">Please wait while we prepare your workspace...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }


    return children
}

export default Protected