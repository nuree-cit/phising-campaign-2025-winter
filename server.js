// Name:      server.js
//
// Purpose:   Hosting server for phishing site
// Author:    nuna ⑨
// Created:   12/1/2025

// loads libraries
const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

// default objects
const prisma = new PrismaClient();
const app = express();
const PORT = 9999;

// serves static files, handling json and form
app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// main page route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// saves form data
app.post("/api/phish", async (req, res) => {
    const { firstName, lastName, email, employeeNumber } = req.body;

    if (!firstName || !lastName || !email || !employeeNumber) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newUser = await prisma.caught.create({
            data: { firstName, lastName, email, employeeNumber }
        });

        res.json({ user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// starts server on port
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
