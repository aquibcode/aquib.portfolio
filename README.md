# Aquib Portfolio

A modern MERN-style portfolio for Aquib, a Machine Learning Engineer at IIT Madras. The site presents personal branding, AI/ML skills, featured projects, professional journey, creator work, and a working contact form backed by an Express API with optional MongoDB storage.

## Links

- Repository: https://github.com/aquibcode/aquib.portfolio
- Temporary live preview: https://shield-neuter-alkaline.ngrok-free.dev
- Local development: http://localhost:5174

> Note: The ngrok preview link works only while the local development server and ngrok tunnel are running.

## Features

- Responsive portfolio landing page built for desktop and mobile
- Animated hero section with typewriter text
- Smooth scrolling navigation with mobile menu
- About, skills, projects, journey, content, and contact sections
- Project cards with expandable details
- Contact form API using Express
- Optional MongoDB storage for contact messages
- Public sharing through ngrok
- Production build with Vite

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Icons: Lucide React
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Dev tooling: Concurrently, PostCSS, Autoprefixer
- Sharing: ngrok

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aquibcode/aquib.portfolio.git
cd aquib.portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
CLIENT_ORIGIN=http://127.0.0.1:5174
MONGODB_URI=mongodb://127.0.0.1:27017/aquib_portfolio
```

MongoDB is optional. If `MONGODB_URI` is missing or MongoDB is not connected, the contact API still accepts messages and logs them in the server console.

### 4. Run the development server

```bash
npm run dev
```

The client runs on:

```text
http://localhost:5174
```

The API runs on:

```text
http://localhost:5000
```

## Available Scripts

```bash
npm run dev
```

Starts both the Express server and Vite client.

```bash
npm run dev:client
```

Starts only the Vite frontend on port `5174`.

```bash
npm run dev:server
```

Starts only the Express API server on port `5000`.

```bash
npm run build
```

Creates a production build in the `dist` folder.

```bash
npm run preview
```

Previews the production build locally on port `4174`.

```bash
npm run share
```

Starts an ngrok tunnel for the local site on port `5174`.

```bash
npm start
```

Runs the Express server. If `dist` exists, it also serves the production frontend.

## Share The Site With ngrok

First start the app:

```bash
npm run dev
```

Then open another terminal and run:

```bash
npm run share
```

ngrok will print a public HTTPS URL that can be shared with anyone. The Vite config already allows ngrok free domains:

```js
allowedHosts: [".ngrok-free.dev", ".ngrok-free.app"]
```

If ngrok asks for authentication, add your token once:

```bash
npx ngrok config add-authtoken YOUR_TOKEN_HERE
```

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── public/
├── server/
│   ├── index.js
│   └── models/
│       └── ContactMessage.js
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── data/
        └── portfolio.js
```

## Contact API

Health check:

```http
GET /api/health
```

Submit a contact message:

```http
POST /api/contact
Content-Type: application/json

{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Hello Aquib"
}
```

## Deployment Notes

For a static frontend-only deployment, use the Vite build output from `dist`.

For the full contact form with backend support, deploy both:

- Frontend build from `dist`
- Express server from `server/index.js`

Set `CLIENT_ORIGIN` to your deployed frontend URL and `MONGODB_URI` to your production MongoDB connection string.

## Author

Aquib - Machine Learning Engineer at IIT Madras

- GitHub: https://github.com/aquibcode
- LinkedIn: https://www.linkedin.com/in/mdaqib
- YouTube: https://www.youtube.com/@mdaquib3736
