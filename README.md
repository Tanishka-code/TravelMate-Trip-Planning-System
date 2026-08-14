# TravelMate - Travel & Trip Planning System

TravelMate is a responsive travel and trip planning web application developed using React and Tailwind CSS.

The system provides a simple interface for users to explore destinations, plan trips, manage their trips, and view travel-related information. It also includes an admin dashboard for managing users, trips, and destinations.

This project is being developed as a series of practical experiments covering frontend development, React, APIs, backend development, database integration, and deployment.

---

## Features

### Home Page
- Introduction to the TravelMate system
- Destination search section
- Popular destinations
- Navigation to different sections

### Login & Registration
- Login interface
- Registration interface
- Responsive authentication form
- Login/Register toggle

### Destinations
- List of popular destinations
- Destination search interface
- Location filter
- Responsive destination cards

### Trip Planner
- Select destination
- Select start and end dates
- Select number of travellers
- Select budget
- Select travel preferences
- Create trip interface

### User Dashboard
- View total trips
- View upcoming trips
- View completed trips
- View recent trips
- Quick actions for planning new trips

### Admin Dashboard
- View total users
- View total trips
- View available destinations
- View recent trips
- Basic management options

---

## Technologies Used

- React.js
- Tailwind CSS
- Vite
- JavaScript
- HTML
- CSS

---

## Project Structure

```text
TravelMate/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Auth.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Destinations.jsx
│   │   └── Planner.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js