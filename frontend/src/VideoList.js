import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    // Handle delete video
    const handleDelete = async (videoId) => {
        try {
            console.log(`Attempting to delete video with id: ${videoId} for user ${userId}`);

            // Make the DELETE request to the video-delete microservice
            const response = await axios.delete("http://localhost:4005/delete", {
                headers: {
                    userid: userId,
                    id: videoId,
                },
            });

            if (response.status === 200) {
                console.log(`Video with id ${videoId} deleted successfully`);
                // Update the video list after successful deletion
                setVideos(videos.filter((video) => video.videoId !== videoId));
            } else {
                console.error(`Failed to delete video with id ${videoId}`);
                setError(`Failed to delete video with id ${videoId}`);
            }
        } catch (error) {
            console.error("Error deleting video:", error);
            setError("Failed to delete video. Please try again.");
        }
    };

    // If the page is loading or there's an error
    if (loading) return <div>Loading videos...</div>;
    if (error) return <div>Error: {error}</div>;
    if (videos.length === 0) return <div>No videos available for this user.</div>;

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
                        <button onClick={() => handleDelete(video.videoId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoList;
