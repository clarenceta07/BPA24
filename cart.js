// Initialize the cart items array and total
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

// Function to update the cart display
function displayCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const totalQuantity = document.getElementById('total-quantity'); // New line

    cartList.innerHTML = ''; // Clear the existing cart items


    total = 0;
    quantity = 0; // New line
    cart.forEach(item => {
        // Create a "Remove" button for the item
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.classList.add('remove-button');

        // Add a click event listener to the remove button
        removeButton.addEventListener('click', () => {
            // Get the item to remove
            const itemToRemove = cart.find(cartItem => cartItem.name === item.name);
            removeItemFromCart(itemToRemove);
        });

 // Create a list item for the cart
 const cartItem = document.createElement('li');
 cartItem.innerHTML = `
     <img src="${item.image}" alt="${item.name}" class="cart-item-image">
     ${item.name}: $${item.price}
 `;
        
        cartItem.appendChild(removeButton);

        // Add the item to the cart display
        cartList.appendChild(cartItem);

        // Update the total
        total += item.price;
        quantity++; // Increment the quantity
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    totalQuantity.textContent = quantity; // Update the total quantity
}

// Function to remove an item from the cart
function removeItemFromCart(itemToRemove) {
    // Find the index of the item to remove
    const itemIndex = cart.indexOf(itemToRemove);

    if (itemIndex !== -1) {
        // Remove the item from the cart
        cart.splice(itemIndex, 1);

        // Update the cart display
        displayCart();

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Add an event listener to each "Add To Cart" button
const addToCartButtons = document.querySelectorAll('.shop-item-button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the product details
        const foodItem = button.parentElement.parentElement;
        const itemName = foodItem.querySelector('h5').textContent;
        const itemPrice = parseFloat(button.getAttribute('data-price')); // Get the item price from the data attribute

        // Add the item to the cart
        cart.push({ name: itemName, price: itemPrice });

        // Update the cart display
        displayCart();

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

// Display the cart when the page loads
displayCart();
