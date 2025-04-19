"use client"
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Messages from './Messages';
import InputField from './InputField';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

    const handleSend = useCallback(
  async (e) => {
    e.preventDefault();
    const userMessageText = input.trim();
    if (!userMessageText) return;

    const userMessage = { text: userMessageText, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessageText }),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        setMessages((prev) => [...prev, { text: data.message, sender: 'bot' }]);
      } else {
        throw new Error(data.error || 'API Error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: ${error.message}`,
          sender: 'bot',
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  },
  [input]
);

  return (
    <section className="mb-14 flex justify-center items-center w-full h-full">
  <div className="bg-transparent shadow-lg rounded-lg w-full flex flex-col justify-between items-center h-full overflow-hidden">
    
    {/* Header */}
    <div className="flex items-center justify-center flex-col py-4">
      <p className="text-white text-xl font-semibold">Hello</p>
      <p className="text-white opacity-70 text-[12px]">Hellooo</p>
    </div>

    {/* Messages (scrollable) */}
    <div className="flex-1 w-full overflow-y-auto px-4 py-2" id="scrollableContainer">
      <Messages messages={messages} isTyping={isTyping} />
      <div ref={messagesEndRef} />
    </div>

    {/* Input */}
    <div className="flex items-center justify-center mt-4 w-full px-4 pb-4">
      <InputField input={input} onInputChange={setInput} onSend={handleSend} />
    </div>
    
  </div>
</section>

    
    // <section className="mb-14 flex justify-center items-center w-full">
    //   <div className="bg-transparent shadow-lg rounded-lg w-full flex justify-center items-center flex-col">
    //     <div className="flex w-full items-center justify-center flex-col">

    //       {/* <img src="/logo.png" alt="logo" className="h-8 w-8" /> */}
    //       <p className="text-white">Hello</p>
    //       <p className="text-white opacity-70 text-[12px]">Hellooo</p>
    //     </div>

    //     <Messages messages={messages} isTyping={isTyping} />

    //     {/* Input and Buttons Container */}
    //     <div className="flex items-center justify-center mt-4">
    //       {/* Input Field */}
    //       <InputField input={input} onInputChange={setInput} onSend={handleSend} />

          
    //     </div>
    //   </div>
    // </section>
  );
}

export default Chat