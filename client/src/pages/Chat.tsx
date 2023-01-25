import { useState } from "react";

type ChatProps = {
  socket: any;
  username: string;
  room: string;
};

export default function Chat({ socket, username, room }: ChatProps) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message) {
      await socket.emit("chat_message", {
        username,
        message,
        room,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      });
    }

    setMessage("");
  };

  return (
    <div className="text-center py-10">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="flex gap-2 justify-center">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          className="py-2 px-4 rounded"
        />
        <button onClick={sendMessage} className="bg-green-500 py-2 px-4 rounded-[50px]">&#9658;</button>
      </div>
    </div>
  );
}
