const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    endpoints: {
        upload: '/api/upload',
        downloads: '/api/downloads',
        songs: '/api/songs',
        files: '/api/files'
    }
};

export default config;