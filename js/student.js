document.addEventListener("DOMContentLoaded", () => {

    const studentRegNo = localStorage.getItem("loggedInStudent");
    if (!studentRegNo) {
    alert("Please login first");
    window.location.href = "student-login.html";
}



    const tableBody = document.getElementById("studentFineTable");
    const totalBox = document.getElementById("studentTotal");

    function loadStudentFines() {
        const data = JSON.parse(localStorage.getItem("fineData")) || [];
        tableBody.innerHTML = "";

        let total = 0;

        data.forEach((item, realIndex) => {
            if (item.regNo === studentRegNo) {

                total += parseInt(item.amount);

                const actionBtn =
                    item.status === "Pending"
                        ? `<button onclick="payFine(${realIndex})">Pay</button>`
                        : "-";

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${actionBtn}</td>
                    <td>${item.reason}</td>
                    <td>${item.amount}</td>
                    <td>${item.status}</td>
                `;

                tableBody.appendChild(row);
            }
        });

        totalBox.innerText = "Total Fine: ₹ " + total;
    }

    // 🔥 Make function global (for button click)
    window.payFine = function(realIndex) {
        const data = JSON.parse(localStorage.getItem("fineData")) || [];
        data[realIndex].status = "Paid";
        localStorage.setItem("fineData", JSON.stringify(data));
        loadStudentFines();
    };

    loadStudentFines();
});
