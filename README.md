
# Project Title : Newspaper FullStack Website

# Website Name: The Voice Daily

The News Daily is a modern full-stack newspaper website designed to deliver a seamless and engaging reading experience. It combines a responsive React frontend with a powerful Node.js and MongoDB backend to handle dynamic content efficiently. The platform supports multiple user roles and ensures secure authentication while managing article submission, approval, and publication workflows.

With a focus on delivering categorized news enriched by tags and publisher details, it offers premium content access to subscribers and robust content management tools for administrators.




## 🚀🚀 Live Site :
 https://the-voice-daily.netlify.app/ 

 ## Admin Login Info :

 E-mail: newspaper@admin.com

 PassWord: 123456


# Installation & Setup Guide

### Prerequisites
*(Prerequisites means the things you need to have or prepare before you can run the project)*

- **Node.js** (version 16 or above) — [Download here](https://nodejs.org/)  
- **npm** (comes with Node.js)
- A **Firebase project** with Authentication enabled (Email/Google sign-in)

---
## Steps to Run Locally

### 1. **Clone the repository**
```bash
  git clone https://github.com/khalidhossain5000/the-voice-daily-newspaper-web-app.git

  cd the-voice-daily-newspaper-web-app

```

### 2.Install dependencies

```bash
### Using npm:

  npm install

  cd the-voice-daily-newspaper-web-app

```
### 3.Set up Firebase configuration

- Create a Firebase project in the Firebase Console.
- Enable Authentication methods (Email, Google sign-in).
- Copy your Firebase config object from project settings.
- Create a .env file in the root folder and add:

```bash

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```
### Replace the values with your Firebase config.

### 4.Start the development server
```bash

npm run dev

```
###  Open your browser and go to
```bash

http://localhost:3000


```
## Your app should now be running locally!


## Features

- Secure Authentication with Firebase
- Role-based access control (User, Premium User, Admin)
- User profile management and editing
- Article submission by users.
- Responsive design optimized for desktop, tablet, and mobile.
- Role-based access control for Users, and Admins.
- Premium content access with subscription and expiry.
- Browse, search, and filter news articles by tags and publishers
- Admin dashboard for managing articles and users
- Notification and Toast Alerts.
- Role assignment and user management by admins
- Article statistics (views, likes)
- CORS configured securely
- Token Authentication.
- Form validation with React Hook Form or custom logic
- Integration of Google Charts in the admin dashboard
- Trending Article

## Main Technologies Used :

- **Frontend:** React, Tailwind CSS, Firebase,Firebase Authentications,TanStack Query
- **Backend:** Node.js, Express.js, MongoDB,Cors
- **Deployment:** Vercel, Netlify


## Dependencies  :

### FrontEnd : 

- @stripe/react-stripe-js
- @stripe/stripe-js
- @tailwindcss/vite
- @tanstack/react-query
- axios
- firebase
- gsap animations
- react
- react-awesome-button
- react-countup
- react-dom
- react-google-charts
- react-hook-form
- react-hot-toast
- react-icons
- react-modal
- react-router
- react-select
- react-simple-typewriter
- react-spinners
- sweetalert2
- swiper
- tailwindcss


## Dependencies  :

### BackEnd : 

- cors
- dotenv
- express
- firebase-admin
- mongodb
- stripe
