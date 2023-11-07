let tables = [
    {id: 1, seats: 2, type: "Booth", reservations: {4: false, 5: true, 6: false, 7: true, 8: false, 9: true, 10: false}},
    {id: 2, seats: 4, type: "Booth", reservations: {4: true, 5: true, 6: false, 7: false, 8: true, 9: false, 10: true}},
    {id: 3, seats: 6, type: "Booth", reservations: {4: false, 5: false, 6: true, 7: true, 8: false, 9: true, 10: false}},
    {id: 4, seats: 2, type: "Table", reservations: {4: true, 5: false, 6: true, 7: false, 8: true, 9: false, 10: true}},
    {id: 5, seats: 4, type: "Booth", reservations: {4: false, 5: true, 6: false, 7: true, 8: true, 9: false, 10: false}},
    {id: 6, seats: 10, type: "Table", reservations: {4: true, 5: true, 6: true, 7: false, 8: false, 9: false, 10: true}},
    {id: 7, seats: 4, type: "Table", reservations: {4: false, 5: false, 6: true, 7: true, 8: false, 9: true, 10: true}},
    {id: 8, seats: 4, type: "Table", reservations: {4: true, 5: true, 6: false, 7: true, 8: false, 9: false, 10: false}},
    {id: 9, seats: 4, type: "Table", reservations: {4: false, 5: false, 6: true, 7: false, 8: true, 9: true, 10: true}},
    {id: 10, seats: 2, type: "Booth", reservations: {4: true, 5: false, 6: true, 7: true, 8: false, 9: false, 10: false}},
    {id: 11, seats: 10, type: "Table", reservations: {4: false, 5: true, 6: true, 7: false, 8: true, 9: true, 10: true}},
    {id: 12, seats: 4, type: "Table", reservations: {4: true, 5: false, 6: false, 7: true, 8: true, 9: false, 10: false}},
    {id: 13, seats: 4, type: "Table", reservations: {4: true, 5: false, 6: false, 7: true, 8: true, 9: false, 10: false}},
    {id: 14, seats: 6, type: "Table", reservations: {4: true, 5: false, 6: false, 7: true, 8: true, 9: false, 10: false}},
    {id: 15, seats: 4, type: "Table", reservations: {4: true, 5: false, 6: false, 7: true, 8: true, 9: false, 10: false}},
    {id: 16, seats: 8, type: "Table", reservations: {4: true, 5: false, 6: false, 7: true, 8: true, 9: false, 10: false}},
    {id: 17, seats: 4, type: "Table", reservations: {4: true, 5: false, 6: false, 7: true, 8: true, 9: false, 10: false}},
    {id: 18, seats: 2, type: "Table", reservations: {4: true, 5: false, 6: false, 7: true, 8: true, 9: false, 10: false}},
    {id: 19, seats: 4, type: "Table", reservations: {4: true, 5: false, 6: false, 7: true, 8: true, 9: false, 10: false}},
    //... Add more tables as required
];

const img = document.querySelector('.background'); // Replace with your actual class name


//Zoom in on load
window.addEventListener('load', function() {
  const img = document.querySelector('.background');
  // Delay the scaling slightly to allow for the transition to be seen
  setTimeout(function() {
    img.style.transform = 'scale(1.1)';
  }, 50); // Delay by 50 milliseconds
});


// Function to find a table by id
//For the reserve widget
function findTableById(tableId) {
  return tables.find(table => table.id === tableId);
}

// Function to update the UI with the selected table details
function updateTableDetails(tableId, clickedHotspot) {
  const table = findTableById(tableId);
  
  if (!table) return;

  // Update the table number and seats
  document.querySelector("#table-number").textContent = `Table: ${table.id}`;
  document.querySelector("#table-seats").textContent = `Seats: ${table.seats}`;
  document.querySelector("#table-type").textContent = `Type: ${table.type}`;
  document.querySelector("#cardSubHeading").textContent = `Table ${table.id}`;

  // Populate the ion-select with available times
  const select = document.querySelector("#table-times");
  select.innerHTML = ''; // Clear existing options
  
  Object.keys(table.reservations).forEach(time => {
    const option = document.createElement('ion-select-option');
    option.value = time;
    option.textContent = `${time}:00`;
    option.disabled = !table.reservations[time]; // Disable if the time is not available
    select.appendChild(option);
  });

  // Change the color of the clicked hotspot
  document.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.classList.remove('active'); // Remove the class from all hotspots
  });
  clickedHotspot.classList.add('active'); // Add the class to the clicked hotspot
}




// Add click event listeners to all hotspots
document.querySelectorAll('.hotspot').forEach(hotspot => {
  hotspot.addEventListener('click', function() {
    const tableId = parseInt(this.getAttribute('data-table').replace('Table ', ''), 10); // Assuming data-table attribute contains "Table X"
    updateTableDetails(tableId, this);
  });
});