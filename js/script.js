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

const cartList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const totalQuantity = document.getElementById('total-quantity');
const quantityElement = document.getElementById('quantity');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');

// Initialize the cart items array and total
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;
let overallQuantity = 0;

function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total-quantity', JSON.stringify(overallQuantity));
}

function updateCartDisplay() {
    cartList.innerHTML = ''; // Clear the existing cart items

    total = 0;
    overallQuantity = 0;

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

        // Create plus and minus buttons for quantity
        const quantityControl = document.createElement('div');
        quantityControl.classList.add('quantity-control');

        const minusButton = document.createElement('button');
        minusButton.innerText = '-';
        minusButton.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
            }
            updateCartDisplay();
        });

        const quantityElement = document.createElement('span');
        quantityElement.innerText = item.quantity;

        const plusButton = document.createElement('button');
        plusButton.innerText = '+';
        plusButton.addEventListener('click', () => {
            item.quantity++;
            updateCartDisplay();
        });

        quantityControl.appendChild(minusButton);
        quantityControl.appendChild(quantityElement);
        quantityControl.appendChild(plusButton);

        // Create a list item for the cart
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.quantity}x ${item.name}`;
        cartItem.appendChild(quantityControl);
        cartItem.appendChild(removeButton);

        // Add the item to the cart display
        cartList.appendChild(cartItem);

        // Update the total
        total += item.price * item.quantity;
        overallQuantity += item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    totalQuantity.textContent = overallQuantity;

    // Save updated total quantity to local storage
    localStorage.setItem('total-quantity', JSON.stringify(overallQuantity));
}


function removeItemFromCart(item) {
    const itemIndex = cart.indexOf(item);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}



// Event listener for plus button
const plusButtons = document.querySelectorAll('.plus');
plusButtons.forEach(plusButton => {
    plusButton.addEventListener('click', (event) => {
        const quantityElement = event.target.parentNode.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;

        // Call a function to update the cart
        updateCart(event.target);
    });
});

// Event listener for minus button
const minusButtons = document.querySelectorAll('.minus');
minusButtons.forEach(minusButton => {
    minusButton.addEventListener('click', (event) => {
        const quantityElement = event.target.parentNode.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;

            // Call a function to update the cart
            updateCart(event.target);
        }
    });
});

// Function to update the cart
function updateCart(button) {
    const foodItem = button.closest('.shop-item');
    const itemName = foodItem.querySelector('h5').textContent;
    const itemPrice = parseFloat(foodItem.getAttribute('data-price')); // Get the item price from the data attribute
    const itemImage = foodItem.querySelector('img').src;

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        // If the item already exists, update its quantity
        const quantity = parseInt(foodItem.querySelector('.quantity').textContent);
        existingItem.quantity = quantity;
    } else {
        // If the item is not in the cart, add it with the specified quantity
        const quantity = parseInt(foodItem.querySelector('.quantity').textContent);
        cart.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
    }

    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCartDisplay();
}



// Add an event listener to each "Add To Cart" button
const addToCartButtons = document.querySelectorAll('.shop-item-button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the product details
        const foodItem = button.parentElement.parentElement;
        const itemName = foodItem.querySelector('h5').textContent;
        const itemPrice = parseFloat(button.getAttribute('data-price')); // Get the item price from the data attribute
        const itemImage = foodItem.querySelector('img').src;

        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            // If the item already exists, increment its quantity
            existingItem.quantity++;
        } else {
            // If the item is not in the cart, add it with quantity 1
            cart.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
        }

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart display
        updateCartDisplay();
    });
});

updateCartDisplay(); // Call this function to initialize the cart display




const shoppingCart = document.querySelector('.shopping-cart');
const initialTop = 140; // Set the initial position here (adjust as needed)
const minTopPercentage = 150; // Minimum top position as a percentage
const maxTopPercentage = 500; // Maximum top position as a percentage

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;

    // Calculate the minimum and maximum top positions based on percentages
    const minTop = (minTopPercentage / 100) * viewportHeight;
    const maxTop = (maxTopPercentage / 100) * viewportHeight;

    // Calculate the new top position, constrained by the min and max values
    const newTop = Math.min(maxTop, Math.max(minTop, initialTop + scrollPosition - 20));

    shoppingCart.style.top = newTop + 'px';
});

const arrowElement = document.querySelector('.arrow');

arrowElement.addEventListener('click', function() {
    const scrollPosition = window.innerHeight; // Set to 100vh

    // Use smooth scrolling to scroll to the calculated position
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth' // Adds smooth scrolling animation
    });
});

window.addEventListener("scroll", function() {
    var elementToHide = document.getElementById("elementToHide");
    if (elementToHide) {
        elementToHide.style.display = "none"; // Hide the element when any scrolling occurs
    }
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
    );
}

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
document.getElementsByTagName('head')[0].appendChild(script);








