import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const chatHistoryRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    });
    const data = await response.json();
    setHistory([...history, { text: text, sender: 'user' }]);
    setHistory([...history, { text: data.message, sender: 'bot' }]);
    setText('');
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  // Scroll to the bottom of the chat history when new messages are added
  useEffect(() => {
    chatHistoryRef.current.scrollTo(0, chatHistoryRef.current.scrollHeight);
  }, [history]);

  return (
    <div className="chat-container">
      <div className="chat-history" ref={chatHistoryRef}>
        {history.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input type="text" value={text} onChange={handleChange} placeholder="Type your message here" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
