import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.URL_API}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        if (data.mfaRequired) {
          navigate("/mfa"); // Adjust the URL as needed for your routing setup
          console.log("Redirecting to MFA page as it is required.");
        } else {
          console.log("Login successful:", data);
          localStorage.setItem("userId", data.metadata.id);
          return true;
        }
      } else {
        console.error("Login failed:", data.message);
        setError(data.message);
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, isLoading, error };
};

export default useLogin;
