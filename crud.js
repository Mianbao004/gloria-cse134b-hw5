let groceryList = JSON.parse(localStorage.getItem('groceryList')) || []; //Our current grocery list or empty

const itemInput = document.getElementById("itemInput");
const quantityInput = document.getElementById("quantityInput");
const output = document.getElementById("listOutput");

renderItems(); //Shows list always even when refreshed

////////////////////////////////////////////////////////////////////////////////
function renderItems() {
    output.innerHTML = ''; // reset output

    // Base case: Nothing
    if (groceryList.length === 0) {
        output.innerHTML = '<p>No items in the list</p>';
        return;
    }

    groceryList.forEach((entry, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${index+1}. Item: ${entry.item}, Quantity: ${entry.quantity}</p>
            <button onclick="editItem(${index})">Edit</button>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        output.appendChild(itemDiv);
    });
}

function createItem() {
    const item = itemInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim());

    if (!item || !(/^[A-Za-z]+$/.test(item)) || quantity <= 0 || isNaN(quantity)) {
        alert("ERROR! Please enter a valid English item name and quantity.");
        return;
    }

    groceryList.push({item, quantity}); //Push object to groceryList
    localStorage.setItem('groceryList', JSON.stringify(groceryList)); //Add to localStorage
    renderItems(); //Update output
}

function deleteItem(index) {
    groceryList.splice(index, 1); //array.splice(startIndex, deleteCount)
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
    renderItems(); //Update output
}

function editItem(index) {
    const newItem = prompt("Enter new item name:", groceryList[index].item);
    const newQuantity = prompt("Enter new quantity:", groceryList[index].quantity);

    if ((newItem && newQuantity) && (!isNaN(newQuantity) && parseInt(newQuantity) > 0)) { //Checks if user entered smt && if its is valid
        groceryList[index] = {
            item: newItem.trim(),
            quantity: parseInt(newQuantity).trim()
        };
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        renderItems();
    }
}

// Prevents default action of submit button (Aka, no jump)
document.getElementById('groceryForm').addEventListener('submit', function (e) {
    e.preventDefault();
});