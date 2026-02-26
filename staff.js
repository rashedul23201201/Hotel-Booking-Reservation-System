let staff = [];
let staffId = 1;
let editId = null;

const staffForm = document.getElementById("staffForm");
const staffName = document.getElementById("staffName");
const role = document.getElementById("role");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const tableBody = document.querySelector("#staffTable tbody");
const searchInput = document.getElementById("searchInput");

function renderTable(filter=""){
  tableBody.innerHTML = "";
  staff.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) || s.role.toLowerCase().includes(filter.toLowerCase()))
  .forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.role}</td>
      <td>${s.phone}</td>
      <td>${s.email}</td>
      <td>
        <button class="action-btn edit" onclick="editStaff(${s.id})">Edit</button>
        <button class="action-btn delete" onclick="deleteStaff(${s.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

staffForm.addEventListener("submit", e=>{
  e.preventDefault();
  const data = {name: staffName.value, role: role.value, phone: phone.value, email: email.value};
  if(editId){
    const s = staff.find(x=>x.id===editId);
    Object.assign(s,data);
    formTitle.textContent="Add Staff";
    submitBtn.textContent="Add Staff";
    editId=null;
  } else {
    data.id = staffId++;
    staff.push(data);
  }
  staffForm.reset();
  renderTable(searchInput.value);
});

function editStaff(id){
  const s = staff.find(x=>x.id===id);
  if(!s) return;
  editId=id;
  formTitle.textContent="Edit Staff";
  submitBtn.textContent="Update Staff";
  staffName.value=s.name;
  role.value=s.role;
  phone.value=s.phone;
  email.value=s.email;
}

function deleteStaff(id){
  if(confirm("Are you sure to delete this staff?")){
    staff = staff.filter(x=>x.id!==id);
    renderTable(searchInput.value);
  }
}

searchInput.addEventListener("input", e=>renderTable(e.target.value));
renderTable();
