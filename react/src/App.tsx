import React, { useEffect, useState } from "react";
import "./App.css";
import { SuperblocksEmbed } from "@superblocksteam/embed-react";

function App() {
  const [token, setToken] = useState(null);
  const [customerId, setCustomerId] = useState("");
  const [properties, setProperties] = useState({ customerId });
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/superblocks/token"
        );
        if (response.ok) {
          const data = await response.json();
          console.log("DATA IS ", data);
          setToken(data.access_token);
        } else {
          // Handle empty or invalid responses here
          console.error("Response was not OK or was empty", response);
        }
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    };
    fetchToken();
  }, []);
  return (
    <div className="App">
      <header className="App-header">Superblocks Embedding Example</header>
      <div className="App-body">
        <div className="input-row">
          <input
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <button onClick={() => setProperties({ customerId })}>
            Set Customer ID
          </button>
        </div>
        <div className="embed-wrapper">
          {token == null ? (
            "Loading..."
          ) : (
            <SuperblocksEmbed
              src="YOUR_APP_EMBED_URL_HERE"
              properties={properties}
              token={token}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
