
import React, { useState, useEffect, useRef } from 'react';
import type { Message, PromptData } from './types';
import ChatMessage from './components/ChatMessage';
import UserInput from './components/UserInput';

const BOT_QUESTIONS = [
  "¿Cómo se llamará tu asistente de IA?",
  "Excelente nombre. Ahora, ¿sobre qué TEMA específico será experto tu asistente?",
  "¡Qué tema tan interesante! ¿Y cuál será su ROL principal? Por ejemplo: un tutor paciente, un explorador curioso, un científico divertido...",
  "Perfecto. Ahora vamos a darle estilo. ¿Qué TONO de comunicación usará? Describe su personalidad con 2 o 3 adjetivos (ej: amigable y chistoso, serio y profesional, etc.).",
  "¡Me encanta esa personalidad! Ahora, escribe la FRASE DE BIENVENIDA exacta con la que tu asistente saludará a sus usuarios por primera vez.",
  "Todo buen asistente necesita reglas claras para ser seguro y útil. Las primeras 3 reglas son obligatorias para todos: ser honesto, mantenerse enfocado en su tema y ser 100% accesible (no usar lenguaje visual).\n\nAhora te toca a ti. Crea una REGLA PERSONALIZADA para tu asistente. Puede ser cualquier cosa que lo haga único o mejor.",
];

const FINAL_BOT_MESSAGES = [
    "¡Genial! Tengo todo lo que necesito. Procesando... ⚙️ ¡Es hora de la magia!",
    "¡Lo lograste! ✨ Ahora, copia todo el texto del recuadro de arriba, abre un NUEVO proyecto en Google AI Studio, pégalo y empieza a chatear con tu propia creación. ¡Que te diviertas!"
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [promptData, setPromptData] = useState<PromptData>({
    name: '', topic: '', role: '', tone: '', welcomeMessage: '', customRule: ''
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome message
    setTimeout(() => {
      setMessages([{
        id: Date.now(),
        sender: 'bot',
        text: "¡Hola! Soy PromptCrafter 5000 🤖. Juntos vamos a crear el 'ADN' para tu propio asistente de IA. ¿Estás listo para empezar? ✨"
      }]);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const addMessage = (sender: 'bot' | 'user', text: string, isFinalPrompt: boolean = false) => {
    setMessages(prev => [...prev, { id: Date.now(), sender, text, isFinalPrompt }]);
  };

  const handleUserSubmit = (text: string) => {
    addMessage('user', text);
    setIsLoading(true);

    let nextStep = step + 1;

    switch (step) {
        case 0: // Affirmative response to start
            break;
        case 1:
            setPromptData(prev => ({...prev, name: text}));
            break;
        case 2:
            setPromptData(prev => ({...prev, topic: text}));
            break;
        case 3:
            setPromptData(prev => ({...prev, role: text}));
            break;
        case 4:
            setPromptData(prev => ({...prev, tone: text}));
            break;
        case 5:
            setPromptData(prev => ({...prev, welcomeMessage: text}));
            break;
        case 6:
            setPromptData(prev => ({...prev, customRule: text}));
            break;
    }

    setTimeout(() => {
        if (nextStep <= BOT_QUESTIONS.length) {
            addMessage('bot', BOT_QUESTIONS[nextStep - 1]);
        } else {
            // Assembling and finishing
            addMessage('bot', FINAL_BOT_MESSAGES[0]);
            
            setTimeout(() => {
                addMessage('bot', '', true); // This will trigger the PromptOutput component
                 setTimeout(() => {
                    addMessage('bot', FINAL_BOT_MESSAGES[1]);
                    setIsComplete(true);
                 }, 1500);
            }, 2000);
        }
        setIsLoading(false);
    }, 1500);

    setStep(nextStep);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
        <header className="text-center p-4 border-b border-gray-700 bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-white">PromptCrafter <span className="text-blue-400">5000</span> 🤖✨⚙️</h1>
            <p className="text-sm text-gray-400">Tu mentor para crear prompts de IA perfectos</p>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto">
                {messages.map((msg, index) => (
                    <ChatMessage key={msg.id} message={msg} promptData={promptData}/>
                ))}
                {isLoading && messages.length > 0 && (
                   <div className="flex items-start gap-3 my-4 justify-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl shadow-md">🤖</div>
                        <div className="max-w-md lg:max-w-2xl p-4 rounded-2xl shadow-lg bg-gray-700 rounded-bl-none flex items-center space-x-2">
                           <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-0"></span>
                           <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></span>
                           <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-400"></span>
                        </div>
                    </div>
                )}
                 <div ref={chatEndRef} />
            </div>
        </main>
        <footer className="sticky bottom-0">
             <UserInput onSubmit={handleUserSubmit} disabled={isLoading || isComplete} />
        </footer>
    </div>
  );
};

export default App;
