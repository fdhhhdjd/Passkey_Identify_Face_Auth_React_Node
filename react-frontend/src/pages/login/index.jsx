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
    const createOptionsResponse = await fetch(
      `${process.env.URL_API}/api/auth/mfa/passkey/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          start: true,
          finish: false,
          options: null,
          id: localStorage.getItem("userId"),
        }),
      }
    );

    const { metadata: loginOptions } = await createOptionsResponse.json();
    const options = await get(loginOptions);

    const response = await fetch(
      `${process.env.URL_API}/api/auth/mfa/passkey/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          start: false,
          finish: true,
          options,
          id: localStorage.getItem("userId"),
        }),
      }
    );
    const data = await response.json();

    if (data.status === 200) {
      console.log("user logged in with passkey", data);
      navigate("/");
    }
  };

  const signInWithPasskey = async () => {
    const createOptionsResponse = await fetch(
      `${process.env.URL_API}/api/auth/passkey/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          start: true,
          finish: false,
          options: null,
        }),
      }
    );

    const { metadata: loginOptions } = await createOptionsResponse.json();
    const options = await get(loginOptions);

    const response = await fetch(
      `${process.env.URL_API}/api/auth/passkey/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          start: false,
          finish: true,
          options,
        }),
      }
    );
    const data = await response.json();

    if (data.status === 200) {
      console.log("user logged in with mfa passkey", data);
      navigate("/");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input
              id="email"
              required
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Label>Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button type="submit" className="mt-4 w-full" loading={isLoading}>
              Sign in with Email
            </Button>
          </form>
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button className="mt-4 w-full" onClick={signInWithPasskey}>
            Sign in with a Passkey
          </Button>
          <Button className="mt-4 w-full" onClick={signInWithMfaPasskey}>
            Sign in with a MFA Passkey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
