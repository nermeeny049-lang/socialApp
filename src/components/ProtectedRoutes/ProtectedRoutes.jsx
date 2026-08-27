import { useContext } from "react";
import { Navigate } from "react-router";
import { userContext } from "../../context/UserContext";
export default function ProtectedRoutes({ children }) {
  const { token } = useContext(userContext);
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
