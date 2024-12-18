// import React, { useState } from "react";
// import axios from "axios";

// const VideoUpload = () => {
//     const [userId, setUserId] = useState("");
//     const [videoId, setVideoId] = useState("");
//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState("");

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleUpload = async (e) => {
//         e.preventDefault();

//         if (!userId || !videoId || !file) {
//             setMessage("Please fill in all fields and select a video file.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             console.log("Uploading video with data:", { userId, videoId, file });
//             const response = await axios.post(
//                 `http://localhost:4003/upload`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": file.type,
//                         "userid": userId,
//                         "id": videoId,
//                     },
//                 }
//             );

//             console.log("Upload response:", response.data);
//             setMessage(`Video uploaded successfully: ${response.data}`);
//         } catch (error) {
//             console.error("Error uploading video:", error);
//             setMessage("Failed to upload video. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h1>Upload Video</h1>
//             <form onSubmit={handleUpload}>
//                 <div>
//                     <label>User ID:</label>
//                     <input
//                         type="text"
//                         value={userId}
//                         onChange={(e) => setUserId(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Video ID:</label>
//                     <input
//                         type="text"
//                         value={videoId}
//                         onChange={(e) => setVideoId(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Video File:</label>
//                     <input type="file" accept="video/*" onChange={handleFileChange} required />
//                 </div>
//                 <button type="submit">Upload</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default VideoUpload;
import React, { useState } from "react";
import axios from "axios";

const VideoUpload = ({ userId }) => {
    const [videoId, setVideoId] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!videoId || !file) {
            setMessage("Please fill in all fields and select a video file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("Uploading video with data:", { userId, videoId, file });
            const response = await axios.post(
                `http://localhost:4003/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": file.type,
                        "userid": userId,
                        "id": videoId,
                    },
                }
            );

            console.log("Upload response:", response.data);
            setMessage(`Video uploaded successfully: ${response.data}`);
        } catch (error) {
            console.error("Error uploading video:", error);
            setMessage("Failed to upload video. Please try again.");
        }
    };

    // Inline CSS styles
    const styles = {
        container: {
            padding: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            fontFamily: "Arial, sans-serif",
        },
        header: {
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        },
        input: {
            padding: "10px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "100%",
        },
        button: {
            padding: "12px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
        message: {
            textAlign: "center",
            marginTop: "20px",
            fontSize: "16px",
            color: "#007bff",
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Upload Video</h1>
            <form onSubmit={handleUpload} style={styles.form}>
                {/* Removed the userId input, as it's now passed as a prop */}
                <div>
                    <label>Video ID:</label>
                    <input
                        type="text"
                        value={videoId}
                        onChange={(e) => setVideoId(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div>
                    <label>Video File:</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Upload</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

export default VideoUpload;
