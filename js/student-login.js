document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("studentLoginForm");
    const regNoInput = document.getElementById("studentRegNo");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const regNo = regNoInput.value.trim();

        if (!regNo) {
            alert("Please enter Register Number");
            return;
        }

        // Save logged-in student
        localStorage.setItem("loggedInStudent", regNo);

        // Redirect to dashboard
        window.location.href = "student-dashboard.html";
    });
});
