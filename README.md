# TravelMate - Travel & Trip Planning System

TravelMate is a responsive travel and trip planning web application developed using React and Tailwind CSS.

The application provides a simple interface for users to explore destinations, plan trips, manage their trips, and view travel-related information. It also includes user and admin dashboard interfaces.

The project is being developed as a practical implementation project covering frontend development, responsive UI design, React Hooks, state management, forms, and reusable components.

---

## Features

### Home Page

- Introduction to the TravelMate system
- Destination search section
- Popular destinations
- Navigation to different sections
- Responsive layout

### Login & Registration

- Login interface
- Registration interface
- Login/Register toggle
- Form input handling
- Reusable form logic using a Custom Hook
- Authentication state using React Context
- Logout functionality

### Destinations

- List of popular destinations
- Destination search interface
- Location information
- Responsive destination cards
- Destination data loading using `useEffect`

### Trip Planner

- Select destination
- Select start and end dates
- Select number of travellers
- Select budget
- Select travel preferences
- Create trip interface
- Controlled form inputs
- Form submission and data handling

### User Dashboard

- View total trips
- View upcoming trips
- View completed trips
- View recent trips
- Quick actions for planning new trips
- Display current user information
- Logout functionality

### Admin Dashboard

- View total users
- View total trips
- View available destinations
- View recent trips
- Basic management interface

---

## React Concepts Implemented

The project demonstrates important React concepts through the TravelMate application.

### 1. useState

`useState` is used to store and update changing data in React components.

In the Trip Planner, state is used for:

- Destination
- Start date
- End date
- Number of travellers
- Budget

Example:

```javascript
const [destination, setDestination] = useState('')
2. Controlled Forms

The Trip Planner and Authentication forms use controlled inputs.

The input values are connected to React state and updated using onChange.

Example:

<input
  value={destination}
  onChange={(e) => setDestination(e.target.value)}
/>

Form data is processed using onSubmit.

3. useEffect

useEffect is used in the Destinations page to load destination data when the component is loaded.

Example:

useEffect(() => {
  setDestinations(destinationsData)
}, [])
4. useContext

useContext is used to share authentication information between components without passing the data through multiple levels of props.

The project uses an AuthContext to manage:

Current user
Login
Logout

The context is provided to the application through an AuthProvider.

5. Custom Hook

A reusable useForm Custom Hook is used for handling form data.

It provides:

Form state
Input change handling
Form reset functionality

The Custom Hook is located at:

src/hooks/useForm.js

It is used by the Login/Register page.

Technologies Used
Technology	Purpose
React.js	Frontend development
JavaScript	Application logic
Tailwind CSS	Styling and responsive UI
Vite	Development and build tool
HTML	Page structure
CSS	Additional styling
Git	Version control
GitHub	Code hosting
Project Structure
TravelMate-Trip-Planning-System/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── data/
│   │   └── destinations.js
│   │
│   ├── hooks/
│   │   └── useForm.js
│   │
│   ├── Pages/
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
Pages
Page	Description
Home	Introduction and navigation
Login/Register	User authentication interface
Destinations	Explore available destinations
Trip Planner	Create and plan a trip
User Dashboard	View user trip information
Admin Dashboard	View administrative information
Responsive Design

The application uses Tailwind CSS utility classes and responsive breakpoints to create layouts that work across different screen sizes.

Common responsive layouts are implemented using Tailwind classes such as:

sm:
md:
lg:
xl:

The application is designed to work on:

Mobile devices
Tablets
Laptops
Desktop screens
Getting Started
Prerequisites

Make sure the following are installed:

Node.js
npm
Git
Clone the Repository
git clone https://github.com/Tanishka-code/TravelMate-Trip-Planning-System.git

Move into the project directory:

cd TravelMate-Trip-Planning-System
Install Dependencies
npm install
Run the Development Server
npm run dev

Vite will provide a local development URL, usually:

http://localhost:5173

Open the URL in your browser to view the application.

Development

The project is being developed incrementally through practical experiments.

Experiment 1 - Responsive UI using Tailwind CSS

Concepts covered:

HTML structure
Tailwind CSS
Utility classes
Responsive design
Breakpoints
Flexbox
CSS Grid
Forms
Buttons
Cards
Hover states
Responsive layouts
Experiment 2 - React Hooks and State Management

Concepts covered:

useState
Controlled forms
onChange
onSubmit
useEffect
useContext
Context Provider
Custom Hooks
Reusable form logic
Future Scope

The project can be extended with:

Backend API integration
Real user authentication
Database integration
Real destination APIs
Trip storage
User profile management
Hotel and travel information
Admin CRUD operations
Search and filtering improvements
Deployment
Author

Tanishka Tawate

B.Tech Information Technology

GitHub Repository

https://github.com/Tanishka-code/TravelMate-Trip-Planning-System