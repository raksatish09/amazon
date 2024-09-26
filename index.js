

let cart = [];

// Timer variables
const countdownDate = new Date().getTime() + 3600 * 1000; // 1 hour from now

// Product deletion function
function deleteProduct(productId) {
    cart = cart.filter(product => product.id !== productId);
    renderProducts();
    updateCartCount();
}

// Render products with delete button
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Banner slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('#banner img');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Loop back to first slide
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Electronics slider functionality
let currentElectronicsSlide = 0;
const electronicsSlides = document.querySelectorAll('#electronics-slider img');
const totalElectronicsSlides = electronicsSlides.length;

function showElectronicsSlide(index) {
    electronicsSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function moveSlide(direction) {
    currentElectronicsSlide = (currentElectronicsSlide + direction + totalElectronicsSlides) % totalElectronicsSlides;
    showElectronicsSlide(currentElectronicsSlide);
}

// Timer functionality
function startTimer() {
    const timerElement = document.getElementById('timer');

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(interval);
            timerElement.innerHTML = "Offer Expired";
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// Initial setup for products and banners
renderProducts();
showSlide(currentSlide);
showElectronicsSlide(currentElectronicsSlide);
startTimer();
