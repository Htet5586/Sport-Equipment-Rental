// Inventory Data
const inventory = [
    { name: "Bike", pricePerDay: 10, isOccupied: false },
    { name: "Tent", pricePerDay: 20, isOccupied: false },
    { name: "Kayak", pricePerDay: 30, isOccupied: false },
    { name: "Roller Skates", pricePerDay: 5, isOccupied: false },
    { name: "Fishing Rod", pricePerDay: 15, isOccupied: false },
    { name: "Backpack", pricePerDay: 8, isOccupied: false },
    { name: "Sleeping Bag", pricePerDay: 12, isOccupied: false }
  ];
  function displayEquipment() {
    const equipmentList = document.getElementById("equipment-list");
    equipmentList.innerHTML = "";
  
    inventory.forEach((item, index) => {
      if (!item.isOccupied) {
        const equipmentItem = document.createElement("div");
        equipmentItem.className = "equipment-item";
        equipmentItem.innerHTML = `
          <p><strong>Name:</strong> ${item.name}</p>
          <p><strong>Price per Day:</strong> $${item.pricePerDay}</p>
          <button onclick="selectEquipment(${index})">Select</button>
        `;
        equipmentList.appendChild(equipmentItem);
      }
    });
  }
  
  function selectEquipment(index) {
    selectedEquipment = inventory[index];
    alert(`You selected: ${selectedEquipment.name}`);
    document.getElementById("selected-equipment-name").textContent = selectedEquipment.name;
  }
  
  let selectEquipment = null;
  
  document.getElementById("rent-equipment-btn").addEventListener("click", () => {
    const customerName = document.getElementById("customer-name").value;
    const rentalDays = parseInt(document.getElementById("rental-days").value);
    const isRegularCustomer = document.getElementById("is-regular-customer").checked;
  
    if (!selectedEquipment) {
      alert("Please select equipment to rent.");
      return;
    }
  
    if (!customerName || rentalDays < 1) {
      alert("Please enter your name and rental days.");
      return;
    }
  
    let totalPrice = selectedEquipment.pricePerDay * rentalDays;
    if (isRegularCustomer) totalPrice *= 0.9;
    if (rentalDays > 7) totalPrice *= 0.85;
  
    const deposit = selectedEquipment.pricePerDay * 2;
    selectedEquipment.isOccupied = true;
  
    document.getElementById("summary-name").textContent = customerName;
    document.getElementById("summary-equipment").textContent = selectedEquipment.name;
    document.getElementById("summary-days").textContent = rentalDays;
    document.getElementById("summary-price").textContent = totalPrice.toFixed(2);
    document.getElementById("summary-deposit").textContent = deposit.toFixed(2);
  
    document.getElementById("order-summary").classList.remove("hidden");
    displayEquipment();
  });
  
  document.getElementById("return-equipment-btn").addEventListener("click", () => {
    alert(`Deposit of $${selectedEquipment.pricePerDay * 2} returned.`);
    selectedEquipment.isOccupied = false;
  
    document.getElementById("order-summary").classList.add("hidden");
    displayEquipment();
  
    selectedEquipment = null;
    document.getElementById("selected-equipment-name").textContent = "None";
  });
  
  function addNewEquipment() {
    const name = document.getElementById("equipment-name").value.trim();
    const pricePerDay = parseFloat(document.getElementById("equipment-price").value);
  
    if (!name || pricePerDay <= 0) {
      alert("Please enter valid equipment details.");
      return;
    }
  
    inventory.push({ name, pricePerDay, isOccupied: false });
  
    document.getElementById("equipment-name").value = "";
    document.getElementById("equipment-price").value = "";
  
    displayEquipment();
  
    alert(`New equipment "${name}" added successfully!`);
  }
  
  // Display the initial inventory
  displayEquipment();
  // Function to display available equipment
  function displayEquipment() {
    const equipmentList = document.getElementById("equipment-list");
    equipmentList.innerHTML = ""; // Clear previous content
  
    inventory.forEach((item, index) => {
      if (!item.isOccupied) {
        const equipmentItem = document.createElement("div");
        equipmentItem.className = "equipment-item";
        equipmentItem.innerHTML = `
          <p><strong>Name:</strong> ${item.name}</p>
          <p><strong>Price per Day:</strong> $${item.pricePerDay}</p>
          <button onclick="selectEquipment(${index})">Select</button>
        `;
        equipmentList.appendChild(equipmentItem);
      }
    });
  }
  
  // Initially display the inventory
  displayEquipment();
  
  // Store selected equipment
  let selectedEquipment = null;
  
  // Handle equipment selection
  function selectEquipment(index) {
    selectedEquipment = inventory[index];
    alert(`You selected: ${selectedEquipment.name}`);
    document.getElementById("selected-equipment-name").textContent = selectedEquipment.name;
  }
  
  // Handle rental order
  document.getElementById("rent-equipment-btn").addEventListener("click", () => {
    const customerName = document.getElementById("customer-name").value;
    const rentalDays = parseInt(document.getElementById("rental-days").value);
    const isRegularCustomer = document.getElementById("is-regular-customer").checked;
  
    // Validate input
    if (!selectedEquipment) {
      alert("Please select equipment to rent.");
      return;
    }
  
    if (!customerName || rentalDays < 1) {
      alert("Please enter your name and rental days.");
      return;
    }
  
    // Calculate total price
    let totalPrice = selectedEquipment.pricePerDay * rentalDays;
  
    // Apply discounts
    if (isRegularCustomer) totalPrice *= 0.9; // 10% discount
    if (rentalDays > 7) totalPrice *= 0.85; // 15% discount for long-term rental
  
    // Calculate deposit
    const deposit = selectedEquipment.pricePerDay * 2;
  
    // Mark equipment as occupied
    selectedEquipment.isOccupied = true;
  
    // Display order summary
    document.getElementById("summary-name").textContent = customerName;
    document.getElementById("summary-equipment").textContent = selectedEquipment.name;
    document.getElementById("summary-days").textContent = rentalDays;
    document.getElementById("summary-price").textContent = totalPrice.toFixed(2);
    document.getElementById("summary-deposit").textContent = deposit.toFixed(2);
  
    // Show order summary and refresh equipment list
    document.getElementById("order-summary").classList.remove("hidden");
    displayEquipment();
  });
  
  // Handle return functionality
  document.getElementById("return-equipment-btn").addEventListener("click", () => {
    alert(`Deposit of $${selectedEquipment.pricePerDay * 2} returned.`);
    selectedEquipment.isOccupied = false;
  
    // Hide order summary
    document.getElementById("order-summary").classList.add("hidden");
  
    // Refresh equipment list
    displayEquipment();
  
    // Clear selected equipment
    selectedEquipment = null;
    document.getElementById("selected-equipment-name").textContent = "None";
  });
  function addNewEquipment() {
    const name = document.getElementById("equipment-name").value.trim();
    const pricePerDay = parseFloat(document.getElementById("equipment-price").value);
  
    // Validate input
    if (!name || pricePerDay <= 0) {
      alert("Please enter valid equipment details.");
      return;
    }
  
    // Add new equipment to the inventory
    inventory.push({ name, pricePerDay, isOccupied: false });
  
    // Clear form fields
    document.getElementById("equipment-name").value = "";
    document.getElementById("equipment-price").value = "";
  
    // Refresh equipment list
    displayEquipment();
  
    alert(`New equipment "${name}" added successfully!`);
  }
  