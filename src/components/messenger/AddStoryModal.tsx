import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const BACKGROUNDS = [
  "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
  "linear-gradient(135deg, #0ea5e9, #22d3ee, #6366f1)",
  "linear-gradient(135deg, #10b981, #0ea5e9)",
  "linear-gradient(135deg, #f472b6, #a855f7)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #f43f5e, #f97316)",
  "linear-gradient(135deg, #6366f1, #0ea5e9)",
  "linear-gradient(135deg, #10b981, #a855f7)",
];

const EMOJIS = ["🚀", "✨", "🔥", "💫", "🌟", "❤️", "🎉", "🎨", "🌈", "🌙", "⚡", "🦋"];

type Props = {
  onClose: () => void;
  onPublish: (story: { bg: string; emoji: string; text: string }) => void;
};

export default function AddStoryModal({ onClose, onPublish }: Props) {
  const [bg, setBg] = useState(BACKGROUNDS[0]);
  const [emoji, setEmoji] = useState("🚀");
  const [text, setText] = useState("");
  const [step, setStep] = useState<"edit" | "preview">("edit");
  const textRef = useRef<HTMLInputElement>(null);

  const handlePublish = () => {
    onPublish({ bg, emoji, text: text.trim() });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full sm:w-auto flex flex-col"
        style={{
          width: "min(420px, 100vw)",
          maxHeight: "100dvh",
          background: "hsl(var(--background))",
          borderRadius: "24px 24px 0 0",
          border: "1px solid var(--glass-border)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4" style={{ borderBottom: "1px solid var(--glass-border)" }}>
          <span className="font-bold text-base">Новая история</span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {step === "edit" ? (
          <div className="flex flex-col gap-5 p-5 overflow-y-auto">
            {/* Preview card */}
            <div
              className="relative rounded-2xl flex flex-col items-center justify-center gap-3 mx-auto"
              style={{ width: 180, height: 280, background: bg, flexShrink: 0 }}
            >
              <div className="text-7xl" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>{emoji}</div>
              {text && (
                <div className="text-white font-bold text-sm text-center px-4" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                  {text}
                </div>
              )}
            </div>

            {/* Text input */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "hsl(var(--muted-foreground))" }}>Подпись</label>
              <input
                ref={textRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={60}
                placeholder="Что происходит?"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--glass-border)",
                  color: "hsl(var(--foreground))",
                }}
              />
            </div>

            {/* Emoji picker */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "hsl(var(--muted-foreground))" }}>Эмодзи</label>
              <div className="flex flex-wrap gap-2">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform hover:scale-110"
                    style={{
                      background: emoji === e ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)",
                      border: emoji === e ? "1.5px solid #a855f7" : "1.5px solid transparent",
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Background picker */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: "hsl(var(--muted-foreground))" }}>Фон</label>
              <div className="flex flex-wrap gap-2">
                {BACKGROUNDS.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setBg(b)}
                    className="rounded-full transition-transform hover:scale-110"
                    style={{
                      width: 32,
                      height: 32,
                      background: b,
                      outline: bg === b ? "2.5px solid #a855f7" : "2.5px solid transparent",
                      outlineOffset: 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1 pb-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl text-sm font-semibold"
                style={{ background: "rgba(255,255,255,0.07)", color: "hsl(var(--foreground))" }}
              >
                Отмена
              </button>
              <button
                onClick={() => setStep("preview")}
                className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                Предпросмотр →
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 p-5 items-center">
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Так увидят вашу историю</p>

            {/* Full preview */}
            <div
              className="relative rounded-2xl flex flex-col items-center justify-center gap-4"
              style={{ width: 220, height: 340, background: bg, boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
            >
              <div className="absolute inset-x-0 top-0 h-20 rounded-t-2xl" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)" }} />
              <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
                <div className="flex-1 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.6)" }} />
              </div>
              <div className="absolute top-6 left-3 right-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-base" style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.5)" }}>🚀</div>
                <div className="text-white font-semibold text-xs">Ваша история</div>
              </div>
              <div className="text-8xl" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))" }}>{emoji}</div>
              {text && (
                <div className="text-white font-bold text-base text-center px-6" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{text}</div>
              )}
            </div>

            <div className="flex gap-3 w-full pb-2">
              <button
                onClick={() => setStep("edit")}
                className="flex-1 py-3 rounded-2xl text-sm font-semibold"
                style={{ background: "rgba(255,255,255,0.07)", color: "hsl(var(--foreground))" }}
              >
                ← Изменить
              </button>
              <button
                onClick={handlePublish}
                className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                <Icon name="Send" size={15} />
                Опубликовать
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
