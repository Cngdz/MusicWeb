# Music Web App - React & Flask

This project is a full-stack music web application built with React (frontend) and Flask (backend). It supports music upload, download, playback, lyrics extraction, and Dockerized deployment.

## Features

- 🎵 Upload, download, and play music files
- ❤️ Mark songs as favorites
- 📥 Download songs for offline use
- 📝 Extract lyrics from audio files (Vietnamese supported)
- 🐳 Docker Compose for easy deployment (frontend & backend)
- 🔥 Fast Whisper-based lyrics transcription (multi-threaded)
- Persistent storage for uploads, downloads, and database

## Project Structure

```
my-music-app/
├── backend/                  # Flask backend
│   ├── app/                  # Application code
│   ├── instance/             # Instance folder for configuration
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile            # Dockerfile for backend
├── frontend/                 # React frontend
│   ├── public/               # Public files
│   ├── src/                  # React components and hooks
│   ├── package.json           # JavaScript dependencies
│   └── Dockerfile            # Dockerfile for frontend
├── docker-compose.yml        # Docker Compose file
└── README.md                 # Project documentation
```

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Basic knowledge of React and Flask.

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/yourusername/my-music-app.git
   ```
2. Change directory to the project folder
   ```bash
   cd my-music-app
   ```
3. Copy the example environment file
   ```bash
   cp backend/.env.example backend/.env
   ```
4. Update the environment variables in `backend/.env` as needed.

### Running the Application

1. Build and start the containers
   ```bash
   docker-compose up --build
   ```
2. Access the application at `http://localhost:3000`.

### Stopping the Application

To stop the application, press `CTRL+C` in the terminal where it's running, and then run:

```bash
docker-compose down
```

## Usage

- **Frontend**: The React app provides a user interface for interacting with the music library, uploading files, and managing favorites.
- **Backend**: The Flask API handles requests from the frontend, processes audio files, and interacts with the database.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.


---
 