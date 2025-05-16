// Load footer dynamically
fetch("footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });

// Image modal functionality
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImage");
  const zoomablePhotos = document.querySelectorAll(".zoomable-photo");
  const closeBtn = document.querySelector(".close");

  zoomablePhotos.forEach(photo => {
    photo.onclick = () => {
      modal.style.display = "block";
      modalImg.src = photo.src;
    };
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };
});
