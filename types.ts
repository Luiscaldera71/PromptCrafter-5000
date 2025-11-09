
export interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  isFinalPrompt?: boolean;
}

export interface PromptData {
  name: string;
  topic: string;
  role: string;
  tone: string;
  welcomeMessage: string;
  customRule: string;
}
