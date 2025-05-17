function submitChallenge() {
      const title = document.getElementById("challenge-title").value.trim();
      const desc = document.getElementById("challenge-desc").value.trim();

      if (!title || !desc) {
        alert("Please fill in both fields!");
        return;
      }

      document.getElementById("display-title").textContent = `🎯 ${title}`;
      document.getElementById("display-desc").textContent = desc;
      document.getElementById("challenge-form").style.display = "none";
      document.getElementById("challenge-display").style.display = "block";
    }

    function openPostPopup() {
      document.getElementById("postPopup").classList.add("show");
    }

    function closePostPopup() {
      document.getElementById("postPopup").classList.remove("show");
    }

    document.getElementById("postForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const fileInput = document.getElementById("mainImage");
      const caption = document.getElementById("captionText").value.trim();

      if (!fileInput.files.length || !caption) {
        alert("Please upload a photo and write a caption.");
        return;
      }

      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageSrc = e.target.result;

        const postHTML = `
          <div class="group-post">
            <div class="profile">
              <img src="https://i.pravatar.cc/150?img=5" class="avatar" />
              <div>
                <p class="username">You</p>
                <p class="timestamp">Just now</p>
              </div>
            </div>
            <img src="${imageSrc}" alt="Uploaded" class="main-photo" />
            <p class="caption">${caption}</p>
            <div class="reactions">
              <button class="reaction-btn">❤️ Like</button>
              <button class="reaction-btn">💬 Comment</button>
            </div>
          </div>
        `;

        document.getElementById("groupFeed").insertAdjacentHTML("afterbegin", postHTML);
        closePostPopup();
        document.getElementById("postForm").reset();

        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      };

      reader.readAsDataURL(file);
    });