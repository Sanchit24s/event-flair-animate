import apiClient from "@/api/apiClient";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                setIsAuth(false);
                return;
            }

            try {
                const res = await apiClient.get("/auth/protected", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 200) {
                    setIsAuth(true);
                }
            } catch (error) {
                setIsAuth(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuth === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-200">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-navy font-medium text-lg">Checking authentication...</p>
                </div>
            </div>
        );
    }
    if (!isAuth) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
