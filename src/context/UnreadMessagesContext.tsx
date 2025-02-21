import { createContext, useContext, useEffect, useState } from "react";
import { LIVE_URL } from "@/utils/api";
import { useAuthContext } from "./useAuthContext";
import { io } from "socket.io-client";
import { SOCKET_URL } from "@/utils/api";

const Socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

const UnreadMessagesContext = createContext<{
  unreadMessages: string[]; // Define a more specific type
  fetchUnreadMessages: () => Promise<void>;
}>({
  unreadMessages: [],
  fetchUnreadMessages: async () => {},
});

export const UnreadMessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [unreadMessages, setUnreadMessages] = useState<string[]>([]);
  const { user } = useAuthContext();

  const fetchUnreadMessages = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`${LIVE_URL}/api/v1/chat/get-messages-unread`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverId: user?.id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log("-------------response------------",response);
      const data = await response.json();
      // console.log("--------data----------",data);
      const senderData = data?.data?.result?.map((msg: any) => ({
        senderId: msg?.senderId,
        messageCount: msg?.messageCount,
      })) || [];
      const uniqueSenderData = senderData.reduce((acc, current) => {
        const existing = acc.find((item) => item.senderId === current.senderId);
        if (existing) {
          existing.messageCount += current.messageCount;
        } else {
          acc.push(current);
        }
        return acc;
      }, [] as { senderId: string; messageCount: number }[]);
      
      setUnreadMessages(uniqueSenderData);
    } catch (error) {
      console.error("Failed to fetch unread messages:", error);
    }
  };

  useEffect(()=>{
    Socket.on('newMessage',fetchUnreadMessages())
  })

  return (
    <UnreadMessagesContext.Provider value={{ unreadMessages, fetchUnreadMessages }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
};

// Custom Hook to use Unread Messages Context
export const useUnreadMessages = () => useContext(UnreadMessagesContext);
