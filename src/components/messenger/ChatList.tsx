import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type Chat, stories, chats } from "./types";
import StoryViewer from "./StoryViewer";
import AddStoryModal from "./AddStoryModal";

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

export default function ChatList({ onSelect, activeId }: { onSelect: (c: Chat) => void; activeId: number | null }) {
  const [search, setSearch] = useState("");
  const [viewingStory, setViewingStory] = useState<number | null>(null);
  const [addingStory, setAddingStory] = useState(false);
  const [myStory, setMyStory] = useState<{ bg: string; emoji: string; text: string } | null>(null);
  const filtered = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleStoryClick = (i: number) => {
    if (stories[i].isMe) {
      if (myStory) setViewingStory(i);
      else setAddingStory(true);
    } else {
      setViewingStory(i);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {addingStory && (
        <AddStoryModal
          onClose={() => setAddingStory(false)}
          onPublish={(s) => { setMyStory(s); }}
        />
      )}
      {viewingStory !== null && (
        <StoryViewer startIndex={viewingStory} onClose={() => setViewingStory(null)} myStory={myStory} />
      )}

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
          {stories.map((s, i) => (
            <div key={s.id} className="relative">
              <StoryCircle story={s} onClick={() => handleStoryClick(i)} />
              {s.isMe && !myStory && (
                <button
                  onClick={() => setAddingStory(true)}
                  className="absolute bottom-6 right-0 w-5 h-5 rounded-full flex items-center justify-center text-white z-10"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #22d3ee)", fontSize: 13, fontWeight: 700, pointerEvents: "none" }}
                >
                  +
                </button>
              )}
              {s.isMe && myStory && (
                <div className="absolute bottom-6 right-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#4ade80", border: "2px solid hsl(var(--background))" }}>
                  <Icon name="Check" size={10} />
                </div>
              )}
            </div>
          ))}
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