import { Button } from "@/components/common/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import useLogin from "@/hooks/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "@github/webauthn-json";
import axios from "axios";
import IdentifyFace from "../identifyFace";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await loginUser(email, password);
    if (success) {
      navigate("/");
    }
  };

  const signInWithMfaPasskey = async () => {
    try {
      const createOptionsResponse = await axios.post(
        `${process.env.URL_API}/api/auth/mfa/passkey/login`,
        {
          start: true,
          finish: false,
          options: null,
          id: localStorage.getItem("userId"),
        },
        { withCredentials: true }
      );

      const { metadata: loginOptions } = createOptionsResponse.data;

      const options = await get(loginOptions);

      const response = await axios.post(
        `${process.env.URL_API}/api/auth/mfa/passkey/login`,
        {
          start: false,
          finish: true,
          options,
          id: localStorage.getItem("userId"),
        },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.status === 200) {
        console.log("user logged in with passkey", data);
        localStorage.setItem("userId", data.metadata.id);
        localStorage.setItem("userEmail", data.metadata.email);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during MFA passkey login", error);
    }
  };

  const signInWithPasskey = async () => {
    try {
      const createOptionsResponse = await axios.post(
        `${process.env.URL_API}/api/auth/passkey/login`,
        {
          start: true,
          finish: false,
          options: null,
        },
        { withCredentials: true }
      );

      const { metadata: loginOptions } = createOptionsResponse.data;
      const options = await get(loginOptions);

      const response = await axios.post(
        `${process.env.URL_API}/api/auth/passkey/login`,
        {
          start: false,
          finish: true,
          options,
        },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.status === 200) {
        console.log("user logged in with passkey", data);
        localStorage.setItem("userId", data.metadata.id);
        localStorage.setItem("userEmail", data.metadata.email);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during passkey login", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <CardHeader className="border-b border-gray-200 pb-4 mb-4">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-600">
            Choose your preferred sign-in method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Email
              </Label>
              <Input
                id="email"
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <Button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
              loading={isLoading}
            >
              Sign in with Email
            </Button>
          </form>
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase text-gray-600">
              <span className="bg-gray-50 px-2">Or continue with</span>
            </div>
          </div>
          <Button
            className="mt-4 w-full bg-purple-500 text-white hover:bg-purple-600"
            onClick={signInWithPasskey}
          >
            Sign in with a Passkey
          </Button>
          <Button
            className="mt-4 w-full bg-green-500 text-white hover:bg-green-600"
            onClick={signInWithMfaPasskey}
          >
            Sign in with MFA Passkey
          </Button>
          <IdentifyFace />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
