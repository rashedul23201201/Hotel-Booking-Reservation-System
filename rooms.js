let rooms = [];
let roomId = 1;
let editId = null;

const roomForm = document.getElementById("roomForm");
const roomType = document.getElementById("roomType");
const price = document.getElementById("price");
const floor = document.getElementById("floor");
const status = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const tableBody = document.querySelector("#roomTable tbody");
const searchInput = document.getElementById("searchInput");

function renderTable(filter=""){
  tableBody.innerHTML = "";
  rooms.filter(r => r.type.toLowerCase().includes(filter.toLowerCase()) || r.floor.toString().includes(filter))
  .forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.type}</td>
      <td>${r.price}</td>
      <td>${r.floor}</td>
      <td>${r.status}</td>
      <td>
        <button class="action-btn edit" onclick="editRoom(${r.id})">Edit</button>
        <button class="action-btn delete" onclick="deleteRoom(${r.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

roomForm.addEventListener("submit", e=>{
  e.preventDefault();
  const data = {
    type: roomType.value,
    price: price.value,
    floor: floor.value,
    status: status.value
  };
  if(editId){
    const room = rooms.find(r=>r.id===editId);
    Object.assign(room,data);
    formTitle.textContent="Add Room";
    submitBtn.textContent="Add Room";
    editId=null;
  } else {
    data.id = roomId++;
    rooms.push(data);
  }
  roomForm.reset();
  renderTable(searchInput.value);
});

function editRoom(id){
  const room = rooms.find(r=>r.id===id);
  if(!room) return;
  editId=id;
  formTitle.textContent="Edit Room";
  submitBtn.textContent="Update Room";
  roomType.value=room.type;
  price.value=room.price;
  floor.value=room.floor;
  status.value=room.status;
}

function deleteRoom(id){
  if(confirm("Are you sure to delete this room?")){
    rooms=rooms.filter(r=>r.id!==id);
    renderTable(searchInput.value);
  }
}

searchInput.addEventListener("input", e=>renderTable(e.target.value));

renderTable();
