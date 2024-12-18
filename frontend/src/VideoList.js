// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "./api";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const VideoList = ({ userId }) => {
//     const [videos, setVideos] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     // Access environment variables
//     const videoStreamingHost = process.env.REACT_APP_VIDEO_STREAMING_HOST;
//     const videoStreamingPort = process.env.REACT_APP_VIDEO_STREAMING_PORT;

//     useEffect(() => {
//         console.log(`Fetching videos for userId: ${userId}`);
//         api.fetchUserVideos(userId)
//             .then((response) => {
//                 console.log("Videos fetched successfully:", response.data);
//                 setVideos(response.data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error fetching videos:", err.message);
//                 setError(err.message);
//                 setLoading(false);
//             });
//     }, [userId]);

//     // Handle delete video
//     const handleDelete = async (videoId) => {
//         try {
//             console.log(`Attempting to delete video with id: ${videoId} for user ${userId}`);

//             // Make the DELETE request to the video-delete microservice
//             const response = await axios.delete("http://localhost:4005/delete", {
//                 headers: {
//                     userid: userId,
//                     id: videoId,
//                 },
//             });

//             if (response.status === 200) {
//                 console.log(`Video with id ${videoId} deleted successfully`);
//                 // Update the video list after successful deletion
//                 setVideos(videos.filter((video) => video.videoId !== videoId));
//             } else {
//                 console.error(`Failed to delete video with id ${videoId}`);
//                 setError(`Failed to delete video with id ${videoId}`);
//             }
//         } catch (error) {
//             console.error("Error deleting video:", error);
//             setError("Failed to delete video. Please try again.");
//         }
//     };

//     // If the page is loading or there's an error
//     if (loading) return <div>Loading videos...</div>;
//     if (error) return <div>Error: {error}</div>;
//     if (videos.length === 0) return <div>No videos available for this user.</div>;

//     return (
//         <div>
//             <h1>User Videos</h1>
//             <button onClick={() => navigate("/upload")}>Upload Video</button>
//             <ul>
//                 {videos.map((video) => (
//                     <li key={video.videoId}>
//                         <Link to={`/video/${userId}/${encodeURIComponent(video.videoId)}`}>
//                             {video.videoId}
//                         </Link>
//                         <button onClick={() => handleDelete(video.videoId)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default VideoList;



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
        },
        header: {
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "20px",
            color: "#333",
        },
        button: {
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            textAlign: "center",
            display: "inline-block",
            fontSize: "16px",
            marginBottom: "20px",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
        list: {
            listStyleType: "none",
            paddingLeft: "0",
        },
        listItem: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#fff",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        link: {
            textDecoration: "none",
            color: "#007bff",
            fontSize: "16px",
        },
        deleteButton: {
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
        },
        error: {
            color: "#dc3545",
            textAlign: "center",
            marginTop: "20px",
        },
        loading: {
            textAlign: "center",
            marginTop: "20px",
            fontSize: "18px",
            color: "#007bff",
        },
        noVideos: {
            textAlign: "center",
            fontSize: "18px",
            color: "#6c757d",
            marginTop: "20px",
        }
    };

    // If the page is loading or there's an error
    if (loading) return <div style={styles.loading}>Loading videos...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;
    if (videos.length === 0) return <div style={styles.noVideos}>No videos available for this user.</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>User Videos</h1>
            <button
                style={styles.button}
                onClick={() => navigate("/upload")}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
                Upload Video
            </button>
            <ul style={styles.list}>
                {videos.map((video) => (
                    <li key={video.videoId} style={styles.listItem}>
                        <Link to={`/video/${userId}/${encodeURIComponent(video.videoId)}`} style={styles.link}>
                            {video.videoId}
                        </Link>
                        <button
                            style={styles.deleteButton}
                            onClick={() => handleDelete(video.videoId)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoList;
