
import React from 'react';
import type { Message, PromptData } from '../types';
import PromptOutput from './PromptOutput';

interface ChatMessageProps {
  message: Message;
  promptData?: PromptData;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, promptData }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex items-start gap-3 my-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl shadow-md">
          🤖
        </div>
      )}
      <div className={`max-w-md lg:max-w-2xl p-4 rounded-2xl shadow-lg ${isBot ? 'bg-gray-700 rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none'}`}>
        {message.isFinalPrompt && promptData ? (
          <PromptOutput promptData={promptData} />
        ) : (
          <p className="text-white whitespace-pre-wrap">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
