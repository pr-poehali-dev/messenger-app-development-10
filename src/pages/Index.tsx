import { useState } from "react";
import Icon from "@/components/ui/icon";

// ---- DATA ----
const stories = [
  { id: 1, name: "Моя история", avatar: "🚀", isMe: true, viewed: false },
  { id: 2, name: "Анна", avatar: "👩‍🎤", viewed: false, time: "2ч" },
  { id: 3, name: "Макс", avatar: "🧑‍💻", viewed: false, time: "5ч" },
  { id: 4, name: "Лера", avatar: "👩‍🎨", viewed: true, time: "8ч" },
  { id: 5, name: "Дима", avatar: "🧑‍🚀", viewed: true, time: "12ч" },
  { id: 6, name: "Соня", avatar: "👩‍🔬", viewed: true, time: "1д" },
];

const chats = [
  {
    id: 1, name: "Анна Климова", avatar: "👩‍🎤", lastMsg: "Отличная идея! 🔥",
    time: "сейчас", unread: 3, online: true, type: "personal",
    msgs: [
      { id: 1, text: "Привет! Как дела?", sent: false, time: "14:20" },
      { id: 2, text: "Всё отлично, спасибо! Работаю над новым проектом", sent: true, time: "14:21" },
      { id: 3, text: "О, расскажи подробнее!", sent: false, time: "14:22" },
      { id: 4, text: "Создаю мессенджер с суперским дизайном 😄", sent: true, time: "14:23" },
      { id: 5, text: "Отличная идея! 🔥", sent: false, time: "14:24" },
    ]
  },
  {
    id: 2, name: "Дизайн-команда", avatar: "🎨", lastMsg: "Макс: Обновил макеты",
    time: "2 мин", unread: 12, online: false, type: "group",
    msgs: [
      { id: 1, text: "Привет всем! Есть обновления по проекту?", sent: false, time: "10:00", sender: "Лера" },
      { id: 2, text: "Да, я добавил новые экраны в Figma", sent: false, time: "10:05", sender: "Макс" },
      { id: 3, text: "Супер! Скину комментарии", sent: true, time: "10:10" },
      { id: 4, text: "Обновил макеты", sent: false, time: "10:15", sender: "Макс" },
    ]
  },
  {
    id: 3, name: "Макс Орлов", avatar: "🧑‍💻", lastMsg: "🎤 Голосовое · 0:32",
    time: "15 мин", unread: 0, online: true, type: "personal",
    msgs: [
      { id: 1, text: "Созвонимся вечером?", sent: false, time: "13:00" },
      { id: 2, text: "Да, в 19:00 ок?", sent: true, time: "13:05" },
      { id: 3, isVoice: true, duration: "0:32", sent: false, time: "13:30", text: "" },
    ]
  },
  {
    id: 4, name: "Лера Соколова", avatar: "👩‍🎨", lastMsg: "Смотри что нашла ✨",
    time: "1 ч", unread: 1, online: false, type: "personal",
    msgs: [
      { id: 1, text: "Привет! Смотри что нашла ✨", sent: false, time: "12:00" },
      { id: 2, isMedia: true, sent: false, time: "12:01", text: "" },
    ]
  },
  {
    id: 5, name: "Стартап Хаб", avatar: "⚡", lastMsg: "Дима: Встреча в пятницу",
    time: "3 ч", unread: 0, online: false, type: "group",
    msgs: [
      { id: 1, text: "Встреча в пятницу в 18:00, все смогут?", sent: false, time: "09:00", sender: "Дима" },
      { id: 2, text: "Я буду!", sent: true, time: "09:15" },
    ]
  },
];

const contacts = [
  { id: 1, name: "Анна Климова", avatar: "👩‍🎤", online: true, status: "В сети" },
  { id: 2, name: "Дима Волков", avatar: "🧑‍🚀", online: false, status: "Был 30 мин назад" },
  { id: 3, name: "Лера Соколова", avatar: "👩‍🎨", online: false, status: "Была вчера" },
  { id: 4, name: "Макс Орлов", avatar: "🧑‍💻", online: true, status: "В сети" },
  { id: 5, name: "Соня Белова", avatar: "👩‍🔬", online: false, status: "Была 2 ч назад" },
];

