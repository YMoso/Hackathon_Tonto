
document.addEventListener("DOMContentLoaded", function() {

  loadFooter("../templates/footer.html").catch(() => {

    loadFooter("footer.html").catch(() => {

      document.getElementById("footer-placeholder").innerHTML =
        '<div style="text-align: center; padding: 20px; color: red;">'+
        'Could not load footer. Please check file paths.</div>';
    });
  });
});


function loadFooter(path) {
  return new Promise((resolve, reject) => {
    fetch("/footer")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
        initializeFooterFunctionality();
        console.log("Footer loaded successfully from:", path);
        resolve();
      })
      .catch(error => {
        console.error("Error loading footer from " + path + ":", error);
        reject(error);
      });
  });
}


function initializeFooterFunctionality() {
  const fabButton = document.getElementById('fabButton');
  const fabMenu = document.getElementById('fabMenu');
  const menuOverlay = document.getElementById('menuOverlay');


  if (!fabButton || !fabMenu || !menuOverlay) {
    console.error("Footer elements not found! Make sure footer.html contains these elements.");
    return;
  }

  const menuItems = document.querySelectorAll('.menu-item');


  fabButton.addEventListener('click', function() {
    fabButton.classList.toggle('active');
    fabMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
  });

  menuOverlay.addEventListener('click', function() {
    fabButton.classList.remove('active');
    fabMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });

  menuItems.forEach(item => {
    item.addEventListener('click', function() {

      const selectedOption = this.textContent;

      switch(selectedOption) {
        case "Dołącz do grupy":
          console.log("User wants to join a group");

          break;

        case "Stwórz grupę":
          console.log("User wants to create a group");

          break;

        case "Dołącz do ogólnej grupy":
          console.log("User wants to join general group");

          break;

        case "Dodaj post":
          console.log("User wants to add post");
          break;
      }


      fabButton.classList.remove('active');
      fabMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
    });
  });
}