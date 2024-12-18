// import React, { useEffect, useState } from "react";

// const VideoPlayer = ({ userId, videoId }) => {
//     const [error, setError] = useState(null);
//     const videoSrc = `http://localhost:4002/video?userId=${userId}&videoId=${encodeURIComponent(videoId)}`;

//     useEffect(() => {
//         console.log(`VideoPlayer initialized for userId: ${userId}, videoId: ${videoId}`);
//         console.log(`Video source URL: ${videoSrc}`);
//     }, [userId, videoId, videoSrc]);

//     const handleError = () => {
//         console.error(`Error loading video from ${videoSrc}`);
//         setError("Failed to load video. Please try again later.");
//     };

//     return (
//         <div>
//             <h1>Video Player</h1>
//             {error ? (
//                 <div>Error: {error}</div>
//             ) : (
//                 <video controls width="800" onError={handleError}>
//                     <source src={videoSrc} type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             )}
//         </div>
//     );
// };

// export default VideoPlayer;
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

    // Inline CSS styles
    const styles = {
        container: {
            padding: "20px",
            maxWidth: "900px",
            margin: "0 auto",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
        },
        header: {
            fontSize: "24px",
            marginBottom: "20px",
            color: "#333",
        },
        videoContainer: {
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
        },
        video: {
            maxWidth: "100%",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        error: {
            color: "#dc3545",
            fontSize: "18px",
            marginTop: "20px",
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Video Player</h1>
            {error ? (
                <div style={styles.error}>Error: {error}</div>
            ) : (
                <div style={styles.videoContainer}>
                    <video
                        controls
                        width="800"
                        style={styles.video}
                        onError={handleError}
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
