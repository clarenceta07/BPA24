//menu toggle
const menuToggle = document.querySelector('.toggle');
          const showcase = document.querySelector('.showcase');
    
          menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            showcase.classList.toggle('active');
          })

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

