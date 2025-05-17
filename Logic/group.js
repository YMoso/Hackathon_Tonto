const feelu_activities = {
    "Stres i napięcie": [
        "Medytuj przez 5 minut, skupiając się na oddechu",
        "Wybierz się na 15-minutowy spacer na świeżym powietrzu",
        "Posłuchaj swojej ulubionej relaksującej muzyki przez 10 minut",
        "Zrób 10 minut jogi rozluźniającej",
        "Napisz listę 5 rzeczy, które dzisiaj poszły dobrze"
    ],
    "Brak motywacji i zniechęcenie": [
        "Zapisz 3 rzeczy, za które jesteś wdzięczny/wdzięczna dzisiaj",
        "Napisz komplement lub pozytywną wiadomość do innego członka grupy",
        "Podziel się dobrą wiadomością lub sukcesem z ostatnich dni",
        "Napisz plan działania na kolejny tydzień",
        "Zrób listę swoich mocnych stron i przeczytaj ją na głos"
    ],
    "Samotność i potrzeba wsparcia": [
        "Zapisz, jak się dzisiaj czujesz, i podziel się swoimi emocjami z grupą",
        "Napisz wiadomość do osoby, z którą dawno nie rozmawiałeś/łaś",
        "Weź udział w krótkiej rozmowie video z członkiem grupy"
    ],
    "Niska aktywność fizyczna": [
        "Wykonaj 10 minut rozciągania",
        "Zrób 10 000 kroków",
        "Weź udział w 20-minutowym treningu online",
        "Zrób krótką, 3-minutową przerwę na taniec do ulubionej piosenki"
    ],
    "Rutyna i nuda": [
        "Zrób zdjęcie czegoś, co Cię dzisiaj ucieszyło i wrzuć do grupy",
        "Ubierz coś zabawnego lub nietypowego i zrób selfie",
        "Spędź 2 godziny bez telefonu",
        "Znajdź 3 nowe ciekawostki na wybrany temat",
        "Spróbuj nauczyć się 5 nowych słówek w obcym języku"
    ],
    "Brak rozwoju osobistego": [
        "Posłuchaj podcastu na temat rozwoju osobistego lub radzenia sobie ze stresem",
        "Zaplanuj i zapisz jeden cel rozwojowy na najbliższy miesiąc",
        "Napisz list do siebie z przyszłości - gdzie chcesz być za rok?"
    ],
    "Problemy ze snem": [
        "Przed snem wykonaj 10 minut relaksacji z muzyką lub dźwiękami natury",
        "Unikaj ekranów minimum 1 godzinę przed snem",
        "Wypij ciepłą herbatę ziołową (np. melisa, rumianek) przed snem"
    ],
    "Lęk i niepokój": [
        "Zrób 5-minutową wizualizację spokojnego miejsca",
        "Zapisz listę rzeczy, które możesz kontrolować i tych, które nie zależą od Ciebie"
    ],
    "Niska samoocena": [
        "Napisz 5 rzeczy, które lubisz w sobie",
        "Przypomnij sobie i zapisz swoje ostatnie sukcesy, nawet te małe"
    ],
    "Problemy z koncentracją": [
        "Wypróbuj metodę Pomodoro – 25 minut pracy, 5 minut przerwy"
    ],
    "Negatywne myśli": [
        "Zapisz negatywne myśli i spróbuj zastąpić je pozytywnymi"
    ],
    "Izolacja społeczna": [
        "Zaproś kogoś na wspólną aktywność (spacer, kawa, online)"
    ]
}

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

    function fillRandomChallenge() {
  const topics = Object.keys(feelu_activities);
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const activities = feelu_activities[randomTopic];
  const randomActivity = activities[Math.floor(Math.random() * activities.length)];

  document.getElementById("challenge-title").value = randomTopic;
  document.getElementById("challenge-desc").value = randomActivity;
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