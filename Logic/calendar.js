const calendar = document.getElementById('calendar');
const modal = document.getElementById('modal');
const photo = document.getElementById('photo');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');

var imageMap= {};
document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/calendar-images')
    .then(response => response.json())
    .then(data => {
      imageMap = data;
      console.log("Image map loaded:", imageMap);
      renderCalendar(currentYear, new Date().getMonth());
    })
    .catch(error => {
      console.error("Error loading image map:", error);
    });
});


const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
monthNames.forEach((name, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = name;
  monthSelect.appendChild(option);
});


const currentYear = new Date().getFullYear();
for (let year = 2000; year <= currentYear; year++) {
  const option = document.createElement('option');
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

// Set current values
monthSelect.value = new Date().getMonth();
yearSelect.value = currentYear;

// Render calendar
function renderCalendar(year, month) {
  calendar.innerHTML = ''; // Clear previous content

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Blank days
  for (let i = 0; i < firstDayOfMonth; i++) {
    const blank = document.createElement('div');
    calendar.appendChild(blank);
  }

  // Days with images
  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement('div');
    div.className = 'day';
    div.setAttribute('data-day', day);

    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    console.log('Rendering date:', dateKey); // add this
    if (imageMap[dateKey]) {
      div.style.backgroundImage = `url('${imageMap[dateKey]}')`;
    }

    div.onclick = () => {
      if (imageMap[dateKey]) {
        photo.src = imageMap[dateKey];
        modal.style.display = 'flex';
      } else {
        alert('No photo for this day.');
      }
    };

    calendar.appendChild(div);
  }
}

// On change
monthSelect.addEventListener('change', () => {
  renderCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value));
});
yearSelect.addEventListener('change', () => {
  renderCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value));
});

function closeModal() {
  modal.style.display = 'none';
  photo.src = '';
}