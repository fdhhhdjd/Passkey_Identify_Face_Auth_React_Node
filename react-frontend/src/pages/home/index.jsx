import React, { startTransition } from "react";
import { useFetcher, useLoaderData, useRevalidator } from "react-router-dom";

const Home = () => {
  const data = useLoaderData();
  const revalidator = useRevalidator();
  const fetcher = useFetcher();

  React.useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 5000);

    return () => clearInterval(interval);
  }, [revalidator]);

  const handleManualFetch = () => {
    startTransition(() => {
      revalidator.revalidate();
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        <b>Todo ID:</b>
        {revalidator.state === "loading" ? "...Loading" : data.id}
      </p>
      <p>
        <b>Title:</b>
        {revalidator.state === "loading" ? "...Loading" : data.title}
      </p>
      <p>
        <b>Completed:</b>
        {revalidator.state === "loading"
          ? "...Loading"
          : data.completed
          ? "Yes"
          : "No"}
      </p>

      <button onClick={handleManualFetch}>Fetch Todo ID 2</button>

      {fetcher.state === "loading" && <p>Loading new data...</p>}
      {fetcher.data && (
        <div>
          <h2>Fetched Data</h2>
          <p>
            <b>Todo ID:</b> {fetcher.data.id}
          </p>
          <p>
            <b>Title:</b> {fetcher.data.title}
          </p>
          <p>
            <b>Completed:</b> {fetcher.data.completed ? "Yes" : "No"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
