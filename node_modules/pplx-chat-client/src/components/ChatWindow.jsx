import "../../index.css";
export default function ChatWindow({ messages, bottomRef }) {
  return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <div key={i} className={`msg ${m.role}`}>
          <strong>{m.role === "user" ? "You" : "Assistant"}</strong>: {m.content}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}