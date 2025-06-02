import { useState, useRef } from "react";
import ChatWindow from "./components/ChatWindow.jsx";
import "../App.css";

const MODELS = [
  { id: "sonar-pro", label: "Sonar‑Pro" },
  { id: "sonar", label: "Sonar" },
  { id: "r1-1776", label: "R1‑1776" },
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("sonar-pro");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful assistant."
  );
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, newMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages, model, systemPrompt }),
    });
    const data = await res.json();
    const assistantReply = data.choices?.[0]?.message?.content ||
      "(No response)";
    setMessages([...newMessages, { role: "assistant", content: assistantReply }]);
    setLoading(false);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <header>
        <h1>Perplexity Chat Tester</h1>
        <select value={model} onChange={e => setModel(e.target.value)}>
          {MODELS.map(m => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
        <button onClick={() => setMessages([])}>🗑 Clear</button>
      </header>

      <label className="system-label">System Prompt</label>
      <textarea
        className="system-prompt"
        value={systemPrompt}
        onChange={e => setSystemPrompt(e.target.value)}
        rows={3}
      />

      <ChatWindow messages={messages} bottomRef={bottomRef} />

      <footer>
        <input
          placeholder="Type your message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>Send</button>
      </footer>
    </div>
  );
}