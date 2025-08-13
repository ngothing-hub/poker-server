import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://tovchoo-poker2.onrender.com");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setMessages((prev) => [...prev, `Connected as ${socket.id}`]);
    });

    socket.on("disconnect", () => {
      setMessages((prev) => [...prev, "Disconnected"]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Poker Client Demo</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
