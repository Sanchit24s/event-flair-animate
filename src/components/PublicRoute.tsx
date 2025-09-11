import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("authToken");

    if (token) {
        // If logged in, redirect to dashboard (or homepage)
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
