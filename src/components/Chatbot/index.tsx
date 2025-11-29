import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const newMessages = [...messages, { text: prompt, sender: 'user' }];
    setMessages(newMessages);
    setPrompt('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/generate', { prompt });
      const botMessage = response.data.text || 'Sorry, I could not get a response.';
      setMessages([...newMessages, { text: botMessage, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching response from chatbot backend:', error);
      setMessages([...newMessages, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.chatMessage} ${styles[msg.sender]}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className={`${styles.chatMessage} ${styles.bot}`}>{styles.loadingDots}</div>}
      </div>
      <form onSubmit={handleSubmit} className={styles.chatForm}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={styles.chatInput}
          placeholder="Ask something..."
          disabled={isLoading}
        />
        <button type="submit" className={styles.chatButton} disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
