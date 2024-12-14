import React, { useState } from "react";
import axios from "axios";

const VideoUpload = () => {
    const [userId, setUserId] = useState("");
    const [videoId, setVideoId] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!userId || !videoId || !file) {
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

    return (
        <div>
            <h1>Upload Video</h1>
            <form onSubmit={handleUpload}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Video ID:</label>
                    <input
                        type="text"
                        value={videoId}
                        onChange={(e) => setVideoId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Video File:</label>
                    <input type="file" accept="video/*" onChange={handleFileChange} required />
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VideoUpload;
