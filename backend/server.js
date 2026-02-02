const express = require("express");
const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

// demo admin credentials (later move to DB)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// test route
app.get("/", (req, res) => {
    res.send("CSE Fine Portal Backend Running");
});

// 🔐 ADMIN LOGIN API
app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password required"
        });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return res.json({
            success: true,
            message: "Admin login successful"
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid credentials"
    });
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
