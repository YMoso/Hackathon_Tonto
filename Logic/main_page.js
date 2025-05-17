const btn = document.getElementById('postBtn');
const popup = document.getElementById('postPopup');
const postForm = document.getElementById('postForm');
const feed = document.querySelector('.feed');
const closeBtn = document.getElementById('closePopupBtn'); // new

btn.addEventListener('click',()=>{
  popup.classList.add('show');
})

closeBtn.addEventListener('click', () => {
  popup.classList.remove('show'); // new
});

document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/add_posts', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const posts = data;  // Assuming data is an object mapping photo info
      console.log("Image map loaded:", posts);

      // Example function to render images/posts on the page
      renderFeedWithImages(posts);
    })
    .catch(error => {
      console.error("Error loading image map:", error);
    });
});


function renderFeedWithImages(imageMap) {
  const feed = document.querySelector('.feed');
  feed.innerHTML = ""; // Clear existing feed if any

  for (const photoId in imageMap) {
    const photo = imageMap[photoId];

    // Create post element (adapt as needed)
    const post = document.createElement('div');
    post.className = 'main-container';

    post.innerHTML = `
      <div class="profile">
        <img src="https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}" class="avatar" />
        <div>
          <h2 class="username">${photo.uploadedBy || "unknown"}</h2>
          <p class="timestamp">${photo.timestamp || "some time ago"}</p>
        </div>
      </div>
      <div class="photo-section">
        <img src="${photo.url}" class="main-photo" />
      </div>
      <p class="caption">${photo.caption || ""}</p>
      <div class="reactions">
        <button class="reaction-btn">❤️ Like <span>${photo.likes || 0}</span></button>
        <button class="reaction-btn">💬 Comment</button>
      </div>
    `;

    feed.prepend(post);
  }
}

