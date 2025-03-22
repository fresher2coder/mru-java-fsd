import React, { useState, useEffect } from "react";
import axios from "axios";

const users = ["Dinesh", "Divya", "Darwin"]; // Simulating available users

const ChatComponent = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (currentUser && selectedUser) {
      const newSocket = new WebSocket(
        `ws://localhost:8080/chat?user=${currentUser}`
      );
      newSocket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, receivedMessage]);
      };
      setSocket(newSocket);

      axios
        .get("http://localhost:8080/api/chat/messages")
        .then((response) =>
          setMessages(
            response.data.filter(
              (msg) =>
                (msg.sender === currentUser && msg.receiver === selectedUser) ||
                (msg.sender === selectedUser && msg.receiver === currentUser)
            )
          )
        )
        .catch((error) => console.error("Error loading messages", error));

      return () => newSocket.close();
    }
  }, [currentUser, selectedUser]);

  const sendMessage = () => {
    if (message.trim() === "" || !socket) return;

    const chatMessage = {
      sender: currentUser,
      receiver: selectedUser,
      content: message,
    };
    socket.send(JSON.stringify(chatMessage));

    axios
      .post("http://localhost:8080/api/chat/send", chatMessage)
      .catch((error) => console.error("Error saving message", error));

    setMessage("");
  };

  return (
    <div>
      <h2>Select Your Name</h2>
      <select
        onChange={(e) => setCurrentUser(e.target.value)}
        value={currentUser}
      >
        <option value="">-- Select --</option>
        {users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>

      {currentUser && (
        <>
          <h2>Chat with:</h2>
          {users
            .filter((user) => user !== currentUser)
            .map((user) => (
              <button key={user} onClick={() => setSelectedUser(user)}>
                Chat with {user}
              </button>
            ))}
        </>
      )}

      {selectedUser && (
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "10px",
            width: "300px",
          }}
        >
          <h3>Chat with {selectedUser}</h3>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === currentUser ? "right" : "left",
                  backgroundColor:
                    msg.sender === currentUser ? "#DCF8C6" : "#EAEAEA",
                  padding: "5px",
                  margin: "5px",
                  borderRadius: "5px",
                }}
              >
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
