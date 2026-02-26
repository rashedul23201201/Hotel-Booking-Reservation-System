let payments = [];
let paymentId = 1;
let editId = null;

// DOM Elements
const paymentForm = document.getElementById("paymentForm");
const bookingIdInput = document.getElementById("bookingId");
const paymentDate = document.getElementById("paymentDate");
const amountInput = document.getElementById("amount");
const methodSelect = document.getElementById("method");
const paymentStatus = document.getElementById("paymentStatus");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const tableBody = document.querySelector("#paymentTable tbody");
const searchInput = document.getElementById("searchInput");

// Render Table
function renderTable(filter="") {
  tableBody.innerHTML = "";
  payments
    .filter(
      (p) =>
        p.bookingId.toString().includes(filter) ||
        p.status.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.bookingId}</td>
        <td>${p.date}</td>
        <td>${p.amount}</td>
        <td>${p.method}</td>
        <td>${p.status}</td>
        <td>
          <button class="action-btn edit" onclick="editPayment(${p.id})">Edit</button>
          <button class="action-btn delete" onclick="deletePayment(${p.id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
}

// Add/Edit Payment
paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    bookingId: parseInt(bookingIdInput.value),
    date: paymentDate.value,
    amount: amountInput.value,
    method: methodSelect.value,
    status: paymentStatus.value,
  };

  if (editId) {
    const payment = payments.find((p) => p.id === editId);
    Object.assign(payment, data);
    formTitle.textContent = "Add Payment";
    submitBtn.textContent = "Add Payment";
    editId = null;
  } else {
    data.id = paymentId++;
    payments.push(data);
  }

  paymentForm.reset();
  renderTable(searchInput.value);
});

// Edit Payment
function editPayment(id) {
  const payment = payments.find((p) => p.id === id);
  if (!payment) return;
  editId = id;
  formTitle.textContent = "Edit Payment";
  submitBtn.textContent = "Update Payment";
  bookingIdInput.value = payment.bookingId;
  paymentDate.value = payment.date;
  amountInput.value = payment.amount;
  methodSelect.value = payment.method;
  paymentStatus.value = payment.status;
}

// Delete Payment
function deletePayment(id) {
  if (confirm("Are you sure you want to delete this payment?")) {
    payments = payments.filter((p) => p.id !== id);
    renderTable(searchInput.value);
  }
}

// Search / Filter
searchInput.addEventListener("input", (e) => renderTable(e.target.value));

// Initial render
renderTable();
