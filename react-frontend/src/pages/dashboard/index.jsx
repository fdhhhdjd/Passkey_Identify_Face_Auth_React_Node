import axios from "axios";
import { create } from "@github/webauthn-json";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/button";
import { toast } from "sonner";
import React from "react";
import { clearAllLocalStorage, clearToken } from "@/helpers/localstorage";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.URL_API}/api/auth/logout`,
        {
          withCredentials: true, // Important: Include credentials
        }
      );
      if (response.status === 200) {
        console.log("Logout successful:", response.data);
        clearToken("userEmail");
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const registerPasskey = async () => {
    try {
      const createOptionsResponse = await axios.post(
        `${process.env.URL_API}/api/passkey/register`,
        { start: true, finish: false, credential: null },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Important: Include credentials
        }
      );

      const { metadata: createOptions } = createOptionsResponse.data;
      console.log("createOptions", createOptions);

      const credential = await create(createOptions);
      console.log(credential);

      const response = await axios.post(
        `${process.env.URL_API}/api/passkey/register`,
        { start: false, finish: true, credential },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Important: Include credentials
        }
      );

      if (response.status === 200) {
        toast.success("Registered passkey successfully!");
      }
    } catch (error) {
      console.error("Error registering passkey:", error);
    }
  };

  const registerMfaPasskey = async () => {
    try {
      const createOptionsResponse = await axios.post(
        `${process.env.URL_API}/api/passkey/mfa/register`,
        { start: true, finish: false, credential: null },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Important: Include credentials
        }
      );

      const { metadata: createOptions } = createOptionsResponse.data;

      const credential = await create(createOptions);

      const response = await axios.post(
        `${process.env.URL_API}/api/passkey/mfa/register`,
        { start: false, finish: true, credential },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Important: Include credentials
        }
      );

      if (response.status === 200) {
        toast.success("Registered MFA passkey successfully!");
      }
    } catch (error) {
      console.error("Error registering MFA passkey:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Dashboard
        </h1>

        <div className="mb-6">
          <p className="text-center text-gray-600 text-lg">
            User:{" "}
            <span className="font-semibold text-gray-800">
              {localStorage.getItem("userEmail") || "None"}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 rounded-lg px-6 py-3 text-lg font-medium shadow-md hover:shadow-lg"
            >
              Logout
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={registerPasskey}
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg px-6 py-3 text-lg font-medium shadow-md hover:shadow-lg"
            >
              Register a new passkey
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={registerMfaPasskey}
              className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 rounded-lg px-6 py-3 text-lg font-medium shadow-md hover:shadow-lg"
            >
              Enable MFA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
