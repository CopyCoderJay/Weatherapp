# 🌦️ WeatherApp

A sleek, modern weather application built with **Next.js** and **TypeScript**, designed to provide accurate weather data for any city in the world using a public weather API.

---

## 🚀 Live Demo

👉 [https://weatherapp.vercel.app](https://weatherapp.vercel.app)

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS (optional)
- **API**: OpenWeatherMap or similar
- **Hosting**: Vercel

---

## 📁 Project Structure

/src
├── /app

│ └── page.tsx # Main weather UI

├── /services

│ └── weatherService.ts

├── /types

│ └── weather.ts

└── /styles

## 🧑‍💻 Local Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the repository

git clone https://github.com/CopyCoderJay/Weatherapp.git
cd Weatherapp

### 2.  Install dependencies
npm install
# or
yarn install

### 3. Set up environment variables

NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
  
Get your free API key from https://openweathermap.org/api

### 4. Run the development server

npm run dev
# or
yarn dev

Then, open http://localhost:3000 in your browser.

💡 Key Decisions & Thought Process

Next.js with App Router: Leveraged the new App Router for better scalability and organization.

TypeScript: Ensured type safety across API responses and components.

Modular Design: Split logic into services/ and types/ folders for clean architecture.

API Abstraction: All API interactions handled in weatherService.ts to separate concerns.

Environment Variables: Secured API keys using .env.local rather than hardcoding.

Responsive UI: Designed with accessibility and responsiveness in mind.

🌍 Deployment Instructions
Deploy to Vercel (Recommended)
Push your code to a GitHub repository.

Go to https://vercel.com and import your GitHub repository.

During setup:

Add NEXT_PUBLIC_WEATHER_API_KEY to Vercel’s Environment Variables.

Click Deploy.

That's it! Your app will be live in seconds.

Built with ❤️ by CopyCoderJay
