Wardrobe Frontend (Production Build)

This repository contains the production-ready frontend for the Wardrobe App. It is a single-page application (SPA) built with React to help users manage, organize, and plan their wardrobe items and outfits.

Technology Stack

React (v18+)

React Router for client-side routing

Axios for HTTP requests to the backend API

CSS/SCSS for styling (custom or framework-based)

Vite (or Create React App) for build and development tooling

ESLint and Prettier for code quality and formatting (if configured)

Installation

Clone the repository:

git clone https://github.com/teodorasandu291200/wardrobe-frontend-prod.git
cd wardrobe-frontend-prod

Install dependencies:

npm install

Start the development server:

npm run dev

Build for production:

npm run build

Preview production build locally:

npm run preview

Backend Integration

This frontend is designed to work with a REST API backend. API URLs can be configured in a .env file.

Example:

VITE_API_URL=https://your-backend-api.com
