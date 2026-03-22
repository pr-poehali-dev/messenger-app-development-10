import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { stories } from "./types";

type Story = typeof stories[0];

const STORY_DURATION = 5000;

const storyContents: Record<number, { bg: string; emoji: string; text: string }[]> = {
  1: [
    { bg: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)", emoji: "🚀", text: "Запускаем мессенджер!" },
    { bg: "linear-gradient(135deg, #0ea5e9, #22d3ee, #6366f1)", emoji: "✨", text: "Новый дизайн готов" },
  ],
  2: [
    { bg: "linear-gradient(135deg, #f472b6, #a855f7)", emoji: "👩‍🎤", text: "На репетиции 🎵" },
    { bg: "linear-gradient(135deg, #f59e0b, #ef4444)", emoji: "🎤", text: "Новый трек скоро!" },
  ],
  3: [
    { bg: "linear-gradient(135deg, #10b981, #0ea5e9)", emoji: "🧑‍💻", text: "Коджу сегодня 💻" },
  ],
  4: [
    { bg: "linear-gradient(135deg, #f43f5e, #f97316)", emoji: "👩‍🎨", text: "Работаю над арт-проектом 🎨" },
    { bg: "linear-gradient(135deg, #8b5cf6, #06b6d4)", emoji: "🖼️", text: "Новая работа скоро!" },
  ],
  5: [
    { bg: "linear-gradient(135deg, #6366f1, #0ea5e9)", emoji: "🧑‍🚀", text: "Изучаю космос 🌌" },
  ],
  6: [
    { bg: "linear-gradient(135deg, #10b981, #a855f7)", emoji: "👩‍🔬", text: "Лабораторные исследования 🔬" },
  ],
};

function ProgressBar({ count, current, progress }: { count: number; current: number; progress: number }) {
  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.3)" }}>
          <div
            className="h-full rounded-full"
            style={{
              background: "#fff",
              width: i < current ? "100%" : i === current ? `${progress}%` : "0%",
              transition: i === current ? "none" : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}

type Props = {
  startIndex: number;
  onClose: () => void;
  myStory?: { bg: string; emoji: string; text: string } | null;
};

export default function StoryViewer({ startIndex, onClose, myStory }: Props) {
  const [storyIndex, setStoryIndex] = useState(startIndex);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedRef = useRef<number>(0);

  const currentStory: Story = stories[storyIndex];
  const defaultSlides = storyContents[currentStory.id] ?? [{ bg: "linear-gradient(135deg, #7c3aed, #22d3ee)", emoji: currentStory.avatar, text: "" }];
  const slides = currentStory.isMe && myStory ? [myStory] : defaultSlides;
  const totalSlides = slides.length;

  const goNext = useCallback(() => {
    if (slideIndex < totalSlides - 1) {
      setAnimDir("right");
      setSlideIndex(s => s + 1);
      setProgress(0);
      elapsedRef.current = 0;
      startTimeRef.current = Date.now();
    } else if (storyIndex < stories.length - 1) {
      setAnimDir("right");
      setStoryIndex(i => i + 1);
      setSlideIndex(0);
      setProgress(0);
      elapsedRef.current = 0;
      startTimeRef.current = Date.now();
    } else {
      onClose();
    }
  }, [slideIndex, totalSlides, storyIndex, onClose]);

  const goPrev = useCallback(() => {
    if (slideIndex > 0) {
      setAnimDir("left");
      setSlideIndex(s => s - 1);
      setProgress(0);
      elapsedRef.current = 0;
      startTimeRef.current = Date.now();
    } else if (storyIndex > 0) {
      setAnimDir("left");
      setStoryIndex(i => i - 1);
      setSlideIndex(0);
      setProgress(0);
      elapsedRef.current = 0;
      startTimeRef.current = Date.now();
    }
  }, [slideIndex, storyIndex]);

  useEffect(() => {
    if (paused) {
      elapsedRef.current += Date.now() - startTimeRef.current;
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = elapsedRef.current + (Date.now() - startTimeRef.current);
      const pct = Math.min((elapsed / STORY_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= STORY_DURATION) {
        elapsedRef.current = 0;
        startTimeRef.current = Date.now();
        goNext();
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, storyIndex, slideIndex, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  const slide = slides[slideIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
    >
      {/* Story card */}
      <div
        className="relative flex flex-col"
        style={{
          width: "min(420px, 100vw)",
          height: "min(750px, 100dvh)",
          borderRadius: 24,
          overflow: "hidden",
          background: slide.bg,
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Overlay gradient top */}
        <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }} />
        {/* Overlay gradient bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />

        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 z-10">
          <ProgressBar count={totalSlides} current={slideIndex} progress={progress} />
        </div>

        {/* Header */}
        <div className="absolute top-8 left-3 right-3 z-10 flex items-center gap-2 mt-1">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)" }}
          >
            {currentStory.avatar}
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm leading-tight">
              {currentStory.isMe ? "Ваша история" : currentStory.name}
            </div>
            {"time" in currentStory && (
              <div className="text-white/60 text-xs">{(currentStory as { time?: string }).time}</div>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Icon name="X" size={16} style={{ color: "#fff" } as React.CSSProperties} />
          </button>
        </div>

        {/* Main content */}
        <div
          key={`${storyIndex}-${slideIndex}`}
          className="flex-1 flex flex-col items-center justify-center gap-4"
          style={{
            animation: `story-slide-${animDir} 0.25s cubic-bezier(0.4,0,0.2,1) forwards`,
          }}
        >
          <div
            className="text-8xl"
            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))", animation: "story-emoji 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
          >
            {slide.emoji}
          </div>
          {slide.text && (
            <div
              className="text-white font-bold text-xl text-center px-8"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)", animation: "story-text 0.4s ease 0.1s both" }}
            >
              {slide.text}
            </div>
          )}
        </div>

        {/* Tap zones */}
        <button
          className="absolute left-0 top-0 w-1/3 h-full z-20 cursor-pointer"
          style={{ background: "transparent" }}
          onClick={goPrev}
          aria-label="Предыдущая"
        />
        <button
          className="absolute right-0 top-0 w-1/3 h-full z-20 cursor-pointer"
          style={{ background: "transparent" }}
          onClick={goNext}
          aria-label="Следующая"
        />

        {/* Bottom reply bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-2">
          <input
            placeholder="Ответить..."
            className="flex-1 px-4 py-2 rounded-full text-sm outline-none text-white placeholder-white/50"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
            onClick={e => e.stopPropagation()}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          />
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110"
            style={{ background: "rgba(255,255,255,0.2)" }}
            onClick={e => e.stopPropagation()}
          >
            <Icon name="Heart" size={16} style={{ color: "#fff" } as React.CSSProperties} />
          </button>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110"
            style={{ background: "rgba(255,255,255,0.2)" }}
            onClick={e => e.stopPropagation()}
          >
            <Icon name="Send" size={16} style={{ color: "#fff" } as React.CSSProperties} />
          </button>
        </div>
      </div>

      {/* Prev / Next story nav (desktop) */}
      {storyIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hidden md:flex"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          <Icon name="ChevronLeft" size={20} style={{ color: "#fff" } as React.CSSProperties} />
        </button>
      )}
      {storyIndex < stories.length - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hidden md:flex"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          <Icon name="ChevronRight" size={20} style={{ color: "#fff" } as React.CSSProperties} />
        </button>
      )}
    </div>
  );
}