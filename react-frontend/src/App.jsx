import { Outlet } from "react-router-dom";
import Title from "@/components/common/title";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/common/sonner";

const App = () => {
  return (
    <HelmetProvider>
      <Title />
      <Toaster />
      <Outlet />
    </HelmetProvider>
  );
};

export default App;
