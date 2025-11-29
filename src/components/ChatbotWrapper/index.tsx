import React, { useState } from 'react';
import RAGChatbot from '../RAGChatbot';
import styles from './styles.module.css';

function ChatbotWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatbotWrapper}>
      <button className={styles.aiIconButton} onClick={toggleChatbot}>
        🤖 {/* AI Icon - can be replaced with an SVG or image later */}
      </button>
      {isOpen && (
        <div className={styles.chatbotContent}>
          <RAGChatbot />
        </div>
      )}
    </div>
  );
}

export default ChatbotWrapper;
