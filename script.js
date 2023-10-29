//menu toggle
const menuToggle = document.querySelector('.toggle');
          const showcase = document.querySelector('.showcase');
    
          menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            showcase.classList.toggle('active');

          })

//disable scrolling when navbar is opened
const scrollToggleButton = document.getElementById("toggleButton");

scrollToggleButton.addEventListener("click", function () {
    const body = document.body;
    if (body.style.overflow === "hidden") {
        body.style.overflow = "auto"; // Enable scrolling
    } else {
        body.style.overflow = "hidden"; // Disable scrolling
    }
});

//video slider
document.addEventListener("DOMContentLoaded", function () {
    const carousel = new Flickity(".carousel", {
      cellAlign: "left",
      contain: true,
      wrapAround: true,
      draggable: true,
      autoPlay: 5000,
      prevNextButtons: false,
      pageDots: true,
      pageDotPosition: "center"
    });
});

// Initialize the cart items array and total
const cart = [];
let total = 0;

// Function to update the cart display
function displayCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = ''; // Clear the existing cart items

    total = 0;
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
        cartItem.innerHTML = `${item.name}: $${item.price}`;
        cartItem.appendChild(removeButton);

        // Add the item to the cart display
        cartList.appendChild(cartItem);

        // Update the total
        total += item.price;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
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
    });
});



