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
  const [isTyping, setIsTyping] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
  }, [messages, loading]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { content: input, role: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);
    setIsTyping(true);
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
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setLoading(false);
        setIsTyping(false);
      }, 800);
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearChat = () => {
    setMessages([initialMessage]);
    setError('');
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>🤖</div>
          <div className={styles.headerText}>
            <h3>Research Assistant</h3>
            <p>Powered by RAG • Textbook Knowledge</p>
          </div>
        </div>
        <button onClick={clearChat} className={styles.clearButton}>
          Clear Chat
        </button>
      </div>

      {/* Chat History */}
      <div className={styles.chatHistory} ref={chatHistoryRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.role === 'user' ? styles.userMessage : styles.aiMessage
            } ${styles.messageEntry}`}
          >
            <div className={styles.messageBubble}>
              <div className={styles.messageContent}>
                <p>{msg.content}</p>
              </div>
              
              {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                <div className={styles.sourcesContainer}>
                  <div className={styles.sourcesHeader}>
                    <span className={styles.sourcesTitle}>
                      📚 Sources ({msg.sources.length})
                    </span>
                  </div>
                  <div className={styles.sourcesList}>
                    {msg.sources.map((source, srcIndex) => (
                      <div 
                        key={srcIndex} 
                        className={styles.sourceItem}
                        style={{ animationDelay: `${srcIndex * 0.1}s` }}
                      >
                        <div className={styles.sourceHeader}>
                          <span className={styles.sourceTitle}>
                            {source.title || `Document ${source.id}`}
                          </span>
                          <div className={styles.relevanceBadge}>
                            <div 
                              className={styles.relevanceFill}
                              style={{ width: `${source.relevance_score * 100}%` }}
                            ></div>
                            <span className={styles.relevanceScore}>
                              {(source.relevance_score * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        
                        {source.source_type && (
                          <div className={styles.sourceType}>
                            <span className={styles.typeIcon}>📄</span>
                            {source.source_type}
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
                            <span>View Source</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className={`${styles.message} ${styles.aiMessage} ${styles.typingMessage}`}>
            <div className={styles.messageBubble}>
              <div className={styles.typingIndicator}>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={styles.inputContainer}>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className={styles.chatForm}>
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the textbook..."
              disabled={loading}
              className={styles.chatInput}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()} 
              className={styles.chatButton}
            >
              {loading ? (
                <div className={styles.buttonLoader}></div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </form>
        
        {error && (
          <div className={styles.errorMessage}>
            <div className={styles.errorIcon}>⚠️</div>
            <div className={styles.errorText}>
              <strong>Error:</strong> {error}
            </div>
            <button 
              onClick={() => setError('')} 
              className={styles.errorClose}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RAGChatbot;