const express = require("express");
const http = require("http");
const mongodb = require("mongodb");

const app = express();

// Ensure all required environment variables are set
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.VIDEO_STORAGE_HOST) {
    throw new Error("Please specify the host name for the video storage microservice in variable VIDEO_STORAGE_HOST.");
}

if (!process.env.VIDEO_STORAGE_PORT) {
    throw new Error("Please specify the port number for the video storage microservice in variable VIDEO_STORAGE_PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the database host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME.");
}

const PORT = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

console.log(`Forwarding video requests to ${VIDEO_STORAGE_HOST}:${VIDEO_STORAGE_PORT}.`);

function main() {
    return mongodb.MongoClient.connect(DBHOST) // Connect to the database
        .then(client => {
            const db = client.db(DBNAME);
            const userVideosCollection = db.collection("user_videos"); // Access the user_videos collection

            app.get("/video", (req, res) => {
                const userId = parseInt(req.query.userId);  // Get the userId from the query parameters

                // Query the 'user_videos' collection to get the associated video path (videoId is the path)
                userVideosCollection.findOne({ userId: userId })
                    .then(userVideoRecord => {
                        if (!userVideoRecord) {
                            res.status(404).send("User has no videos.");
                            return;
                        }

                        const videoPath = userVideoRecord.videoId;  // videoId now contains the path directly
                        console.log(`User ${userId} has video path ${videoPath}`);

                        // Forward the request to the video storage microservice with the video path
                        const forwardRequest = http.request( // Forward the request to the video storage microservice.
                            {
                                host: VIDEO_STORAGE_HOST,
                                port: VIDEO_STORAGE_PORT,
                                path: `/video?path=${encodeURIComponent(videoPath)}`,  // Use the videoPath
                                method: 'GET',
                                headers: req.headers
                            },
                            forwardResponse => {
                                res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
                                forwardResponse.pipe(res);
                            }
                        );
                        
                        req.pipe(forwardRequest);
                    })
                    .catch(err => {
                        console.error("Failed to find user video record.");
                        console.error(err && err.stack || err);
                        res.sendStatus(500);
                    });
            });

            // Start the HTTP server
            app.listen(PORT, () => {
                console.log(`Microservice listening on port ${PORT}.`);
            });
        });
}

main()
    .then(() => console.log("Microservice online of video streaming is online "))
    .catch(err => {
        console.error("Microservice of video streaming failed to start.");
        console.error(err && err.stack || err);
    });
