const popup = document.getElementById('postPopup');
const postForm = document.getElementById('postForm');
const closeBtn = document.getElementById('closePopupBtn');

closeBtn.addEventListener('click', () => {
  popup.classList.remove('show');
});

postForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const mainFile = document.getElementById('mainImage').files[0];
  const caption = document.getElementById('captionText').value;

  if (!mainFile) return;

  const readerMain = new FileReader();

  readerMain.onload = function () {
    const mainSrc = readerMain.result;

    const postData = {
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      username: 'you',
      timestamp: 'just now',
      photo: mainSrc,
      caption: caption
    };

    // Zapisz post do localStorage jako JSON
    localStorage.setItem('newPost', JSON.stringify(postData));

    // Przejdź do main_page.html
    window.location.href = 'main_page.html';
  };

  readerMain.readAsDataURL(mainFile);
});
