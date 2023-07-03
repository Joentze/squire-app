import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../firebase/auth/AuthContextWrapper";

interface IProtectedRoute {
  children: React.ReactNode | React.ReactNode[];
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const auth = useAuth();
  return (
    <div className="">
      {auth !== undefined ? <>{children}</> : <Navigate to={"/login"} />}
    </div>
  );
};

export default ProtectedRoute;
