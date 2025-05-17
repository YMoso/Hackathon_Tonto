// Modified footer.js to handle potential path issues
document.addEventListener("DOMContentLoaded", function() {
  // First try the relative path
  loadFooter("../templates/footer.html").catch(() => {
    // If that fails, try looking in the same directory
    loadFooter("footer.html").catch(() => {
      // If that also fails, show an error message in the footer placeholder
      document.getElementById("footer-placeholder").innerHTML =
        '<div style="text-align: center; padding: 20px; color: red;">'+
        'Could not load footer. Please check file paths.</div>';
    });
  });
});

// Function to load the footer with proper error handling
function loadFooter(path) {
  return new Promise((resolve, reject) => {
    fetch(path)
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

// Initialize footer functionality after the footer HTML is loaded
function initializeFooterFunctionality() {
  const fabButton = document.getElementById('fabButton');
  const fabMenu = document.getElementById('fabMenu');
  const menuOverlay = document.getElementById('menuOverlay');

  // Check if elements exist before adding event listeners
  if (!fabButton || !fabMenu || !menuOverlay) {
    console.error("Footer elements not found! Make sure footer.html contains these elements.");
    return;
  }

  const menuItems = document.querySelectorAll('.menu-item');

  // Toggle menu when FAB is clicked
  fabButton.addEventListener('click', function() {
    fabButton.classList.toggle('active');
    fabMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
  });

  // Close menu when overlay is clicked
  menuOverlay.addEventListener('click', function() {
    fabButton.classList.remove('active');
    fabMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });

  // Add click events to menu items
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // Here you can add code to handle each menu item click
      const selectedOption = this.textContent;

      switch(selectedOption) {
        case "Dołącz do grupy":
          console.log("User wants to join a group");
          // window.location.href = "join_group.html";
          break;

        case "Stwórz grupę":
          console.log("User wants to create a group");
          // window.location.href = "create_group.html";
          break;

        case "Dołącz do ogólnej grupy":
          console.log("User wants to join general group");
          // window.location.href = "general_group.html";
          break;

        case "Dodaj post":
          console.log("User wants to add post");
          break;
      }

      // Close the menu after selection
      fabButton.classList.remove('active');
      fabMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
    });
  });
}