import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ChatGPT.scss";

function ChatGPT() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const customResponses = {
    "c'est qui mehdi akami ?": "Mehdi Akami est un excellent développeur full stack.",
    "C'est qui mehdi akami ?": "Mehdi Akami est un excellent développeur full stack.",
    "qui est mehdi akami": "Mehdi Akami est un excellent développeur full stack.",
    "qui est akami mehdi": "Mehdi Akami est un excellent développeur full stack.",
    "c'est qui akami mehdi": "Mehdi Akami est un excellent développeur full stack.",
    "c qui akami mehdi": "Mehdi Akami est un excellent développeur full stack.",
    "chkoun houwa hicham": "Hicham est le frère de Mehdi.",
    "chkoun houma khout mehdi": "Mehdi a des frères nommés Khalid, Hicham, et Mouhamed.",
    "chkoun houwa khalid": "Khalid est le frère de Mehdi.",
    "chkoun houwa mouhamed": "Mouhamed est le frère de Mehdi.",
    "chkoun houwa mehdi ?": "Mehdi houwa li7wak ou makhlssekch 😂😂 désolé rani ghi da7k m3ak",
    "Chkoun houwa mehdi ?": "Mehdi houwa li7wak ou makhlssekch 😂😂 désolé rani ghi da7k m3ak",
  };

  const formatMessageContent = (text) => {
    return text.split('\n').map((line, index) => {
      const isBold = line.startsWith("**") && line.endsWith("**");
      return (
        <p key={index} className={isBold ? 'bold' : ''}>
          {isBold ? line.replace(/\*\*/g, '') : line}
        </p>
      );
    });
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      const lowerCaseInput = input.toLowerCase();
      if (customResponses[lowerCaseInput]) {
        const botMessage = {
          text: customResponses[lowerCaseInput],
          sender: "bot",
          isCode: false,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        return;
      }

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
          }
        );

        const botMessageContent = response.data.choices[0].message.content.trim();
        const isCode = botMessageContent.startsWith("```") && botMessageContent.endsWith("```");
        const botMessage = {
          text: botMessageContent.replace(/```/g, ""),
          sender: "bot",
          isCode: isCode,
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Erreur lors de l'appel à l'API OpenAI:", error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatgpt">
      <h1>Bienvenue chez AKAMIBOT, votre assistant IA !</h1>
      <div className="chat-window">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>👋 Bonjour et bienvenue ! Je suis AKAMIBOT, votre assistant IA.</p>
            <p>Posez-moi toutes vos questions pour obtenir de l'aide en temps réel !</p>
            <p>Essayez de me demander comme par exemple :</p>
            <ul>
              <li>🎓 Comment fonctionne JavaScript ?</li>
              <li>📈 Comment gérer mon temps efficacement en tant que développeur ?</li>
              <li>💡 Donnez-moi un conseil en développement web.</li>
            </ul>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender} ${msg.isCode ? 'code-block' : ''}`}>
              {msg.isCode ? <pre><code>{msg.text}</code></pre> : formatMessageContent(msg.text)}
            </div>
          ))
        )}
      </div>
      <div className="input-area">
        <input
          type="texte"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Que puis-je pour vous ?"
        />
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}

export default ChatGPT;
