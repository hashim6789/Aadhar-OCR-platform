# 📝 Aadhar OCR System

This is a full-stack **Aadhar OCR System** that is fully containerized using **Docker**. It includes a frontend (built with Vite/React), a Node.js backend, and an NGINX server for reverse proxy and static content serving. The system processes Aadhar card images to extract and store user data, and allows retrieval of stored data using Aadhar number and date of birth.

## 📦 Project Structure
```
📂 aadhar-ocr-system/
├── 🗂 backend/              # Backend API (Node.js/Express)
│   ├── 📄 Dockerfile       # Backend Docker configuration
│   └── 📄 .env            # Backend environment variables
├── 🗂 frontend/            # Frontend application (Vite/React)
│   ├── 📄 Dockerfile       # Frontend Docker configuration
│   └── 📄 .env            # Frontend environment variables
├── 📄 nginx.conf          # Custom NGINX configuration
├── 📄 docker-compose.yml  # Docker Compose setup
└── 📄 README.md           # Project documentation
```

## 🚀 Technologies Used
- **Frontend**: Vite, React
- **Backend**: Node.js, Express
- **Database**: MongoDB (or similar, configured in Docker)
- **Web Server**: NGINX (Alpine)
- **Containerization**: Docker, Docker Compose

## 📋 Features
The application provides two main APIs:
1. **Upload API**: Accepts front and back images of an Aadhar card, processes them using OCR, and saves the extracted user data to the database.
2. **Fetch API**: Retrieves user data from the database using the Aadhar number and date of birth, without requiring image uploads.

## 🐳 Docker Setup
The app consists of three main services:

### 1. `nginx`
- Acts as a reverse proxy for frontend and backend.
- Serves the built frontend files.
- Uses a custom `nginx.conf` for configuration.

### 2. `frontend`
- Runs the frontend app using `npm run dev`.
- Builds from Dockerfile in `./frontend`.
- Exposes port `3000`.

### 3. `backend`
- Runs the backend server with `npm run dev`.
- Builds from Dockerfile in `./backend`.
- Exposes port `5000`.

## 📁 Volumes
- `aadhar-frontend-dist`: Shared volume between frontend and nginx for built files.
- Backend and frontend use volumes for live reload during development.

## 🛠️ How to Run
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/hashim6789/aadhar-ocr-system.git
   cd aadhar-ocr-system
   ```

2. **Add Environment Variables**  
   Create `.env` files in `frontend/` and `backend/` directories. Example:
   - `frontend/.env`:
     ```
     VITE_SERVER_ORIGIN=http://localhost:5000
     ```
   - `backend/.env`:
     ```
     PORT=5000
     MONGO_URI=mongodb://mongo:27017/aadhar_db
     ```

3. **Start the Project using Docker Compose**  
   ```bash
   docker-compose up --build
   ```

4. **Access the App**  
   - Frontend: `http://localhost`
   - Backend API: `http://localhost:5000`

## 🧾 Custom NGINX Configuration
Ensure your `nginx.conf` file properly routes traffic:
```nginx
http {
  server {
    listen 80;
    location / {
      root /usr/share/nginx/html;
      index index.html index.htm;
      try_files $uri $uri/ /index.html;
    }

    location /api/ {
      proxy_pass http://aadhar-backend:5000/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
}
```

## 📌 Notes
- `VITE_SERVER_ORIGIN` is set as an environment variable inside the frontend container.
- Frontend and backend use the command `npm run dev` for development mode.
- Ensure a MongoDB service is included in `docker-compose.yml` for data persistence.

## 🧠 Future Improvements
- Add production builds and static file serving.
- Implement authentication and role-based access control.
- Enhance OCR accuracy with advanced image processing libraries.
- Add input validation and error handling for Aadhar number and DOB.

## 🧑‍💻 Author
**hashim6789**  
[LinkedIn](https://www.linkedin.com/in/hashim6789) | [GitHub](https://github.com/hashim6789)

---

> Feel free to fork and enhance this project.
