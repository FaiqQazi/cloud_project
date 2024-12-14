import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import { useNavigate } from "react-router-dom";

const VideoList = ({ userId }) => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // Access environment variables
    const videoStreamingHost = process.env.REACT_APP_VIDEO_STREAMING_HOST;
    const videoStreamingPort = process.env.REACT_APP_VIDEO_STREAMING_PORT;

    useEffect(() => {
        console.log(`Fetching videos for userId: ${userId}`);
        api.fetchUserVideos(userId)
            .then((response) => {
                console.log("Videos fetched successfully:", response.data);
                setVideos(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching videos:", err.message);
                setError(err.message);
                setLoading(false);
            });
    }, [userId]);

    // if (loading) return <div>Loading videos...</div>;
    // if (error) return <div>Error: {error}</div>;
    // if (videos.length === 0) return <div>No videos available for this user.</div>;

    return (
        <div>

            <h1>User Videos</h1>
            <button onClick={() => navigate("/upload")}>Upload Video</button>
            <ul>
                {videos.map((video) => (
                    <li key={video.videoId}>
                        <Link to={`/video/${userId}/${encodeURIComponent(video.videoId)}`}>
                            {video.videoId}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoList;
