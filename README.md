<h1 align="center">🌍 Toursite Web Application</h1>
<h2 align="center">A Comprehensive Travel & Tourism Management System</h2>

---

Toursite App is a full-featured platform designed to bridge the gap between travelers and travel agencies. It allows users to explore destinations, book curated tour packages, and manage transportation needs ranging from individual bus slots to private car rentals.

---

<h2>🚀 Key Features</h2>

<h3>🏝 Destination Booking</h3>
Explore Locations: Users can browse through various tourist destinations.  
Easy Booking: Integrated booking system with real-time availability.

---

<h3>🎒 Tour Packages</h3>
Company-Posted Packages: Travel companies can post multi-day packages (e.g., "3-Day Lahore, Karachi & Islamabad Tour").  
One-Click Booking: Simplified checkout for full tour packages.

---

<h3>🚗 Travel & Transport Management</h3>
Slot-Based Booking: Users can book single or multiple bus slots.  
Private Rentals: Option to book an entire private car for exclusive travel experience.

---

<h3>👤 User Experience</h3>
Intuitive UI for browsing and booking.  
Secure authentication with booking history tracking.  
Responsive design for desktop and mobile.

---

<h3>🛠 Admin/Company Dashboard (Planned)</h3>
Manage packages, destinations, transport, and bookings.

---

<h2>🧰 Tech Stack</h2>

Frontend: Next.js, Tailwind CSS, Redux Toolkit  
Backend: Node.js, Express.js  
Database: MongoDB  
Auth: JWT, Cookies  
API: Axios  
Mainly built using MERN Stack

---

<h2>📁 Project Structure</h2>

Toursite_App/

Backend/
├── controllers/   # API logic (bookings, packages)
├── models/        # MongoDB schemas
├── routes/        # API routes
├── middleware/    # Auth & validation
├── validators/    # Input validation
└── server.js      # Entry point

frontend/
├── public/        # Static assets
├── components/    # UI components
├── app/           # Pages (Next.js)
├── Libraries/     # Redux Toolkit, Thunks

---

<h2>⚙️ Environment Variables</h2>

<h3>🔹 Backend .env</h3>

Cloudinary_API_Key=your api key 
Cloudinary_API_SECRET=you secret key 
Cloudinary_Cloud_Name=your cloudnray cloudn name 

Connection=mongdb connection

FrontendURL=frontend url 


Publishable_Key=you publish eky of stripe
Stirpe_Secret_key=you strip key  

Resend_API_Key=your resent key 
SecretKey=your Secret key

---

<h3>🔹 Frontend .env</h3>

NEXT_PUBLIC_BackendURL=you backedn url  
NEXT_PUBLIC_Publishable_Key=your publc key

---

<h2>🚀 Getting Started</h2>

---

<h3>📦 Clone Repository</h3>

git clone https://github.com/smabdullah958/Toursite_App.git  
cd Toursite_App  

---

<h3>⚙️ Backend Setup</h3>

cd Backend  
npm install  
npm run start  

---

<h3>🎨 Frontend Setup</h3>

cd ../frontend  
npm install  
npm run dev  

---

<h2>🔗 System Architecture</h2>

User → Frontend (Next.js) → Backend (Express.js API) → MongoDB Database  

Frontend ↔ Backend ↔ JWT Authentication ↔ Database  

---

<h2>👨‍💻 Author</h2>

Created by **smabdullah958**  
Happy Traveling! 🌍✨  

---

⭐ If you like this project, don’t forget to star the repository!
