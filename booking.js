// Sample data
let customers = [
  {id:1, name:"Rahim Khan"},
  {id:2, name:"Karim Ali"}
];
let rooms = [
  {id:1, type:"Single Deluxe"},
  {id:2, type:"Double Deluxe"}
];
let staff = [
  {id:1, name:"John Doe"},
  {id:2, name:"Jane Smith"}
];

let bookings = [];
let bookingId = 1;
let editId = null;

// DOM Elements
const customerSelect = document.getElementById("customerSelect");
const roomSelect = document.getElementById("roomSelect");
const staffSelect = document.getElementById("staffSelect");
const checkInInput = document.getElementById("checkIn");
const checkOutInput = document.getElementById("checkOut");
const statusSelect = document.getElementById("status");
const bookingForm = document.getElementById("bookingForm");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const tableBody = document.querySelector("#bookingTable tbody");
const searchInput = document.getElementById("searchInput");

// Populate selects
function populateSelects(){
  customerSelect.innerHTML = "<option value=''>Select Customer</option>";
  customers.forEach(c => customerSelect.innerHTML += `<option value="${c.id}">${c.name}</option>`);

  roomSelect.innerHTML = "<option value=''>Select Room</option>";
  rooms.forEach(r => roomSelect.innerHTML += `<option value="${r.id}">${r.type}</option>`);

  staffSelect.innerHTML = "<option value=''>Select Staff</option>";
  staff.forEach(s => staffSelect.innerHTML += `<option value="${s.id}">${s.name}</option>`);
}
populateSelects();

// Render table
function renderTable(filter=""){
  tableBody.innerHTML = "";
  bookings.filter(b => {
    const customerName = customers.find(c=>c.id===b.customerId)?.name.toLowerCase() || "";
    const roomType = rooms.find(r=>r.id===b.roomId)?.type.toLowerCase() || "";
    return customerName.includes(filter.toLowerCase()) || roomType.includes(filter.toLowerCase());
  }).forEach(b => {
    const customerName = customers.find(c=>c.id===b.customerId)?.name || "";
    const roomType = rooms.find(r=>r.id===b.roomId)?.type || "";
    const staffName = staff.find(s=>s.id===b.staffId)?.name || "";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${b.id}</td>
      <td>${customerName}</td>
      <td>${roomType}</td>
      <td>${staffName}</td>
      <td>${b.checkIn}</td>
      <td>${b.checkOut}</td>
      <td>${b.status}</td>
      <td>
        <button class="action-btn edit" onclick="editBooking(${b.id})">Edit</button>
        <button class="action-btn delete" onclick="deleteBooking(${b.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Add/Edit booking
bookingForm.addEventListener("submit", e=>{
  e.preventDefault();
  const data = {
    customerId: parseInt(customerSelect.value),
    roomId: parseInt(roomSelect.value),
    staffId: parseInt(staffSelect.value),
    checkIn: checkInInput.value,
    checkOut: checkOutInput.value,
    status: statusSelect.value
  };
  if(editId){
    const booking = bookings.find(b=>b.id===editId);
    Object.assign(booking, data);
    formTitle.textContent = "Add Booking";
    submitBtn.textContent = "Add Booking";
    editId = null;
  } else {
    data.id = bookingId++;
    bookings.push(data);
  }
  bookingForm.reset();
  renderTable(searchInput.value);
});

// Edit
function editBooking(id){
  const booking = bookings.find(b=>b.id===id);
  if(!booking) return;
  editId = id;
  formTitle.textContent = "Edit Booking";
  submitBtn.textContent = "Update Booking";
  customerSelect.value = booking.customerId;
  roomSelect.value = booking.roomId;
  staffSelect.value = booking.staffId;
  checkInInput.value = booking.checkIn;
  checkOutInput.value = booking.checkOut;
  statusSelect.value = booking.status;
}

// Delete
function deleteBooking(id){
  if(confirm("Are you sure to delete this booking?")){
    bookings = bookings.filter(b=>b.id!==id);
    renderTable(searchInput.value);
  }
}

// Search
searchInput.addEventListener("input", e=>renderTable(e.target.value));

renderTable();
