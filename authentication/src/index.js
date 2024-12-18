const express = require("express");
const http = require("http");
const mongodb = require("mongodb");
const cors = require("cors"); // Import CORS middleware

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json()); // <-- Add this line

// Enable CORS for all routes
app.use(cors()); 

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the database host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME.");
}

// Authentication route
app.post("/authenticate", (req, res) => {
    const { username, password } = req.body;


    console.log("Authentication request received.");
    console.log("Username:", username);
    console.log("Password:", password);

    if (!username || !password) {
        console.log("Missing username or password.");
        return res.status(400).json({ message: "Username and password are required." });
    }

    // Connect to MongoDB and find the user
    console.log("Connecting to MongoDB...");
    mongodb.MongoClient.connect(process.env.DBHOST)
        .then((client) => {
            const db = client.db(process.env.DBNAME);
            const usersCollection = db.collection("users"); // Access the 'users' collection

            console.log("MongoDB connected. Searching for user...");
            // Query the users collection to find a matching username and password
            usersCollection.findOne({ username: username, password: password })
                .then((user) => {
                    if (user) {
                        console.log("User found:", user);
                        return res.status(200).json({ message: "Login successful", userId: user.userId });
                    } else {
                        console.log("Invalid credentials: No user found.");
                        return res.status(401).json({ message: "Invalid credentials" });
                    }
                })
                .catch((err) => {
                    console.error("Error finding user:", err);
                    return res.status(500).json({ message: "Internal server error" });
                })
                .finally(() => {
                    console.log("Closing MongoDB connection.");
                    client.close(); // Close the connection
                });
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
            return res.status(500).json({ message: "Database connection error" });
        });
});

// Start server
const PORT = process.env.PORT || 4007;
app.listen(PORT, () => {
    console.log(`Authentication service is running on port ${PORT}`);
});
