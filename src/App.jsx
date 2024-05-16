import { useState } from "react";
import "./App.css";
import Auth from "./Components/Auth";
import Cookies from "universal-cookie";
import Chat from "./Components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };

  return (
    <>
      {!isAuth ? (
        <Auth setIsAuth={setIsAuth} />
      ) : (
        <Chat signUserOut={signUserOut} />
      )}
    </>
  );
}

export default App;
