import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Auth from "./Auth";

const Chat = ({ signUserOut }) => {
  const [messages, setMessages] = useState("");
  const [getMessages, setGetMessages] = useState([]);
  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messageRef);
    const unsubssribe = onSnapshot(queryMessages, (snapshot) => {
      let allMessages = [];
      snapshot.forEach((doc) => {
        allMessages.push({ ...doc.data(), id: doc.id });
      });

      setGetMessages(allMessages);
    });

    return () => unsubssribe();
  }, []);

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
              {getMessages.map((message, index) => {
                return <Message key={index} model={message.text} />;
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
