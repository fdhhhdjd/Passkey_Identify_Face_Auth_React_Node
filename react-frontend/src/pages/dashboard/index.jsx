import { create } from "@github/webauthn-json";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/button";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.URL_API}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Logout successful:", data);
        navigate("/login");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const registerPasskey = async () => {
    const createOptionsResponse = await fetch(
      `${process.env.URL_API}/api/passkey/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ start: true, finish: false, credential: null }),
      }
    );

    const { metadata: createOptions } = await createOptionsResponse.json();
    console.log("createOptions", createOptions);

    const credential = await create(createOptions);
    console.log(credential);

    const response = await fetch(
      `${process.env.URL_API}/api/passkey/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ start: false, finish: true, credential }),
      }
    );
    console.log(response);

    if (response.ok) {
      toast.success("Registered passkey successfully!");
    }
  };

  const registerMfaPasskey = async () => {
    const createOptionsResponse = await fetch(
      "http://localhost:5001/api/passkeys/mfa/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ start: true, finish: false, credential: null }),
      }
    );

    const { createOptions } = await createOptionsResponse.json();
    console.log("createOptions", createOptions);

    const credential = await create(createOptions);
    console.log(credential);

    const response = await fetch(
      "http://localhost:5001/api/passkeys/mfa/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ start: false, finish: true, credential }),
      }
    );
    console.log(response);

    if (response.ok) {
      toast.success("Registered MFA passkey successfully!");
    }
  };

  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <div>
        <Button
          onClick={registerPasskey}
          className="flex justify-center items-center space-x-2 mt-8"
        >
          Register a new passkey
        </Button>
      </div>
      <div>
        <Button
          onClick={registerMfaPasskey}
          className="flex justify-center items-center space-x-2 mt-8"
        >
          Enable MFA
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
