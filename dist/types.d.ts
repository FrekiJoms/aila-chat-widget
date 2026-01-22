// TypeScript definitions for AILA Chat Widget
export declare interface AILAChatOptions {
  webhookUrl: string;
  welcomeMessage?: string;
  position?: "bottom-right" | "bottom-left";
  autoShow?: boolean;
}

export declare interface AILAChatWidget {
  mount(): void;
  open(): void;
  close(): void;
  destroy(): void;
  sessionId: string;
  messages: Array<{
    content: string;
    type: "user" | "bot";
    timestamp: number;
  }>;
  isOpen: boolean;
  isTyping: boolean;
}

export declare function createChat(options: AILAChatOptions): AILAChatWidget;
export declare class AILAChatWidget implements AILAChatWidget {
  constructor(options: AILAChatOptions);
  mount(): void;
  open(): void;
  close(): void;
  destroy(): void;
  sessionId: string;
  messages: Array<{
    content: string;
    type: "user" | "bot";
    timestamp: number;
  }>;
  isOpen: boolean;
  isTyping: boolean;
}

export default { createChat, AILAChatWidget };
