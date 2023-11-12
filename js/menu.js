const img = document.querySelector('.background'); // Replace with your actual class name


//Zoom in on load
window.addEventListener('load', function() {
  const img = document.querySelector('.background');
  // Delay the scaling slightly to allow for the transition to be seen
  setTimeout(function() {
    img.style.transform = 'scale(1.1)';
  }, 50); // Delay by 50 milliseconds
});