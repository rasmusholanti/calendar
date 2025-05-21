# Calendar Application

A modern calendar application built with React, TypeScript, and Mantine UI for managing pickups and deliveries.

## Live Demo

The application is deployed and available at: [calendar-mauve-eta.vercel.app](https://calendar-mauve-eta.vercel.app)

## Features

- 📅 Interactive calendar interface
- 📦 Pickup and delivery management
- 🔍 Filter views (All, Pickups, Deliveries)
- 🎯 Easy date selection and event viewing

## Tech Stack

- React
- TypeScript
- Mantine UI v8
- Vite
- Tabler Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Calendar.tsx      # Main calendar component
    ├── Footer.tsx        # Page Footer 
    ├── Header.tsx        # Page Header 
│   └── mockData.ts       # Mock data for development
├── App.tsx              # Root component
└── main.tsx            # Entry point
```

## Usage

### Calendar View
- Click on any date to view scheduled events
- Use the segmented control to filter between All, Pickups, and Deliveries
- View detailed information about each pickup and delivery

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Acknowledgments

- Mantine UI for the component library
- Tabler Icons for the icon set
- Vite for the build tooling
