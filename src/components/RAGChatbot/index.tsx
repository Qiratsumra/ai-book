import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

// Define proper interfaces for sources
interface SourceInfo {
  id: string;
  title: string | null;
  source_type: string | null;
  url: string | null;
  relevance_score: number;
  content_preview: string;
}

interface Message {
  content: string;
  role: 'user' | 'assistant';
  sources?: SourceInfo[];
}

function RAGChatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  // Initial greeting message
  const initialMessage: Message = {
    content: "👋 Hi! I'm your research assistant. Ask me anything about the textbook!",
    role: 'assistant',
  };

  useEffect(() => {
    // Add initial message if messages array is empty
    if (messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, []); // Run only once on component mount

  useEffect(() => {
    // Scroll to the bottom of the chat history when new messages are added
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { content: input, role: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://ai-book-rag-chatbot.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input, top_k: 4 }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Something went wrong with the API request.');
      }

      const data = await res.json();
      const aiMessage: Message = { 
        content: data.response, 
        role: 'assistant', 
        sources: data.sources || [] 
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatHistory} ref={chatHistoryRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.role === 'user' ? styles.userMessage : styles.aiMessage
            }`}
          >
            <p>{msg.content}</p>
            {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
              <div className={styles.sourcesContainer}>
                <strong>Sources ({msg.sources.length}):</strong>
                <div className={styles.sourcesList}>
                  {msg.sources.map((source, srcIndex) => (
                    <div key={srcIndex} className={styles.sourceItem}>
                      <div className={styles.sourceHeader}>
                        <span className={styles.sourceTitle}>
                          {source.title || `Document ${source.id}`}
                        </span>
                        <span className={styles.relevanceScore}>
                          {(source.relevance_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      
                      {source.source_type && (
                        <div className={styles.sourceType}>
                          Type: {source.source_type}
                        </div>
                      )}
                      
                      <div className={styles.sourcePreview}>
                        {source.content_preview}
                      </div>
                      
                      {source.url && (
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.sourceLink}
                        >
                          View Source →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className={`${styles.message} ${styles.aiMessage}`}>
            Typing...
          </div>
        )}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className={styles.chatForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question here..."
          disabled={loading}
          className={styles.chatInput}
        />
        <button type="submit" disabled={loading} className={styles.chatButton}>
          {loading ? 'Sending...' : 'Ask'}
        </button>
      </form>
      {error && <p className={styles.errorMessage}>Error: {error}</p>}
    </div>
  );
}

export default RAGChatbot;