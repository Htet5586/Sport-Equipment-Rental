const { JSDOM } = require("jsdom");

test("should display available equipment", () => {
  // Setup a mock DOM
  const dom = new JSDOM(`
    <div id="equipment-list"></div>
  `);
  global.document = dom.window.document;

  // Mock inventory data
  const inventory = [
    { name: "Bike", pricePerDay: 10, isOccupied: false },
    { name: "Tent", pricePerDay: 20, isOccupied: true },
  ];

  // Function under test
  function displayEquipment() {
    const equipmentList = document.getElementById("equipment-list");
    equipmentList.innerHTML = "";
    inventory.forEach((item, index) => {
      if (!item.isOccupied) {
        const equipmentItem = document.createElement("div");
        equipmentItem.innerHTML = `
          <p><strong>Name:</strong> ${item.name}</p>
          <p><strong>Price per Day:</strong> $${item.pricePerDay}</p>
        `;
        equipmentList.appendChild(equipmentItem);
      }
    });
  }

  // Call the function
  displayEquipment();

  // Assert the rendered HTML
  const equipmentList = document.getElementById("equipment-list");
  expect(equipmentList.children.length).toBe(1);
  expect(equipmentList.children[0].textContent).toContain("Bike");
});
test("should select equipment correctly", () => {
    // Mock inventory data
    const inventory = [
      { name: "Bike", pricePerDay: 10, isOccupied: false },
      { name: "Tent", pricePerDay: 20, isOccupied: false },
    ];
    let selectedEquipment = null;
  
    // Mock DOM
    const dom = new JSDOM(`
      <div id="selected-equipment-name"></div>
    `);
    global.document = dom.window.document;
  
    // Function under test
    function selectEquipment(index) {
      selectedEquipment = inventory[index];
      document.getElementById("selected-equipment-name").textContent =
        selectedEquipment.name;
    }
  
    // Call the function
    selectEquipment(1);
  
    // Assertions
    expect(selectedEquipment).toEqual(inventory[1]);
    expect(
      document.getElementById("selected-equipment-name").textContent
    ).toBe("Tent");
  });
  test("should calculate total price and mark equipment as rented", () => {
    // Mock inventory and setup
    const inventory = [
      { name: "Bike", pricePerDay: 10, isOccupied: false },
    ];
    const selectedEquipment = inventory[0];
    const rentalDays = 5;
    const isRegularCustomer = true;
  
    // Function under test
    function calculateTotalPrice(equipment, days, isRegular) {
      let totalPrice = equipment.pricePerDay * days;
      if (isRegular) totalPrice *= 0.9; // 10% discount
      if (days > 7) totalPrice *= 0.85; // 15% discount
      return totalPrice;
    }
  
    function rentEquipment(equipment, days) {
      equipment.isOccupied = true;
      return calculateTotalPrice(equipment, days, isRegularCustomer);
    }
  
    // Call the function
    const totalPrice = rentEquipment(selectedEquipment, rentalDays);
  
    // Assertions
    expect(totalPrice).toBe(45); // $10/day * 5 days * 0.9 discount
    expect(selectedEquipment.isOccupied).toBe(true);
  });
  test("should mark equipment as returned", () => {
    // Mock inventory and setup
    const inventory = [
      { name: "Bike", pricePerDay: 10, isOccupied: true },
    ];
    const selectedEquipment = inventory[0];
  
    // Function under test
    function returnEquipment(equipment) {
      equipment.isOccupied = false;
    }
  
    // Call the function
    returnEquipment(selectedEquipment);
  
    // Assertions
    expect(selectedEquipment.isOccupied).toBe(false);
  });
    test("should add new equipment to the inventory", () => {
  // Mock inventory and setup
  const inventory = [
    { name: "Bike", pricePerDay: 10, isOccupied: false },
  ];

  // Function under test
  function addNewEquipment(name, price) {
    inventory.push({ name, pricePerDay: price, isOccupied: false });
  }

  // Call the function
  addNewEquipment("Tent", 20);

  // Assertions
  expect(inventory.length).toBe(2);
  expect(inventory[1]).toEqual({ name: "Tent", pricePerDay: 20, isOccupied: false });
});
