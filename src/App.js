import React from "react";
import { Main, ChatRoom } from "./pages/PageSource";
import "./App.css";


const App = () => {
  
  const c = localStorage.getItem("user");
  let user="";
  if(c){
    user = c.split(",");
  }

  return (
    <div className="app-container">
      {user ? <ChatRoom user={user[0]} room={user[1]} /> : <Main />}
    </div>
     
  );
};

export default App;
