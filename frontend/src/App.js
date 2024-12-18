// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import VideoUpload from "./VideoUpload";
// import VideoList from "./VideoList";
// import VideoPlayer from "./VideoPlayer";
// import { useParams } from 'react-router-dom';


// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<VideoList userId={1} />} />
//                 <Route path="/upload" element={<VideoUpload />} />
//                 <Route path="/video/:userId/:videoId" element={<VideoPlayerWrapper />} />
//             </Routes>
//         </Router>
//     );
// };

// const VideoPlayerWrapper = () => {
//     const { userId, videoId } = useParams();
//     return <VideoPlayer userId={userId} videoId={videoId} />;
// };

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import VideoUpload from "./VideoUpload";
import VideoList from "./VideoList";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import axios from "axios";

const App = () => {
    const [userId, setUserId] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setUserId={setUserId} />} />
                <Route path="/videos/:userId" element={<VideoListWrapper />} />
                <Route path="/upload" element={<VideoUpload userId={userId} />} />
                <Route path="/video/:userId/:videoId" element={<VideoPlayerWrapper />} />
            </Routes>
        </Router>
    );
};

const Login = ({ setUserId }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:4007/authenticate", {
                username: username,  // Send username in the body
                password: password,  // Send password in the body
            }, {
                headers: {
                    'Content-Type': 'application/json',  // Ensure the content type is set to JSON
                },
            });
            
            

            const { userId } = response.data; // Assuming API returns userId on success
            if (userId) {
                setUserId(userId); // Store the userId in state
                navigate(`/videos/${userId}`); // Redirect to VideoList with userId
            }
        } catch (err) {
            setError("Invalid username or password.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ margin: "10px", padding: "8px" }}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ margin: "10px", padding: "8px" }}
            />
            <br />
            <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
                Login
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

const VideoListWrapper = () => {
    const { userId } = useParams();
    return <VideoList userId={userId} />;
};

const VideoPlayerWrapper = () => {
    const { userId, videoId } = useParams();
    return <VideoPlayer userId={userId} videoId={videoId} />;
};

export default App;
