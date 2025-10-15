import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("tokenChange", handleStorageChange);
  }, []);
  if (token == "admin123") {
    return children;
  } else {
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        Access Denied: No Token Found
      </h2>
    );
  }
};

export default ProtectedRoute;
