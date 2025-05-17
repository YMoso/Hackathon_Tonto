document.addEventListener("DOMContentLoaded", function () {
  const feed = document.querySelector('.feed');
  const storedPost = localStorage.getItem('newPost');

  if (storedPost && feed) {
    const postData = JSON.parse(storedPost);

    const post = document.createElement('div');
    post.className = 'main-container';
    post.innerHTML = `
      <div class="profile">
        <img src="${postData.avatar}" class="avatar" />
        <div>
          <h2 class="username">${postData.username}</h2>
          <p class="timestamp">${postData.timestamp}</p>
        </div>
      </div>
      <div class="photo-section">
        <img src="${postData.photo}" class="main-photo" />
      </div>
      <p class="caption">${postData.caption}</p>
      <div class="reactions">
        <button class="reaction-btn">❤️ Like <span>0</span></button>
        <button class="reaction-btn">💬 Comment</button>
      </div>
    `;

    feed.prepend(post);
    localStorage.removeItem('newPost'); // usuń po wstawieniu
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.reaction-btn');

  likeButtons.forEach(button => {
    // Skip non-like buttons (e.g., "💬 Comment")
    if (!button.textContent.includes('Like')) return;

    let liked = false;

    button.addEventListener('click', () => {
      const span = button.querySelector('span');
      let count = parseInt(span.textContent);

      if (!liked) {
        span.textContent = count + 1;
        button.classList.add('liked');
        liked = true;
      } else {
        span.textContent = count - 1;
        button.classList.remove('liked');
        liked = false;
      }
    });
  });
});
function checkFeedEmpty() {
  const feed = document.querySelector('.feed');
  const posts = feed.querySelectorAll('.main-container');

  if (posts.length === 0) {
    const message = document.createElement('div');
    message.textContent = "For now the feed is empty. We wish you all the best in completing today's task!";
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '1.5rem';
    message.style.color = '#512da8';
    message.style.textAlign = 'center';
    message.style.padding = '1rem 2rem';
    message.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    message.style.borderRadius = '15px';
    message.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    message.style.maxWidth = '90%';
    message.style.zIndex = '10000';

    document.body.appendChild(message);
  }
}

// Call the function when page loads
window.addEventListener('DOMContentLoaded', checkFeedEmpty);