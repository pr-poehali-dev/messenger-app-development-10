import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type Chat, type Msg } from "./types";

function VoiceMessage({ sent }: { sent: boolean }) {
  const [playing, setPlaying] = useState(false);
  const bars = [20, 35, 55, 40, 65, 50, 30, 45, 60, 35, 25, 50, 40];
  return (
    <div className="flex items-center gap-3 px-3 py-2 min-w-[180px]">
      <button onClick={() => setPlaying(!playing)} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110" style={{ background: sent ? "rgba(255,255,255,0.2)" : "rgba(168,85,247,0.3)" }}>
        <Icon name={playing ? "Pause" : "Play"} size={14} />
      </button>
      <div className="flex items-center gap-0.5 h-8">
        {bars.map((h, i) => (
          <div key={i} className="rounded-full transition-all duration-300" style={{ width: 2.5, height: playing ? `${h}%` : "30%", background: sent ? "rgba(255,255,255,0.7)" : "linear-gradient(to top, #a855f7, #22d3ee)", transitionDelay: playing ? `${i * 50}ms` : "0ms" }} />
        ))}
      </div>
      <span className="text-xs opacity-60 font-mono">0:32</span>
    </div>
  );
}

function MediaMessage() {
  return (
    <div className="w-36 h-28 rounded-xl overflow-hidden relative group cursor-pointer" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(34,211,238,0.2))" }}>
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-3xl">🖼️</span></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.4)" }}>
        <Icon name="ZoomIn" size={24} />
      </div>
    </div>
  );
}

export default function ChatView({ chat, onBack }: { chat: Chat; onBack: () => void }) {
  const [input, setInput] = useState("");
  const [localMsgs, setLocalMsgs] = useState<Msg[]>(chat.msgs);

  const send = () => {
    if (!input.trim()) return;
    setLocalMsgs(prev => [...prev, { id: Date.now(), text: input, sent: true, time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full animate-slide-right">
      <div className="glass-strong px-4 py-3 flex items-center gap-3 border-b" style={{ borderColor: "var(--glass-border)" }}>
        <button onClick={onBack} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-105 transition-transform lg:hidden">
          <Icon name="ArrowLeft" size={16} />
        </button>
        <div className="relative">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid var(--glass-border)" }}>{chat.avatar}</div>
          {chat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background" style={{ background: "#4ade80" }} />}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{chat.name}</div>
          <div className="text-xs" style={{ color: chat.online ? "#4ade80" : "hsl(var(--muted-foreground))" }}>
            {chat.type === "group" ? `${chat.msgs.length} участников` : chat.online ? "В сети" : "Не в сети"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[{ icon: "Phone", color: "var(--neon-cyan)" }, { icon: "Video", color: "var(--neon-purple)" }, { icon: "MoreVertical", color: "hsl(var(--muted-foreground))" }].map((b, i) => (
            <button key={i} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-105 transition-transform" style={{ color: b.color }}>
              <Icon name={b.icon as "Phone"} size={15} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {localMsgs.map((msg, i) => (
          <div key={msg.id} className={`flex ${msg.sent ? "justify-end" : "justify-start"} animate-fade-in`} style={{ animationDelay: `${i * 30}ms` }}>
            <div className={`max-w-[75%] ${msg.sent ? "msg-sent" : "msg-received"} relative`}>
              {!msg.sent && chat.type === "group" && msg.sender && (
                <div className="text-xs font-semibold mb-1 px-3 pt-2 gradient-text-pink">{msg.sender}</div>
              )}
              {msg.isVoice ? (
                <VoiceMessage sent={msg.sent} />
              ) : msg.isMedia ? (
                <div className="p-2"><MediaMessage /></div>
              ) : (
                <div className="px-3 py-2 text-sm leading-relaxed">{msg.text}</div>
              )}
              <div className="px-3 pb-2 text-right">
                <span className="text-xs opacity-50">{msg.time}</span>
                {msg.sent && <span className="text-xs ml-1" style={{ color: "var(--neon-cyan)" }}>✓✓</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 glass-strong border-t" style={{ borderColor: "var(--glass-border)" }}>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full glass flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform" style={{ color: "var(--neon-purple)" }}>
            <Icon name="Paperclip" size={16} />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Написать сообщение..."
            className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--glass-border)", color: "hsl(var(--foreground))" }}
          />
          <button className="w-9 h-9 rounded-full glass flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform" style={{ color: "var(--neon-cyan)" }}>
            <Icon name="Smile" size={16} />
          </button>
          {input.trim() ? (
            <button onClick={send} className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 btn-gradient hover:scale-105 transition-transform text-white">
              <Icon name="Send" size={16} />
            </button>
          ) : (
            <button className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
              <Icon name="Mic" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
