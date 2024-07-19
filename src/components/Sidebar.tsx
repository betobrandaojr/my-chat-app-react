import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    ConversationList,
    Conversation,
    Avatar,
    Search,
    UserStatus
} from '@chatscope/chat-ui-kit-react';

interface VehicleConversation {
    plate: string;
    prefix: string;
    lastSenderName: string;
    info: string;
    avatar: string;
    status: UserStatus;
    unreadCount: number;
}

interface SidebarProps {
    onUserSelect: (user: string) => void;
    selectedUser: string | null;
    loggedUser: string;
    loggedUserPrefix: string;
    conversations: VehicleConversation[];
    handleUserClick: (user: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onUserSelect, selectedUser, loggedUser, loggedUserPrefix, conversations, handleUserClick }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredConversations = conversations.filter(conversation =>
        conversation.plate.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ width: '300px', borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', flexDirection: 'column', borderBottom: '1px solid #ccc' }}>
                <Avatar src="https://via.placeholder.com/150" name={loggedUser} />
                <span style={{ marginTop: '5px', fontWeight: 'bold' }}>{loggedUser}</span>
                <span style={{ fontSize: '12px', color: 'gray' }}>{loggedUserPrefix}</span>
            </div>
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <Search
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(value: string) => setSearchTerm(value)}
                    onClearClick={() => setSearchTerm('')}
                />
            </div>
            <div style={{ height: '10px' }}></div>
            <ConversationList>
                {filteredConversations.map((conversation, index) => (
                    <Conversation
                        key={index}
                        name={conversation.plate}
                        lastSenderName={conversation.prefix}
                        info={conversation.info}
                        active={conversation.plate === selectedUser}
                        onClick={() => handleUserClick(conversation.plate)}
                    >
                        <Avatar src={conversation.avatar} name={conversation.plate} status={conversation.status} />
                        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{conversation.plate}</span>
                            <span style={{ fontSize: '12px', color: 'grey' }}>{conversation.prefix}</span>
                            {conversation.unreadCount > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    backgroundColor: 'red',
                                    borderRadius: '50%',
                                    color: 'white',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px'
                                }}>
                                    {conversation.unreadCount}
                                </div>
                            )}
                        </div>
                    </Conversation>
                ))}
            </ConversationList>
        </div>
    );
};

export default Sidebar;
