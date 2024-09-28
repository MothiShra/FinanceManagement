import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Importing the trash icon from Font Awesome
import '../chatpage.css';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const { userId, firstName } = useParams(); // Destructuring userId and firstName from URL parameters

    useEffect(() => {
    const fetchChatHistory = async () => {
        try {
            // Fetch chat history for the selected user (userId)
            const userMessagesResponse = await axios.get(`http://localhost:3001/chats/${userId}`);
            const userMessages = userMessagesResponse.data;

            // Fetch chat history for the loggedInUser (senderId)
            const loggedInUserMessagesResponse = await axios.get(`http://localhost:3001/chats/${loggedInUser._id}`);
            const loggedInUserMessages = loggedInUserMessagesResponse.data;

            // Filter and merge messages from both users
            const allMessages = [...userMessages, ...loggedInUserMessages]
                .filter(message => message.senderId === userId || message.senderId === loggedInUser._id);

            // Set the merged messages to state
            setMessages(allMessages);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    fetchChatHistory();
}, [userId, loggedInUser]);


const getSenderName = (id) => {
  const sender = users.find(user => user._id === id);
  return sender ? sender.FirstName : '';
};


    const sendMessage = () => {
        // Construct the message object
        const newMessageObj = {
            userId: loggedInUser._id,
            senderId: loggedInUser._id,
            text: newMessage,
            timestamp: new Date().toISOString() // You can use your preferred timestamp format
        };

        // Update state to include the new message
        setMessages(prevMessages => [...prevMessages, newMessageObj]);

        // Send the new message to the backend
        axios.post(`http://localhost:3001/chats/${userId}`, newMessageObj)
            .then(response => {
                console.log('Message sent successfully:', response.data);
                // Optionally, you can update the UI or display a success message
            })
            .catch(error => {
                console.error('Error sending message:', error);
                // Optionally, you can handle errors and display an error message
            });

        // Clear the input field after sending the message
        setNewMessage('');
    };

    const deleteMessage = (messageId) => {
        console.log('Deleting message:', messageId); // Debugging
        axios.delete(`http://localhost:3001/chats/${userId}/${messageId}`)
            .then(response => {
                console.log('Message deleted successfully:', response.data);
                // Optionally, you can update the UI or display a success message
                // Remove the deleted message from the state
                setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
            })
            .catch(error => {
                console.error('Error deleting message:', error);
                // Optionally, you can handle errors and display an error message
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
      <div className="chat-container" style={{ backgroundColor: '#ECE5DD' }}>
          <div className="chat-header">
              {/* Display the firstName obtained from URL parameters */}
              <h3>{firstName}</h3>
          </div>
          <div className="chat-messages">
              {messages
                  .filter(message => message.senderId === loggedInUser._id || message.userId === loggedInUser._id || message.senderId === userId)
                  .map((message, index) => ({
                      ...message,
                      timestamp: new Date(message.timestamp) // Parse timestamp into a Date object
                  }))
                  .sort((a, b) => a.timestamp - b.timestamp) // Sort messages by timestamp
                  .map((message, index) => (
                    <div key={index} className={message.senderId === userId ? 'message received' : 'message sent'}>
    <div className="message-content">
        <p className="message-sender">{getSenderName(message.senderId)}</p>
        <p className="message-text">{message.text}</p>
    </div>
    <div className="message-actions">
        {message.senderId === loggedInUser._id && (
            <div className="delete-button-container">
                <button onClick={() => deleteMessage(message._id)} className="delete-button"><FaTrash size={16} /></button>
            </div>
        )}
    </div>
    <p className="message-timestamp">{message.timestamp.toLocaleString()}</p>
</div>                
                  ))}
          </div>
          <div className="chat-input">
              <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress} // Call handleKeyPress function on key press
                  placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
          </div>
      </div>
  );
  
}

export default ChatPage;
