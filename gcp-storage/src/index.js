const express = require("express");
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const app = express();

// Check if all required environment variables are set
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.GCS_BUCKET_NAME) {
    throw new Error("Please specify the Google Cloud Storage bucket name in environment variable GCS_BUCKET_NAME.");
}

//
// Extract environment variables for convenience.
//

const PORT = process.env.PORT;
const GCS_BUCKET_NAME = process.env.GCS_BUCKET_NAME;

console.log(`Serving videos from Google Cloud Storage bucket ${GCS_BUCKET_NAME}.`);

// Create the Google Cloud Storage client
const storage = new Storage();

// Retrieve the GCS bucket
const bucket = storage.bucket(GCS_BUCKET_NAME);

//
// HTTP GET route to retrieve videos from GCS storage.
//
app.get("/video", (req, res) => {
    const videoPath = req.query.path;
    console.log(`Streaming video from GCS path ${videoPath}.`);

    // Check if the file exists in the GCS bucket
    const file = bucket.file(videoPath);

    file.exists()
        .then(([exists]) => {
            if (!exists) {
                console.error(`Video not found at path: ${videoPath}`);
                return res.sendStatus(404);
            }

            // Get metadata about the video file (to retrieve its size)
            return file.getMetadata();
        })
        .then(([metadata]) => {
            // Set appropriate response headers based on the file metadata
            res.setHeader('Content-Length', metadata.size);
            res.setHeader('Content-Type', 'video/mp4');
            res.status(200);

            // Stream the video directly to the response
            file.createReadStream()
                .pipe(res)
                .on('error', err => {
                    console.error('Error occurred while streaming the video from GCS:', err);
                    res.sendStatus(500);
                });
        })
        .catch(err => {
            console.error('Error retrieving video from GCS:', err);
            res.sendStatus(500);
        });
});

// Starts the HTTP server
app.listen(PORT, () => {
    console.log(`Microservice online, listening on port ${PORT}`);
});
