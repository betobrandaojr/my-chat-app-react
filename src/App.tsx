import React, { useState } from 'react';
import ChatApp from './components/ChatApp';
import Sidebar from './components/Sidebar';
import { UserStatus } from '@chatscope/chat-ui-kit-react';

interface ChatMessage {
    message: string;
    sentTime: string;
    sender: string;
    direction: "incoming" | "outgoing";
    position: "single" | "first" | "normal" | "last";
}

interface VehicleConversation {
    plate: string;
    prefix: string;
    lastSenderName: string;
    info: string;
    avatar: string;
    status: UserStatus;
    unreadCount: number;
    messages: ChatMessage[];
}

const App: React.FC = () => {
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    const [conversations, setConversations] = useState<{ [key: string]: VehicleConversation }>({
        'ABC-1234': {
            plate: 'ABC-1234',
            prefix: 'XYZ-1234',
            lastSenderName: '4569',
            info: 'Olá',
            avatar: 'https://via.placeholder.com/150',
            status: 'available',
            unreadCount: 2,
            messages: [
                {
                    message: 'Olá',
                    sentTime: 'just now',
                    sender: 'ABC-1234',
                    direction: 'incoming',
                    position: 'single'
                }
            ]
        },
        'DEF-5678': {
            plate: 'DEF-5678',
            prefix: 'LMN-5678',
            lastSenderName: '3569',
            info: 'Teste',
            avatar: 'https://via.placeholder.com/150',
            status: 'dnd',
            unreadCount: 5,
            messages: [
                {
                    message: 'Teste',
                    sentTime: 'just now',
                    sender: 'DEF-5678',
                    direction: 'incoming',
                    position: 'single'
                }
            ]
        },
        'GHI-9012': {
            plate: 'GHI-9012',
            prefix: 'OPQ-9012',
            lastSenderName: '44558',
            info: 'oi',
            avatar: 'https://via.placeholder.com/150',
            status: 'unavailable',
            unreadCount: 0,
            messages: [
                {
                    message: 'oi',
                    sentTime: 'just now',
                    sender: 'GHI-9012',
                    direction: 'incoming',
                    position: 'single'
                }
            ]
        }
    });

    const handleVehicleSelect = (vehicle: string) => {
        setConversations(prevConversations => ({
            ...prevConversations,
            [vehicle]: {
                ...prevConversations[vehicle],
                unreadCount: 0
            }
        }));
        setSelectedVehicle(vehicle);
    };

    const handleSendMessage = (vehicle: string, message: string) => {
        const newMessage: ChatMessage = {
            message,
            sentTime: 'just now',
            sender: 'You',
            direction: 'outgoing',
            position: 'single'
        };
        setConversations(prevConversations => ({
            ...prevConversations,
            [vehicle]: {
                ...prevConversations[vehicle],
                messages: [...prevConversations[vehicle].messages, newMessage]
            }
        }));
    };

    const handleReceiveMessage = (vehicle: string, message: string) => {
        const newMessage: ChatMessage = {
            message,
            sentTime: 'just now',
            sender: vehicle,
            direction: 'incoming',
            position: 'single'
        };
        setConversations(prevConversations => ({
            ...prevConversations,
            [vehicle]: {
                ...prevConversations[vehicle],
                messages: [...prevConversations[vehicle].messages, newMessage],
                unreadCount: prevConversations[vehicle].unreadCount + 1
            }
        }));
    };

    const loggedUser = "Beto";
    const loggedUserPrefix = "XYZ-1234";

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                onUserSelect={handleVehicleSelect}
                selectedUser={selectedVehicle || ''}
                loggedUser={loggedUser}
                loggedUserPrefix={loggedUserPrefix}
                conversations={Object.values(conversations)}
                handleUserClick={handleVehicleSelect}
            />
            {selectedVehicle && (
                <ChatApp
                    messages={conversations[selectedVehicle].messages}
                    onSendMessage={(message) => handleSendMessage(selectedVehicle, message)}
                    user={selectedVehicle}
                    status={conversations[selectedVehicle].status}
                    prefix={conversations[selectedVehicle].prefix}
                />
            )}
        </div>
    );
};

export default App;
