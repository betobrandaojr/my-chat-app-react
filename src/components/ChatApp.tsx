import React, { useEffect, useRef } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    ConversationHeader,
    Avatar,
    UserStatus
} from '@chatscope/chat-ui-kit-react';

interface ChatMessage {
    message: string;
    sentTime: string;
    sender: string;
    direction: "incoming" | "outgoing";
    position: "single" | "first" | "normal" | "last";
}

interface ChatAppProps {
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
    user: string;
    status: UserStatus;
    prefix: string;
}

const ChatApp: React.FC<ChatAppProps> = ({ messages, onSendMessage, user, status, prefix }) => {
    const messageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (messageInputRef.current) {
            messageInputRef.current.focus();
        }
    }, [user]);

    const handleSend = (message: string) => {
        onSendMessage(message);
    };

    return (
        <div style={{ position: 'relative', height: '100vh', flex: 1 }} className="main-container">
            <MainContainer>
                <ChatContainer className="chat-container">
                    <ConversationHeader className="conversation-header">
                        <Avatar src="https://via.placeholder.com/150" name={user} status={status} />
                        <ConversationHeader.Content userName={user} info={<div>{prefix}</div>} />
                    </ConversationHeader>
                    <MessageList className="message-list">
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <Message model={msg} />
                                <div style={{ fontSize: '12px', color: 'gray', textAlign: msg.direction === 'outgoing' ? 'right' : 'left' }}>
                                    {msg.sentTime}
                                </div>
                            </div>
                        ))}
                    </MessageList>
                    <MessageInput
                        placeholder="Type message here"
                        onSend={handleSend}
                        ref={messageInputRef}
                        attachButton={false}
                        className="message-input"
                    />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};

export default ChatApp;
