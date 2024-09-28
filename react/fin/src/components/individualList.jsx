import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function IndividualChatPage() {
    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/chat/history/${userId}`);
                setMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchChatHistory();

        const newWs = new WebSocket('ws://localhost:3001'); // WebSocket server URL
        setWs(newWs);

        return () => {
            newWs.close();
        };
    }, [userId]);

    useEffect(() => {
        if (!ws) return;

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };
    }, [ws]);

    const sendMessage = () => {
        if (!ws || inputMessage.trim() === '') return;

        ws.send(JSON.stringify({ content: inputMessage, receiverId: userId }));
        setInputMessage('');
    };

    return (
        <div>
            <h1>Chat with User</h1>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="message-input"
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
}

export default IndividualChatPage;
