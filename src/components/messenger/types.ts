export type Msg = {
  id: number;
  text: string;
  sent: boolean;
  time: string;
  sender?: string;
  isVoice?: boolean;
  isMedia?: boolean;
  duration?: string;
};

export type Chat = {
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

export const stories = [
  { id: 1, name: "Моя история", avatar: "🚀", isMe: true, viewed: false },
  { id: 2, name: "Анна", avatar: "👩‍🎤", viewed: false, time: "2ч" },
  { id: 3, name: "Макс", avatar: "🧑‍💻", viewed: false, time: "5ч" },
  { id: 4, name: "Лера", avatar: "👩‍🎨", viewed: true, time: "8ч" },
  { id: 5, name: "Дима", avatar: "🧑‍🚀", viewed: true, time: "12ч" },
  { id: 6, name: "Соня", avatar: "👩‍🔬", viewed: true, time: "1д" },
];

export const chats: Chat[] = [
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

export const contacts = [
  { id: 1, name: "Анна Климова", avatar: "👩‍🎤", online: true, status: "В сети" },
  { id: 2, name: "Дима Волков", avatar: "🧑‍🚀", online: false, status: "Был 30 мин назад" },
  { id: 3, name: "Лера Соколова", avatar: "👩‍🎨", online: false, status: "Была вчера" },
  { id: 4, name: "Макс Орлов", avatar: "🧑‍💻", online: true, status: "В сети" },
  { id: 5, name: "Соня Белова", avatar: "👩‍🔬", online: false, status: "Была 2 ч назад" },
];
