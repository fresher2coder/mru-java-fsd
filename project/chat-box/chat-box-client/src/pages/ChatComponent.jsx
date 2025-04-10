import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { Rnd } from "react-rnd";

const ChatContainer = styled.div`
  width: 400px;
  margin: auto;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const UserDropdown = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ChatBox = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`;

const ChatHeader = styled.div`
  background: #007bff;
  color: white;
  padding: 10px;
  cursor: grab;
  display: flex;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  position: relative;
`;

const NotificationDot = styled.span`
  background: red;
  color: white;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  font-size: 10px;
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  right: 40px;
`;

const CloseButton = styled.button`
  background: red;
  border: none;
  color: white;
  padding: 5px;
  cursor: pointer;
  border-radius: 50%;
`;

const ChatBody = styled.div`
  max-height: 250px;
  overflow-y: auto;
  padding: 10px;
`;

const MessageInput = styled.input`
  width: 70%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SendButton = styled.button`
  width: 25%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatComponent = () => {
  const { state } = useAuth();
  const [users, setUsers] = useState([]);
  const [openChats, setOpenChats] = useState([]);
  const [sockets, setSockets] = useState({});
  const [messages, setMessages] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const [unreadNotifications, setUnreadNotifications] = useState({});
  const currentUser = state?.user || "";

  // ✅ 1. Establish WebSocket connection for current user (to receive messages)
  useEffect(() => {
    if (!currentUser) return;

    const connectSelfSocket = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/token", {
          withCredentials: true,
        });
        const token = response.data.token;

        if (!token) {
          console.error("Token not found for WebSocket connection.");
          return;
        }

        const selfSocket = new WebSocket(
          `ws://localhost:8080/chat?token=${token}`
        );

        selfSocket.onmessage = (event) => {
          const receivedMessage = JSON.parse(event.data);
          const sender = receivedMessage.sender;

          setMessages((prev) => ({
            ...prev,
            [sender]: [...(prev[sender] || []), receivedMessage],
          }));

          setUnreadNotifications((prev) => ({
            ...prev,
            [sender]: true,
          }));
        };

        setSockets((prev) => ({ ...prev, [currentUser]: selfSocket }));
      } catch (error) {
        console.error("WebSocket connection failed:", error);
      }
    };

    connectSelfSocket();
  }, [currentUser]);

  // ✅ 2. Fetch online users excluding yourself
  useEffect(() => {
    if (!currentUser) return;

    axios
      .get("http://localhost:8080/auth/online-users", { withCredentials: true })
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) => user !== currentUser
        );
        setUsers(filteredUsers);
      })
      .catch((error) => console.error("Error fetching online users:", error));
  }, [currentUser]);

  const openChat = async (username) => {
    if (!openChats.includes(username)) {
      setOpenChats([...openChats, username]);
      setMessages((prev) => ({ ...prev, [username]: [] }));

      try {
        const response = await axios.get("http://localhost:8080/auth/token", {
          withCredentials: true,
        });
        const token = response.data.token;

        if (!token) {
          console.error("Token not found! WebSocket connection might fail.");
          return;
        }

        const newSocket = new WebSocket(
          `ws://localhost:8080/chat?token=${token}`
        );

        newSocket.onmessage = (event) => {
          const receivedMessage = JSON.parse(event.data);

          setMessages((prev) => ({
            ...prev,
            [receivedMessage.sender]: [
              ...(prev[receivedMessage.sender] || []),
              receivedMessage,
            ],
          }));

          setUnreadNotifications((prev) => ({
            ...prev,
            [receivedMessage.sender]: true,
          }));
        };

        setSockets((prev) => ({ ...prev, [username]: newSocket }));

        axios
          .get(
            `http://localhost:8080/api/chat/messages?sender=${currentUser}&receiver=${username}`
          )
          .then((response) =>
            setMessages((prev) => ({ ...prev, [username]: response.data }))
          )
          .catch((error) => console.error("Error loading messages", error));
      } catch (error) {
        console.error("Error fetching token", error);
      }
    } else {
      setUnreadNotifications((prev) => ({
        ...prev,
        [username]: false,
      }));
    }
  };

  const closeChat = (username) => {
    setOpenChats(openChats.filter((chat) => chat !== username));
    if (sockets[username]) {
      sockets[username].close();
    }
    setSockets((prev) => {
      const updated = { ...prev };
      delete updated[username];
      return updated;
    });
  };

  const sendMessage = (username) => {
    const socket = sockets[currentUser]; // 💡 Always use your own socket to send
    if (!socket || newMessages[username]?.trim() === "") return;

    const chatMessage = {
      sender: currentUser,
      receiver: username,
      content: newMessages[username],
    };

    socket.send(JSON.stringify(chatMessage));

    axios
      .post("http://localhost:8080/api/chat/send", chatMessage)
      .then(() => {
        setMessages((prev) => ({
          ...prev,
          [username]: [...(prev[username] || []), chatMessage],
        }));
        setNewMessages((prev) => ({ ...prev, [username]: "" }));
      })
      .catch((error) => console.error("Error saving message", error));
  };

  return (
    <ChatContainer>
      <h2>Welcome, {currentUser}!</h2>
      <UserDropdown onChange={(e) => openChat(e.target.value)}>
        <option value="">Select a User</option>
        {users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </UserDropdown>

      {openChats.map((username) => (
        <Rnd
          key={username}
          default={{
            x: 100,
            y: 100,
            width: 300,
            height: 400,
          }}
          minWidth={250}
          minHeight={300}
        >
          <ChatBox>
            <ChatHeader>
              <span>{username}</span>
              <NotificationDot show={unreadNotifications[username]}>
                🔴
              </NotificationDot>
              <CloseButton onClick={() => closeChat(username)}>X</CloseButton>
            </ChatHeader>
            <ChatBody>
              {messages[username]?.map((msg, index) => (
                <div
                  key={`${msg.sender}-${index}`}
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
            </ChatBody>
            <MessageInput
              type="text"
              placeholder="Type a message..."
              value={newMessages[username] || ""}
              onChange={(e) =>
                setNewMessages((prev) => ({
                  ...prev,
                  [username]: e.target.value,
                }))
              }
              onKeyDown={(e) => e.key === "Enter" && sendMessage(username)}
            />
            <SendButton onClick={() => sendMessage(username)}>Send</SendButton>
          </ChatBox>
        </Rnd>
      ))}
    </ChatContainer>
  );
};

export default ChatComponent;
