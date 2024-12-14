const express = require("express");
const http = require("http");
const mongodb = require("mongodb");
const cors = require("cors"); // Import CORS middleware

const app = express();

// Enable CORS for all routes
app.use(cors());  // Allows all origins, you can customize if needed


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

            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));

            // Forward video upload request to the second service and insert into MongoDB
            app.post("/upload", (req, res) => {
                const userId = req.headers.userid; // Get the userId from the headers
                const videoId = req.headers.id;    // Get the videoId from the headers
                const contentType = req.headers["content-type"];  // Get content type from headers

                if (!userId || !videoId) {
                    return res.status(400).send("Missing 'userid' or 'id' header for video upload.");
                }

                // Insert the video details into the 'user_videos' collection
                userVideosCollection.insertOne({ userId: parseInt(userId), videoId: videoId })
                    .then(() => {
                        console.log(`Inserted video record for user ${userId}: ${videoId}`);
                    })
                    .catch(err => {
                        console.error("Failed to insert video record into database:", err);
                        res.sendStatus(500);
                    });

                // Forward the request to the second service for upload
                const forwardRequest = http.request(
                    {
                        host: VIDEO_STORAGE_HOST,
                        port: VIDEO_STORAGE_PORT,
                        path: '/upload',
                        method: 'POST',
                        headers: {
                            ...req.headers,  // Forward all the original headers
                        }
                    },
                    forwardResponse => {
                        // Handle the response from the second service
                        res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
                        forwardResponse.pipe(res);
                    }
                );

                // Pipe the request body (video data) to the second service's upload endpoint
                req.pipe(forwardRequest)
                    .on('error', err => {
                        console.error("Error forwarding the upload request:", err);
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
    .then(() => console.log("Microservice online for video upload is online"))
    .catch(err => {
        console.error("Microservice for video upload failed to start.");
        console.error(err && err.stack || err);
    });
