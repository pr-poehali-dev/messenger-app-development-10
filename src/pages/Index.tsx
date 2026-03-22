import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type Chat } from "@/components/messenger/types";
import ChatView from "@/components/messenger/ChatView";
import ChatList from "@/components/messenger/ChatList";
import { ContactsView, CallsView, SettingsView } from "@/components/messenger/Sidebar";

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
