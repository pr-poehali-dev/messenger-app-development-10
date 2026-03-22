import Icon from "@/components/ui/icon";
import { contacts } from "./types";

export function ContactsView() {
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

export function CallsView() {
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

export function SettingsView() {
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
