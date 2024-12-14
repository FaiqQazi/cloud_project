// import axios from "axios";

// const videoStreamingHost = process.env.REACT_APP_VIDEO_STREAMING_HOST;
// const videoStreamingPort = process.env.REACT_APP_VIDEO_STREAMING_PORT;

// const api = {
//     fetchUserVideos: (userId) =>
//         axios.get(`http://${videoStreamingHost}:${videoStreamingPort}/videos?userId=${userId}`),
//     streamVideo: (videoId) =>
//         `http://${videoStreamingHost}:${videoStreamingPort}/video?path=${encodeURIComponent(videoId)}`,
// };

// export default api;
// import axios from "axios";

// // Hardcoded values
// const videoStreamingHost = 'video-streaming'; // Service name in docker-compose.yml
// const videoStreamingPort = '80'; // Port exposed by the video-streaming container

// const api = {
//     fetchUserVideos: (userId) =>
//         axios.get(`http://${videoStreamingHost}:${videoStreamingPort}/videos?userId=${userId}`),
//     streamVideo: (videoId) =>
//         `http://${videoStreamingHost}:${videoStreamingPort}/video?path=${encodeURIComponent(videoId)}`,
// };

// export default api;
import axios from "axios";

// Hardcoded values for localhost and port 4002
const videoStreamingHost = 'localhost'; // Change to 'localhost' for local development
const videoStreamingPort = '4002'; // Port 4002

const api = {
    fetchUserVideos: (userId) =>
        axios.get(`http://${videoStreamingHost}:${videoStreamingPort}/videos?userId=${userId}`),
    streamVideo: (videoId) =>
        `http://${videoStreamingHost}:${videoStreamingPort}/video?path=${encodeURIComponent(videoId)}`,
};

export default api;