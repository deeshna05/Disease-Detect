import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa'; // Import the robot icon from react-icons
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false); // To toggle chatbot visibility
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state

    const sendMessage = async (message) => {
        if (message.trim()) {
            const newMessages = [...messages, { sender: 'user', text: message }];
            setMessages(newMessages);
            setUserMessage('');
            setLoading(true); // Set loading to true when sending a message

            try {
                const response = await fetch('http://localhost:8000/ml_app/chatbot_response/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const chatbotMessage = data.response || 'I am not sure how to respond to that.';
                setMessages([...newMessages, { sender: 'bot', text: chatbotMessage }]);
            } catch (error) {
                console.error('Error:', error.message);
                setMessages([...newMessages, { sender: 'bot', text: 'Error communicating with chatbot. Please try again later.' }]);
            } finally {
                setLoading(false); // Set loading to false after the response is received
            }
        }
    };

    const handleSendMessage = () => {
        sendMessage(userMessage);
    };

    const clearChat = () => {
        setMessages([]); // Clear all messages
        setUserMessage(''); // Clear input field
    };

    const handleChatbotOpen = () => {
        if (!isOpen) {
            // Send greeting message when opening the chatbot
            const greetingMessage = 'Hello! How can I assist you today?';
            setMessages([{ sender: 'bot', text: greetingMessage }]);
        } else {
            clearChat(); // Clear chat when closing the chatbot
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Chatbot icon */}
            <div className="chatbot-icon" onClick={handleChatbotOpen}>
                <FaRobot size={30} /> {/* Robot icon with size */}
            </div>

            {/* Chatbot window */}
            {isOpen && (
                <div className="chatbot">
                    <div className="chatbox">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div className="bot-message">Typing...</div>} {/* Show loading message */}
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSendMessage} disabled={loading}>Send</button> {/* Disable button while loading */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
