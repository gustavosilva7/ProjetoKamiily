import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ element: React.ComponentType }> = ({
  element: Element,
}) => {
  const tokenAccess = localStorage.getItem("token");
  if (tokenAccess) {
    return <Element />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
