A responsive, modern Admin Dashboard built for an E-learning platform using **Next.js App Router**, featuring Firebase authentication, clean UI, API routes, and dynamic stats!

## Tech Stack

| Tool/Library      | Purpose                                   |
|-------------------|-------------------------------------------|
| **Next.js**       | Framework for frontend + backend (App Router) |
| **TypeScript**    | Static typing and better error handling   |
| **Firebase Auth** | Login/logout authentication                |
| **Prisma**        | Database for API route integration         |
| **Lucide React**  | Icon set used for navigation and stats     |
| **API Routes**    | Backend logic (fetching dashboard stats)  |
| **Responsive UI** | Works perfectly on mobile, tablet, and desktop |

## Installation Guide

### 1. Clone the Repository

    git clone https://github.com/maim21/seeds-admin-dashboard.git
    cd seeds-admin-dashboard

### 2. Install Dependencies

    npm install
    # or
    yarn install

### 3. Environment Variables

Make sure your environment variables are set up correctly.

### 4. Set up Database

    npx prisma generate
    npx prisma migrate dev

### 5. Run the App

    npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser or whichever port the terminal shows.

### 6. Open Prisma Studio (optional)

    npx prisma studio

## Demo Credentials

- **Email:** admin@seeds.com  
- **Password:** 12345678

## Features 

- Responsive UI  
- Firebase Login Authentication  
- Dashboard with dynamic statistics  
- Prisma API routes  
- Sidebar with Lucide icons  
- Logout functionality via Firebase  
- Gradient login background and animations  

## Insight / Challenge

Even though I’m confident in my web development skills, it had been a while since I last worked on a complete project, my recent focus was on Flutter mobile apps. Implementing this tech stack required brushing up on several frameworks and tools, which took a few days and a lot of patience. Additionally, this was my first time successfully integrating Firebase Authentication into a website, having only done it in mobile applications before. This experience was a valuable learning moment and helped me grow across the full stack confidently.