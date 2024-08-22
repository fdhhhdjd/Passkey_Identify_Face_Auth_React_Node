import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.URL_API}/api/auth/login`,
        { email, password },
        { withCredentials: true } // This is the equivalent of fetch's credentials: 'include'
      );

      const data = response.data;
      if (response.status === 200) {
        if (data.mfaRequired) {
          navigate("/mfa"); // Adjust the URL as needed for your routing setup
          console.log("Redirecting to MFA page as it is required.");
        } else {
          console.log("Login successful:", data);
          localStorage.setItem("userId", data.metadata.id);
          localStorage.setItem("userEmail", data.metadata.email);
          toast.success("Login successful");
          return true;
        }
      } else {
        console.error("Login failed:", data.message);
        setError(data.message);
        toast.error("Login failed");
        return false;
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
      toast.error("Operation failed!", {
        description: "There was an error.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, isLoading, error };
};

export default useLogin;
