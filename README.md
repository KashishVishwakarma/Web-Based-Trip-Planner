# Web-Based-Trip-Planner

# ✈️ VoyageCraft - Full-Stack Trip Planner

VoyageCraft is a modern, full-stack trip planning and hotel booking web application built with a React frontend, Node.js/Express backend, and MongoDB database. It features real-time cost calculation, dynamic destination search, activity budget tracking, user authentication, and interactive booking receipts.

---

## 🌟 Key Features

* **Interactive Trip Cost Calculator:** Real-time calculation based on dates, duration (nights), selected accommodation, and customizable activities.
* **Dynamic Hotel Search & Selection:** Live destination filtering with visual pricing cards and ratings.
* **Custom Activities Engine:** Add and remove custom itinerary activities with automatic budget recalculation.
* **User Authentication:** Built-in modal-based user login, registration, and state persistence.
* **Instant Booking & Confirmation:** Generates trip booking references and breakdown receipts upon confirmation.
* **Production-Ready Monorepo:** Structured for zero-config single-service deployment on platforms like Render.

---

## 🏗️ Architecture & Tech Stack

* **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, Context API
* **Backend:** Node.js, Express.js, Mongoose (MongoDB ODM), CORS, Dotenv
* **Database:** MongoDB / MongoDB Atlas (with in-memory fallback)
* **Deployment Target:** Render (Web Service)

```text
trip-planner/
├── backend/
│   ├── src/
│   │   ├── models/          # User, Hotel, and Trip Mongoose schemas
│   │   ├── routes/          # REST API endpoints
│   │   └── server.js        # Express app & static client server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (HotelCard, CostSummary, etc.)
│   │   ├── context/         # Global TripContext state
│   │   ├── App.jsx          # Main application dashboard
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
├── render.yaml              # Render blueprint deployment file
├── package.json             # Root monorepo build & start orchestrator
└── README.md

```

---

## 🚀 Local Development Setup

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or newer)
* [Git](https://git-scm.com/)


#


---

## 🌐 Deploy to Render

link-> https://web-based-trip-planner-2.onrender.com

### Quick Deploy

1. Push your repository to **GitHub**.
2. Go to [Render Dashboard](https://dashboard.render.com) and click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
* **Root Directory:** *(Leave blank)*
* **Environment:** `Node`
* **Build Command:** `npm run install:all && npm run build`
* **Start Command:** `npm start`



✍️ Author
---
Kashish Vishwakarma


