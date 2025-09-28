# ⏳ Timernetwork — the social network where time = reward

**Timernetwork** — это следующего поколения социальная сеть, где **ваше время превращается в ценность**.  
Каждый просмотр, лайк, комментарий и приглашение друзей вознаграждается очками, которые в дальнейшем можно будет конвертировать в токены **QNX (Polygon)**.

---

## 🚀 Core Features
- ✅ One view = one like (только после 100% просмотра)  
- ✅ Отдельные награды за лайки, комментарии и репосты  
- ✅ Максимальная награда за рефералов  
- ✅ AI-модерация и антибот-защита  
- ✅ Автоматический перевод постов на язык пользователя  
- ✅ Приватность и контроль данных  

---

## 📊 Rewards (MVP пример)
- 👍 Like (после 100% просмотра): **+1 point**  
- 💬 Comment: **+2 points**  
- 🔁 Repost / Share: **+3 points**  
- 👥 Valid referral: **+15 points**

Очки можно будет обменять **1:1 на QNX** (через смарт-контракт в Polygon).

---

## 🗺️ Roadmap
**Phase 1 — Foundation (Month 0–1):**
- Landing + waitlist + бренд  
- MVP feed (фото/видео), авторизация, профили  
- Watch-time gating для лайков  
- Базовая антибот и AI-модерация  

**Phase 2 — Points economy (Month 2–3):**
- Полный учёт очков (лайк/шар/коммент/инвайт)  
- Система рефералов + антифрод-фильтры  
- Интернационализация + авто-перевод  

**Phase 3 — Token bridge (Month 3–4):**
- Интеграция Polygon (QNX)  
- Смарт-контракт для claim: points → QNX  
- Wallet connect в приложении  

**Phase 4 — Scale & DAO (Month 5+):**
- AI-ассистент, инструменты для создателей, NFT-бейджи  
- DAO-голосование за параметры  
- Marketplace и переводы в QNX  

---

## ⚙️ Tech Stack
- **Next.js 15 + React 19 + Tailwind 4**  
- **Supabase** (auth, база, real-time)  
- **Polygon (QNX)** — блокчейн-уровень  
- **AI moderation + translation** (MVP: локальные фильтры, потом — ML)  

---

## 📥 Установка
```bash
# Клонировать репозиторий
git clone https://github.com/husyn66/timernetwork.git
cd timernetwork

# Установить зависимости
npm install

# Запуск dev-сервера
npm run dev
