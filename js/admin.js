document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("addFineForm");
    const regNoInput = document.getElementById("regNo");
    const reasonInput = document.getElementById("reason");
    const amountInput = document.getElementById("amount");
    const tableBody = document.getElementById("fineTableBody");
    const totalCollectedEl = document.getElementById("totalCollected");
    const pendingAmountEl = document.getElementById("pendingAmount");

    // ===== LOAD DATA =====
    function loadData() {
        const data = JSON.parse(localStorage.getItem("fineData")) || [];
        tableBody.innerHTML = "";

        data.forEach(item => addRow(item.regNo, item.reason, item.amount, item.status));

        calculateTotals();
    }

    // ===== SAVE DATA =====
    function saveData() {
        const data = [];
        tableBody.querySelectorAll("tr").forEach(row => {
            data.push({
                regNo: row.children[0].innerText,
                reason: row.children[1].innerText,
                amount: row.children[2].innerText,
                status: row.children[3].querySelector("span").innerText
            });
        });
        localStorage.setItem("fineData", JSON.stringify(data));
    }

    // ===== ADD ROW =====
    function addRow(regNo, reason, amount, status = "Pending") {
        const row = document.createElement("tr");
        const statusClass = status === "Paid" ? "paid" : "pending";

        row.innerHTML = `
            <td>${regNo}</td>
            <td>${reason}</td>
            <td>${amount}</td>
            <td>
                <span class="status ${statusClass}">
                    ${status}
                </span>
            </td>
        `;

        row.querySelector(".status").addEventListener("click", () => {
            toggleStatus(row);
        });

        tableBody.appendChild(row);
    }

    // ===== FORM SUBMIT =====
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const regNo = regNoInput.value.trim();
        const reason = reasonInput.value.trim();
        const amount = amountInput.value.trim();

        if (!regNo || !reason || !amount) {
            alert("Please fill all fields");
            return;
        }

        addRow(regNo, reason, amount, "Pending");

        regNoInput.value = "";
        reasonInput.value = "";
        amountInput.value = "";

        saveData();
        calculateTotals();
    });

    // ===== TOGGLE STATUS =====
    function toggleStatus(row) {
        const statusEl = row.children[3].querySelector("span");

        if (statusEl.innerText === "Pending") {
            statusEl.innerText = "Paid";
            statusEl.className = "status paid";
        } else {
            statusEl.innerText = "Pending";
            statusEl.className = "status pending";
        }

        saveData();
        calculateTotals();
    }

    // ===== CALCULATE TOTALS =====
    function calculateTotals() {
        let collected = 0;
        let pending = 0;

        tableBody.querySelectorAll("tr").forEach(row => {
            const amount = parseInt(row.children[2].innerText);
            const status = row.children[3].querySelector("span").innerText;

            if (status === "Paid") collected += amount;
            else pending += amount;
        });

        totalCollectedEl.innerText = `₹ ${collected}`;
        pendingAmountEl.innerText = `₹ ${pending}`;
    }

    loadData();
});
