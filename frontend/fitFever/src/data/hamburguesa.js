const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function showSlide(index) {
    // Hide all slides
    carouselItems.forEach(item => item.style.display = 'none');
    // Show the slide at the specified index
    carouselItems[index].style.display = 'block';
}

// Show the first slide initially
showSlide(currentIndex);

// Function to navigate to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
}

// Function to navigate to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentIndex);
}

// Attach event listeners to the buttons
document.querySelector('#slide1 a[href="#slide4"]').addEventListener('click', prevSlide);
document.querySelector('#slide1 a[href="#slide2"]').addEventListener('click', nextSlide);
document.querySelector('#slide2 a[href="#slide1"]').addEventListener('click', prevSlide);
document.querySelector('#slide2 a[href="#slide3"]').addEventListener('click', nextSlide);
document.querySelector('#slide3 a[href="#slide2"]').addEventListener('click', prevSlide);
document.querySelector('#slide3 a[href="#slide4"]').addEventListener('click', nextSlide);
document.querySelector('#slide4 a[href="#slide3"]').addEventListener('click', prevSlide);
document.querySelector('#slide4 a[href="#slide1"]').addEventListener('click', nextSlide);
