document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       SESSION CHECK
    =============================== */
    const studentRegNo = localStorage.getItem("loggedInStudent");

    if (!studentRegNo) {
        alert("Please login first");
        window.location.href = "student-login.html";
        return; // ⛔ stop JS execution
    }

    /* ===============================
       DOM ELEMENTS
    =============================== */
    const tableBody = document.getElementById("studentFineTable");
    const totalBox = document.getElementById("studentTotal");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!tableBody || !totalBox) {
        console.error("Student dashboard elements missing");
        return;
    }
    const regDisplay = document.getElementById("studentRegDisplay");
    if (regDisplay) {
    regDisplay.innerText = studentRegNo;
    }


    /* ===============================
       LOAD STUDENT FINES
    =============================== */
    function loadStudentFines() {
        const data = JSON.parse(localStorage.getItem("fineData")) || [];
        tableBody.innerHTML = "";

        let total = 0;

        data.forEach((item, realIndex) => {
            if (item.regNo === studentRegNo) {

                const amount = parseInt(item.amount) || 0;
                total += amount;

                const actionBtn =
                    item.status === "Pending"
                        ? `<button class="pay-btn" onclick="payFine(${realIndex})">Pay</button>`
                        : "-";

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${actionBtn}</td>
                    <td>${item.reason}</td>
                    <td>${amount}</td>
                    <td>${item.status}</td>
                `;

                tableBody.appendChild(row);
            }
        });

        totalBox.innerText = `Total Fine: ₹ ${total}`;
    }

    /* ===============================
       PAY FINE (GLOBAL)
    =============================== */
    window.payFine = function(realIndex) {
        const data = JSON.parse(localStorage.getItem("fineData")) || [];

        if (!data[realIndex]) return;

        data[realIndex].status = "Paid";
        localStorage.setItem("fineData", JSON.stringify(data));

        loadStudentFines();
    };

    /* ===============================
       LOGOUT
    =============================== */
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedInStudent");
            window.location.href = "student-login.html";
        });
    }

    /* ===============================
       INITIAL LOAD
    =============================== */
    loadStudentFines();
});
