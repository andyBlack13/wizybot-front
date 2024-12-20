import React, { useState } from 'react';
import './App.scss';
import { getChatResponse } from './services/openai.service.tsx'; //Call to Api

const App: React.FC = () => {
  const [message, setMessage] = useState(''); // User message status
  const [conversation, setConversation] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]); // State to handle conversation
  const [showChat, setShowChat] = useState(false); // Status for chat visibility

  // Send user message
  const sendMessage = async () => {
    /*console.log(message, "show input content in console")*/

    if(!message.trim()){ //Validate if input is empty and remove whitespace
      return;
    } else {
      setConversation((prev) => [...prev, { sender: 'user', text: message }]); // Add the user message to conversation array.

      try {
        const botResponse = await getChatResponse(message); // Send mesagge and get response from OpenAI

        console.log(botResponse)
        setConversation((prev) => [...prev, { sender: 'bot', text: botResponse ? botResponse : 'Hubo un error con la Api'}]); // Add the OpenAI response to conversation array.
      } catch (error) { //Error handling
        setConversation((prev) => [...prev, { sender: 'bot', text: 'Algo salió mal. Intenta nuevamente o contacta a nuestro equipo de tecnologia' }]);
      }

      setMessage(''); // Clear input

      /*console.log(conversation, "** show conversation array **")*/
    }
  };

  return (
    <div className='page-styles'>
      {/* Welcome section */}
      <section>
        <div className="header">
          <img className="icon" src="/logo/WizybotLogo.png" alt="logo" />
        </div>

        <div className='content'>
          <p>
            Mi nombre es <strong>Andrea Camargo Ruiz</strong>, desarrolladora Full Stack Junior. 
            Este proyecto, llamado <strong>Wizybot</strong>, fue desarrollado para cumplir con los objetivos de la prueba técnica de la empresa Wizybot. 
            Consiste en un <strong>ChatBot de inteligencia artificial</strong> que consume la API de OpenAI. 
            Puedes interactuar con el bot haciendo clic en el botón ubicado en la esquina inferior derecha.
          </p>
        </div>

        <div className="content">
          <h2 className="sub-title">Tecnologías utilizadas</h2>
          <ul className="technologies-list">
            <li>React.js - v18.2.0</li>
            <li>Typescript</li>
            <li>Node.js - v20.18.1</li>
            <li>npm - v10.8.2</li>
            <li>OpenAI API</li>
            <li>SCSS para estilos</li>
          </ul>
        </div>

        <div className="content">
          <h2 className="sub-title">Recursos</h2>
          <ul className="links-list">
            <li>
              <a href="https://github.com/AndreaCamargo/Wizybot" target="_blank" rel="noopener noreferrer">
                Repositorio del proyecto
              </a>
            </li>
            <li>
              <a href="https://wizybot-demo.vercel.app" target="_blank" rel="noopener noreferrer">
                Video funcionamiento
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Chat button */}
      <button
        className="chatbot-button"
        onClick={() => setShowChat(!showChat)}>
        Chat
        <img className="icon" src="/icons/chat.png" alt="chat" />
      </button>

      {/* Show chat --> showChat boolean*/}
      {showChat && (
        <div className="chatbox">
          {/* Header*/}
          <div className="chat-header">
            <div className='chat-header-logo'>
              <h3>Habla con</h3>
              <img src="/logo/WizybotLogo.png" alt="wizy"/>
            </div>
            <button className="close-chat" onClick={() => setShowChat(false)}>
              X
            </button>
          </div>
          {/* Conversation*/}
          <div className='chat-content'>
            {conversation.map((msg, index) => (
              <div key={index}
                  className='content-message'
                  style={{ justifyContent: msg.sender === 'user' ? 'right' : 'left' }} >
                
                {msg.sender === 'bot' && <img src="/icons/wizy.png" alt="Bot" style={{ width: '30px', marginRight: '10px' }} />}

                <p className='message' style={{ background: msg.sender === 'user' ? 'linear-gradient(146deg, rgba(5,0,78,1) 0%, rgba(9,9,121,1) 52%, rgba(115,181,250,1) 100%)' : '#DCDCDC',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#000000'}} >
                  {msg.text}
                </p>

                {msg.sender === 'user' && <img src="/icons/user.png" alt="User" style={{ width: '30px', marginLeft: '10px' }} />}
              
              </div>
            ))}
          </div>

          {/* Input to send message*/}
          <div className='chat-input'>
            <input className='input'
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ingrese su mensaje..."/>

            <button className='button-send-chat' onClick={sendMessage}>
              <img className='icons' src="/icons/sendicon.png" alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;