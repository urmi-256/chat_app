import React, { useState } from "react";
import { supabase } from "../../supabase";
import "./Main.css";
import { Form } from "react-bootstrap"; 
import { Button } from "react-bootstrap";

const Main = () => {
  const [room, setRoom] = useState("general");
  const [user, setUser] = useState("");

  const handleJoinRoom = async (username) => {
    const { data, error } = await supabase
      .from("messages")
      .select("user")
      .eq("user", username)
      .limit(1);

    if (error) {
      console.error(error);
    } else if (data.length > 0) {
      alert("Username is already taken. Please choose another one.");
    } else {
      localStorage.setItem("user", [username, room]);
      setUser(username);
    }
    window.location.reload();
  };

  return (
    <div className="main_container">
      <img src="https://media.istockphoto.com/id/1371726643/photo/different-notifications-on-violet-background-pop-up-messages-copy-space.jpg?b=1&s=170667a&w=0&k=20&c=FhmBYUrsGsR0hYn5zEDa0SkEFfF-rwuUfMEZ4HpX0rE=" alt=""/>
      <div className="heading_container">
        {console.log(user)}
        <h1 id="main-heading">Simple Chat App</h1>
        <div className="select_room">
          <h3 id="choose_room">Rooms available : </h3>
          <label>Choose the room to join : </label>
          <Form.Select
            aria-label="Default select example"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
          >
            <option value="general">General</option>
            <option value="random">Random</option>
            <option value="programming">Programming</option>
          </Form.Select>
        </div>

        <Form
          onSubmit={(event) => {
            event.preventDefault();
            handleJoinRoom(event.target.elements.username.value);
          }}
          id="form"
        >
          <Form.Label className="username-input">Username : </Form.Label>
          <Form.Control
            type="text"
            id="username-input"
            name="username"
          ></Form.Control>
          
          <Button id="btn" variant="primary" type="submit">
            
            Join
            
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Main;
