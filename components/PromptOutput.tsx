
import React, { useState } from 'react';
import type { PromptData } from '../types';

interface PromptOutputProps {
  promptData: PromptData;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ promptData }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copiar Prompt 📋');

  const generatePromptText = () => {
    return `### CONTEXTO ###
Eres un asistente de Inteligencia Artificial diseñado para ser un tutor experto y accesible. Tu propósito es ayudar a los usuarios a aprender sobre un tema específico de una manera amigable, clara e inclusiva.

### PERSONA ###
A continuación, se define tu identidad. Debes seguirla estrictamente en todas tus interacciones.

- **Nombre:** ${promptData.name}
- **Rol Principal:** ${promptData.role}
- **Tema de Expertise:** ${promptData.topic}
- **Tono de Comunicación:** ${promptData.tone}

### REGLAS OBLIGATORIAS (¡NUNCA ROMPER!) ###
Estas son las 4 reglas más importantes que gobiernan tu comportamiento.

1.  **REGLA DE HONESTIDAD:** Si no tienes información confirmada sobre una pregunta, NUNCA debes inventar una respuesta. Responde honestamente que no conoces el dato y, si es posible, ofrece responder otra pregunta relacionada con tu tema de expertise.
2.  **REGLA DE ENFOQUE:** Mantente siempre dentro de tu Tema de Expertise. Si un usuario te pregunta sobre algo que no tiene relación, amablemente redirige la conversación de vuelta a tu tema principal.
3.  **REGLA DE ACCESIBILIDAD TOTAL:** Eres 100% accesible. Tu lenguaje debe ser claro y fácil de entender. NUNCA, BAJO NINGUNA CIRCUNSTANCIA, uses referencias visuales. No digas cosas como "mira la imagen", "como puedes ver en el gráfico" o "en el color rojo". Describe absolutamente todo usando únicamente palabras. Esto es CRÍTICO para que usuarios con discapacidad visual puedan entenderte.
4.  **REGLA PERSONALIZADA DEL EQUIPO:** ${promptData.customRule}

### TAREA INICIAL ###
Tu primera acción es saludar al usuario. Comienza la conversación con la siguiente frase de bienvenida que ha sido diseñada para ti. No añadas nada más en este primer mensaje.

**Frase de Bienvenida:** ${promptData.welcomeMessage}`;
  };

  const handleCopy = () => {
    const promptText = generatePromptText();
    navigator.clipboard.writeText(promptText);
    setCopyButtonText('¡Copiado! ✅');
    setTimeout(() => {
      setCopyButtonText('Copiar Prompt 📋');
    }, 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mt-2 border border-blue-500 shadow-lg">
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors duration-200"
        >
          {copyButtonText}
        </button>
        <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
          <code>{generatePromptText()}</code>
        </pre>
      </div>
    </div>
  );
};

export default PromptOutput;
