import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import makeApiRequest from '@/utils/apiServer';
import { json } from 'stream/consumers';
import { LIVE_URL } from '@/utils/api';
interface OnlineUsersContextProps {
    onlineUsers: string[];
    fetchOnlineUsers: () => void;
}

const OnlineUsersContext = createContext<OnlineUsersContextProps | undefined>(undefined);

export const OnlineUsersProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const {user} = useAuthContext()
    const fetchOnlineUsers = async () => {
        
        if (!user?.id) {
            console.error('No userId found in localStorage.');
            return;
        }

        try {
            const response = await fetch(`${LIVE_URL}api/v1/auth/online-users`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            if (!response) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log('data',data.data.activeUsers)
            setOnlineUsers(data.data.activeUsers);
            const userIds = data.data.activeUsers.map((user: any) => user.userId);
            setOnlineUsers(userIds);
            
        } catch (error) {
            console.error('Error fetching online users:', error);
            setOnlineUsers([]); // Handle errors gracefully
        }
    };

    useEffect(() => {
        fetchOnlineUsers();

        // Polling every 1 minute to update the list of online users
        const interval = setInterval(fetchOnlineUsers, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <OnlineUsersContext.Provider value={{ onlineUsers, fetchOnlineUsers }}>
            {children}
        </OnlineUsersContext.Provider>
    );
};

export const useOnlineUsers = (): OnlineUsersContextProps => {
    const context = useContext(OnlineUsersContext);
    if (!context) {
        throw new Error('useOnlineUsers must be used within an OnlineUsersProvider');
    }
    return context;
};