// ---- TYPES ----
type Msg = {
  id: number;
  text: string;
  sent: boolean;
  time: string;
  sender?: string;
  isVoice?: boolean;
  isMedia?: boolean;
  duration?: string;
};

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
  type: string;
  msgs: Msg[];
};

// ---- COMPONENTS ----
function StoryCircle({ story, onClick }: { story: typeof stories[0]; onClick: () => void }) {
  return (
    <button className="flex flex-col items-center gap-1.5 flex-shrink-0 group" onClick={onClick}>
      <div
        className="rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
        style={{
          width: 60, height: 60,
          background: story.viewed
            ? "rgba(255,255,255,0.08)"
            : "conic-gradient(from 0deg, #a855f7, #22d3ee, #f472b6, #a855f7)",
          padding: 2,
        }}
      >
        <div className="rounded-full flex items-center justify-center text-2xl" style={{ width: 52, height: 52, background: "hsl(var(--background))", border: "2px solid hsl(var(--background))" }}>
          {story.isMe ? (
            <div className="relative">
              <span>{story.avatar}</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #22d3ee)", fontSize: 11, fontWeight: 700 }}>+</div>
            </div>
          ) : (
            <span style={{ opacity: story.viewed ? 0.5 : 1 }}>{story.avatar}</span>
          )}
        </div>
      </div>
      <span className="text-xs font-medium" style={{ color: story.viewed ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))", maxWidth: 56, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {story.isMe ? "Ваша" : story.name.split(" ")[0]}
      </span>
    </button>
  );
}

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

