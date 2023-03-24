import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import "./ChatRoom.css";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Form, Button } from "react-bootstrap";


const ChatRoom = ({ room, user }) => {
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(room);

  useEffect(() => {
    const messagesListener = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((messages) => [...messages, payload.new]);
        }
      )
      .subscribe();

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select()
        .eq("room", currentRoom)
        .order("created_at", { ascending: true });
      setMessages(data);
    };

    fetchMessages();

    return () => {
      messagesListener.unsubscribe();
    };
  }, [currentRoom]);

  const handleSendMessage = async (text) => {
    supabase
      .from("messages")
      .insert([
        {
          room: currentRoom,
          user: user,
          text: text,
        },
      ])
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="chatRoom-container">
      <div className="room_selection">
        <Form>
          <label>Rooms : </label>
          <Form.Select
            aria-label="Default select example"
            value={currentRoom}
            onChange={(event) => setCurrentRoom(event.target.value)}
          >
            <option value="general">General</option>
            <option value="random">Random</option>
            <option value="programming">Programming</option>
          </Form.Select>
        </Form>
      </div>
      <div className="main_room">
        <label id="chatRoom-heading">Your Room : {currentRoom}</label>

        <div className="message_container">
          {messages.map((message) => (
            <>
              {message.user === user ? (
                <div
                  className="message_bubble"
                  style={{ float: "right" }}
                  key={message.id}
                >
                  <SnackbarContent
                    style={{
                      textAlign: "right",
                      backgroundColor: "rgb(160, 199, 147)",
                      width: "100%",
                      color: "black",
                    }}
                    message={message.text}
                  />
                  <span className="user_name">{message.user}</span>
                </div>
              ) : (
                <>
                  <div className="message_bubble" key={message.id}>
                    <SnackbarContent
                      style={{
                        textAlign: "left",
                        backgroundColor: "rgb(197, 207, 255)",
                        width: "100%",
                        color: "black",
                      }}
                      message={message.text}
                    />
                    <span className="user_name">{message.user}</span>
                  </div>
                </>
              )}
            </>
          ))}
        </div>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            handleSendMessage(event.target.elements.message.value);
            event.target.elements.message.value = "";
          }}
          id="send_message"
        >
          <Form.Control
            type="text"
            name="message"
            placeholder="type your message"
          />
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default ChatRoom;
