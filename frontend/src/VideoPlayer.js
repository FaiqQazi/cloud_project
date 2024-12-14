import React, { useEffect, useState } from "react";

const VideoPlayer = ({ userId, videoId }) => {
    const [error, setError] = useState(null);
    const videoSrc = `http://localhost:4002/video?userId=${userId}&videoId=${encodeURIComponent(videoId)}`;

    useEffect(() => {
        console.log(`VideoPlayer initialized for userId: ${userId}, videoId: ${videoId}`);
        console.log(`Video source URL: ${videoSrc}`);
    }, [userId, videoId, videoSrc]);

    const handleError = () => {
        console.error(`Error loading video from ${videoSrc}`);
        setError("Failed to load video. Please try again later.");
    };

    return (
        <div>
            <h1>Video Player</h1>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <video controls width="800" onError={handleError}>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default VideoPlayer;
