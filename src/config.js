const config = {
    apiUrl: process.env.REACT_APP_API_URL || "https://seahorse-app-3hijq.ondigitalocean.app",
    endpoints: {
        upload: '/api/upload',
        downloads: '/api/downloads',
        songs: '/api/songs',
        files: '/api/files'
    }
};

export default config;