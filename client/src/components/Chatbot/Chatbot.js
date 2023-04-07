import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatHistoryRef = useRef(null);

  // Fetch list of models from backend API
  useEffect(() => {
    async function fetchModelList() {
      const response = await fetch('/api/models');
      const data = await response.json();
      setModelList(data.models);
    }
    fetchModelList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    });
    const data = await response.json();
    setHistory([
      ...history,
      { text: text, sender: 'user' },
      { text: data.message, sender: 'bot' }
    ]);
    setText('');
    setLoading(false);
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
        <input type="text" value={text} onChange={handleChange} placeholder="Type your message here" disabled={loading}/>
        <select onChange={handleChange} disabled={loading}>
          <option value="">Select Model</option>
          {modelList.map((model, index) => (
            <option key={index} value={model}>{model}</option>
          ))}
        </select>
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
