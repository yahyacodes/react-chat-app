import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Auth from "./Auth";

const Chat = ({ signUserOut }) => {
  const [messages, setMessages] = useState("");
  const messageRef = collection(db, "messages");

  const sendMessage = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
      position: "single",
    };

    const newMessasges = [...messages, newMessage];
    setMessages(newMessasges);

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
    });
  };

  return (
    <>
      <Auth />
      <div className="h-[500px] shadow-md">
        <MainContainer className="rounded-lg border border-gray-200 shadow-full">
          <ChatContainer>
            <MessageList>
              {messages &&
                messages.map((message, index) => {
                  return <Message key={index} model={message} />;
                })}
            </MessageList>
            <MessageInput
              autoFocus
              placeholder="Type message here"
              onSend={sendMessage}
            />
          </ChatContainer>
        </MainContainer>

        <button
          className="w-full p-2.5 bg-blue-200 font-medium mt-2 rounded-md"
          onClick={signUserOut}
        >
          Sign out
        </button>
      </div>
    </>
  );
};

export default Chat;
