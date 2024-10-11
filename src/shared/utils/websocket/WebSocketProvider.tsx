import React, { FC, useEffect, useState } from "react";
import io from "socket.io-client";
import { WebSocketContext } from "./WebSocketContext";


interface Props {
  children: React.ReactNode;
}

const WebSocketProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<any>(null);
  const [data, setData] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  let dataEmit = {
    key: "sell_long",
    limitCategoryId: 1,
    marketCategoryId: 3,
    poolId: 1
  };

  useEffect(() => {
    const socket = io("http://localhost:8079");
    setSocket(socket);
     return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <WebSocketContext.Provider value={{ socket }}>
        {children}
      </WebSocketContext.Provider>
    </>
  );
};

export default WebSocketProvider;