function ChatView({ chat, onBack }: { chat: Chat; onBack: () => void }) {
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

function ChatList({ onSelect, activeId }: { onSelect: (c: Chat) => void; activeId: number | null }) {
  const [search, setSearch] = useState("");
  const filtered = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pb-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }}>
            <Icon name="Search" size={15} />
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск чатов..." className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "hsl(var(--foreground))" }} />
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {stories.map(s => <StoryCircle key={s.id} story={s} onClick={() => {}} />)}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {filtered.map((chat, i) => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl mb-1 transition-all hover:scale-[1.01] animate-fade-in"
            style={{ animationDelay: `${i * 40}ms`, background: activeId === chat.id ? "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(34,211,238,0.08))" : "transparent", border: activeId === chat.id ? "1px solid rgba(168,85,247,0.25)" : "1px solid transparent" }}
          >
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: chat.type === "group" ? "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(34,211,238,0.15))" : "rgba(255,255,255,0.07)", border: "1px solid var(--glass-border)" }}>{chat.avatar}</div>
              {chat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background" style={{ background: "#4ade80" }} />}
              {chat.type === "group" && (
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #22d3ee)" }}>
                  <Icon name="Users" size={8} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-sm truncate">{chat.name}</span>
                <span className="text-xs flex-shrink-0 ml-2" style={{ color: "hsl(var(--muted-foreground))" }}>{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs truncate" style={{ color: "hsl(var(--muted-foreground))" }}>{chat.lastMsg}</span>
                {chat.unread > 0 && (
                  <div className="ml-2 min-w-[20px] h-5 rounded-full flex items-center justify-center text-xs font-bold px-1.5 flex-shrink-0 text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>{chat.unread}</div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactsView() {
  return (
    <div className="flex flex-col h-full px-4 py-4">
      <h2 className="font-bold text-base mb-4">Контакты</h2>
      <div className="flex flex-col gap-2">
        {contacts.map((c, i) => (
          <div key={c.id} className="flex items-center gap-3 px-3 py-3 rounded-2xl glass animate-fade-in hover:scale-[1.01] transition-transform cursor-pointer" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="relative">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl" style={{ background: "rgba(255,255,255,0.07)" }}>{c.avatar}</div>
              {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background" style={{ background: "#4ade80" }} />}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{c.name}</div>
              <div className="text-xs" style={{ color: c.online ? "#4ade80" : "hsl(var(--muted-foreground))" }}>{c.status}</div>
            </div>
            <div className="flex gap-2">
              {[{ icon: "MessageCircle", color: "var(--neon-cyan)" }, { icon: "Phone", color: "var(--neon-purple)" }].map((b, j) => (
                <button key={j} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform" style={{ color: b.color }}>
                  <Icon name={b.icon as "Phone"} size={14} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CallsView() {
  const calls = [
    { id: 1, name: "Анна Климова", avatar: "👩‍🎤", type: "incoming", time: "Сегодня, 14:30", missed: false },
    { id: 2, name: "Макс Орлов", avatar: "🧑‍💻", type: "outgoing", time: "Сегодня, 12:15", missed: false },
    { id: 3, name: "Дима Волков", avatar: "🧑‍🚀", type: "incoming", time: "Вчера, 20:10", missed: true },
    { id: 4, name: "Лера Соколова", avatar: "👩‍🎨", type: "video", time: "Вчера, 18:00", missed: false },
  ];
  return (
    <div className="flex flex-col h-full px-4 py-4">
      <h2 className="font-bold text-base mb-4">Звонки</h2>
      <div className="flex flex-col gap-2">
        {calls.map((c, i) => (
          <div key={c.id} className="flex items-center gap-3 px-3 py-3 rounded-2xl glass animate-fade-in hover:scale-[1.01] transition-transform cursor-pointer" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.07)" }}>{c.avatar}</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{c.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon name={c.type === "video" ? "Video" : c.type === "outgoing" ? "PhoneOutgoing" : "PhoneIncoming"} size={12} style={{ color: c.missed ? "#f87171" : c.type === "outgoing" ? "var(--neon-cyan)" : "#4ade80" } as React.CSSProperties} />
                <span className="text-xs" style={{ color: c.missed ? "#f87171" : "hsl(var(--muted-foreground))" }}>{c.time}</span>
              </div>
            </div>
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.15))", color: "var(--neon-cyan)" }}>
              <Icon name={c.type === "video" ? "Video" : "Phone"} size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  const items = [
    { icon: "Bell", label: "Уведомления", sub: "Все уведомления включены" },
    { icon: "Shield", label: "Конфиденциальность", sub: "Двухфакторная аутентификация" },
    { icon: "Palette", label: "Оформление", sub: "Тёмная тема · Нео-фиолетовый" },
    { icon: "HardDrive", label: "Данные и хранилище", sub: "Авто-загрузка медиа" },
    { icon: "HelpCircle", label: "Помощь", sub: "FAQ и поддержка" },
  ];
  return (
    <div className="flex flex-col h-full px-4 py-4 overflow-y-auto">
      <h2 className="font-bold text-base mb-4">Настройки</h2>
      <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-3">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(34,211,238,0.2))", border: "2px solid rgba(168,85,247,0.4)" }}>🚀</div>
        <div>
          <div className="font-bold">Вы</div>
          <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>+7 999 123-45-67</div>
          <div className="text-xs mt-0.5 gradient-text font-medium">В сети</div>
        </div>
      </div>
      {items.map((item, i) => (
        <button key={i} className="flex items-center gap-3 px-3 py-3 rounded-2xl glass mb-2 w-full text-left animate-fade-in hover:scale-[1.01] transition-transform" style={{ animationDelay: `${i * 60}ms` }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(34,211,238,0.1))" }}>
            <Icon name={item.icon as "Bell"} size={16} style={{ color: "var(--neon-purple)" } as React.CSSProperties} />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{item.label}</div>
            <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{item.sub}</div>
          </div>
          <Icon name="ChevronRight" size={14} style={{ color: "hsl(var(--muted-foreground))" } as React.CSSProperties} />
        </button>
      ))}
    </div>
  );
}

// ---- MAIN ----
type Tab = "chats" | "contacts" | "calls" | "settings";

const navItems: { id: Tab; icon: string; label: string }[] = [
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "contacts", icon: "Users", label: "Люди" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "settings", icon: "Settings", label: "Профиль" },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>("chats");
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const tabLabel = { chats: "Сообщения", contacts: "Контакты", calls: "Звонки", settings: "Настройки" }[tab];

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-15" style={{ background: "radial-gradient(circle, #22d3ee, transparent)" }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full blur-[80px] opacity-10" style={{ background: "radial-gradient(circle, #f472b6, transparent)" }} />
      </div>

      {/* === MOBILE === */}
      <div className="relative z-10 w-full flex md:hidden flex-col">
        {activeChat ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatView chat={activeChat} onBack={() => setActiveChat(null)} />
          </div>
        ) : (
          <>
            <div className="glass-strong px-5 pt-4 pb-3 border-b" style={{ borderColor: "var(--glass-border)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-black gradient-text tracking-tight">Pulse</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{tabLabel}</div>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full glass flex items-center justify-center"><Icon name="Search" size={15} /></button>
                  <button className="w-8 h-8 rounded-full glass flex items-center justify-center" style={{ color: "var(--neon-purple)" }}><Icon name="Plus" size={15} /></button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              {tab === "chats" && <div className="h-full flex flex-col pt-3"><ChatList onSelect={setActiveChat} activeId={null} /></div>}
              {tab === "contacts" && <div className="h-full overflow-y-auto"><ContactsView /></div>}
              {tab === "calls" && <div className="h-full overflow-y-auto"><CallsView /></div>}
              {tab === "settings" && <div className="h-full overflow-y-auto"><SettingsView /></div>}
            </div>
            <div className="glass-strong border-t px-4 py-2" style={{ borderColor: "var(--glass-border)" }}>
              <div className="flex justify-around">
                {navItems.map(item => (
                  <button key={item.id} onClick={() => setTab(item.id)} className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all" style={{ background: tab === item.id ? "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(34,211,238,0.1))" : "transparent", color: tab === item.id ? "var(--neon-purple)" : "hsl(var(--muted-foreground))" }}>
                    <Icon name={item.icon as "Phone"} size={20} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* === DESKTOP === */}
      <div className="relative z-10 hidden md:flex w-full">
        {/* Icon nav */}
        <div className="w-16 flex flex-col items-center py-6 gap-2 glass-strong border-r flex-shrink-0" style={{ borderColor: "var(--glass-border)" }}>
          <div className="text-2xl mb-4 animate-float">⚡</div>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} title={item.label}
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110"
              style={{ background: tab === item.id ? "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(34,211,238,0.15))" : "transparent", color: tab === item.id ? "var(--neon-purple)" : "hsl(var(--muted-foreground))", border: tab === item.id ? "1px solid rgba(168,85,247,0.3)" : "1px solid transparent" }}>
              <Icon name={item.icon as "Phone"} size={18} />
            </button>
          ))}
          <div className="flex-1" />
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "rgba(255,255,255,0.07)" }}>🚀</div>
        </div>

        {/* List panel */}
        <div className="w-72 xl:w-80 flex flex-col glass-strong border-r flex-shrink-0" style={{ borderColor: "var(--glass-border)" }}>
          <div className="px-4 pt-5 pb-4 border-b" style={{ borderColor: "var(--glass-border)" }}>
            <div className="flex items-center justify-between mb-1">
              <div className="text-lg font-black gradient-text">Pulse</div>
              <button className="w-7 h-7 rounded-full glass flex items-center justify-center" style={{ color: "var(--neon-purple)" }}><Icon name="Plus" size={14} /></button>
            </div>
            <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{tabLabel}</div>
          </div>
          <div className="flex-1 overflow-hidden pt-3">
            {tab === "chats" && <ChatList onSelect={setActiveChat} activeId={activeChat?.id ?? null} />}
            {tab === "contacts" && <div className="overflow-y-auto h-full"><ContactsView /></div>}
            {tab === "calls" && <div className="overflow-y-auto h-full"><CallsView /></div>}
            {tab === "settings" && <div className="overflow-y-auto h-full"><SettingsView /></div>}
          </div>
        </div>

        {/* Chat / empty */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeChat ? (
            <ChatView chat={activeChat} onBack={() => setActiveChat(null)} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-fade-in">
              <div className="text-6xl animate-float">💬</div>
              <div className="text-xl font-bold gradient-text">Выберите чат</div>
              <div className="text-sm text-center max-w-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Выберите существующий разговор или начните новый
              </div>
              <button className="btn-gradient px-5 py-2.5 rounded-full text-sm font-semibold text-white mt-2 flex items-center gap-2">
                <Icon name="Plus" size={15} />
                Новый чат
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
