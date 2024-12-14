import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoUpload from "./VideoUpload";
import VideoList from "./VideoList";
import VideoPlayer from "./VideoPlayer";
import { useParams } from 'react-router-dom';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VideoList userId={1} />} />
                <Route path="/upload" element={<VideoUpload />} />
                <Route path="/video/:userId/:videoId" element={<VideoPlayerWrapper />} />
            </Routes>
        </Router>
    );
};

const VideoPlayerWrapper = () => {
    const { userId, videoId } = useParams();
    return <VideoPlayer userId={userId} videoId={videoId} />;
};

export default App;
