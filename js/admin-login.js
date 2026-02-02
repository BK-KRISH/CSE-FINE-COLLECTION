document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("adminLoginForm");
    const usernameInput = document.getElementById("adminUsername");
    const passwordInput = document.getElementById("adminPassword");

    // DEMO credentials (you can change later)
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        // Credential check
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {

            // Save admin session
            localStorage.setItem("adminLoggedIn", "true");

            // Redirect
            window.location.href = "admin-dashboard.html";

        } else {
            alert("Invalid username or password");
        }
    });
});
