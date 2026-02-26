let customers = [];
let customerId = 1;
let editId = null;

const form = document.getElementById("customerForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const nationalIdInput = document.getElementById("nationalId");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");

const tableBody = document.querySelector("#customerTable tbody");
const searchInput = document.getElementById("searchInput");

// Render table
function renderTable(filter=""){
  tableBody.innerHTML = "";
  customers.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.email.toLowerCase().includes(filter.toLowerCase()))
    .forEach(c => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.phone}</td>
        <td>${c.email}</td>
        <td>${c.address}</td>
        <td>${c.nationalId}</td>
        <td>
          <button class="action-btn edit" onclick="editCustomer(${c.id})">Edit</button>
          <button class="action-btn delete" onclick="deleteCustomer(${c.id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
}

// Add/Edit customer
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    address: addressInput.value,
    nationalId: nationalIdInput.value
  };

  if(editId){
    const customer = customers.find(c => c.id === editId);
    Object.assign(customer, data);
    submitBtn.textContent = "Add Customer";
    formTitle.textContent = "Add Customer";
    editId = null;
  } else {
    data.id = customerId++;
    customers.push(data);
  }

  form.reset();
  renderTable(searchInput.value);
});

// Edit
function editCustomer(id){
  const customer = customers.find(c => c.id === id);
  if(!customer) return;
  editId = id;
  formTitle.textContent = "Edit Customer";
  submitBtn.textContent = "Update Customer";
  nameInput.value = customer.name;
  phoneInput.value = customer.phone;
  emailInput.value = customer.email;
  addressInput.value = customer.address;
  nationalIdInput.value = customer.nationalId;
}

// Delete
function deleteCustomer(id){
  if(confirm("Are you sure to delete this customer?")){
    customers = customers.filter(c => c.id !== id);
    renderTable(searchInput.value);
  }
}

// Search
searchInput.addEventListener("input", e => renderTable(e.target.value));

renderTable();
