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

postForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const mainFile = document.getElementById('mainImage').files[0];
  const caption = document.getElementById('captionText').value;

  if (!mainFile) return;

  const readerMain = new FileReader();

  readerMain.onload = function () {
    const mainSrc = readerMain.result;

    const post = document.createElement('div');
    post.className = 'main-container';

    post.innerHTML = `
      <div class="profile">
        <img src="https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}" class="avatar" />
        <div>
          <h2 class="username">you</h2>
          <p class="timestamp">just now</p>
        </div>
      </div>
      <div class="photo-section">
        <img src="${mainSrc}" class="main-photo" />
      </div>
      <p class="caption">${caption}</p>
      <div class="reactions">
        <button class="reaction-btn">❤️ Like <span>0</span></button>
        <button class="reaction-btn">💬 Comment</button>
      </div>
    `;

    feed.prepend(post);
    popup.classList.remove('show');
    postForm.reset();
  };

  readerMain.readAsDataURL(mainFile);
});
