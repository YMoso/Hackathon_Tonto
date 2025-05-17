const main = document.getElementById('main-container');
const join = document.getElementById('join-container');
const joinbtn = document.getElementById('join-btn');
const backBtnJoin = document.getElementById('back-btn-join');
const create = document.getElementById('create-container');
const createbtn = document.getElementById('create-btn');
const backBtnCreate = document.getElementById('back-btn-create');
const publiccon = document.getElementById('public-container');
const publicbtn = document.getElementById('public-btn');
const backBtnPub = document.getElementById('back-btn-public');

joinbtn.addEventListener('click', () => {
  main.classList.add('fade-out');

  setTimeout(() => {
    main.style.display = 'none';
    main.classList.remove('fade-out');

    join.style.display = 'block';
    void join.offsetWidth;

    join.classList.add('fade-in');
  }, 500);
});

backBtnJoin.addEventListener('click', (e) => {
  e.preventDefault();

  join.classList.remove('fade-in');
  join.classList.add('fade-out');

  setTimeout(() => {
    join.style.display = 'none';
    join.classList.remove('fade-out');

    main.style.display = 'block';
    void main.offsetWidth;

    main.classList.add('fade-in');

    setTimeout(() => {
      main.classList.remove('fade-in');
    }, 500);
  }, 500);
});

createbtn.addEventListener('click', () => {
  main.classList.add('fade-out');

  setTimeout(() => {
    main.style.display = 'none';
    main.classList.remove('fade-out');

    create.style.display = 'block';
    void create.offsetWidth;

    create.classList.add('fade-in');
  }, 500);
});

backBtnCreate.addEventListener('click', (e) => {
  e.preventDefault();

  create.classList.remove('fade-in');
  create.classList.add('fade-out');

  setTimeout(() => {
    create.style.display = 'none';
    create.classList.remove('fade-out');

    main.style.display = 'block';
    void main.offsetWidth;

    main.classList.add('fade-in');

    setTimeout(() => {
      main.classList.remove('fade-in');
    }, 500);
  }, 500);
});

publicbtn.addEventListener('click', () => {
  main.classList.add('fade-out');

  setTimeout(() => {
    main.style.display = 'none';
    main.classList.remove('fade-out');

    publiccon.style.display = 'block';
    void publiccon.offsetWidth;

    publiccon.classList.add('fade-in');
  }, 500)
});

backBtnPub.addEventListener('click', (e) => {
  e.preventDefault();

  publiccon.classList.remove('fade-in');
  publiccon.classList.add('fade-out');

  setTimeout(() => {
    publiccon.style.display = 'none';
    publiccon.classList.remove('fade-out');

    main.style.display = 'block';
    void main.offsetWidth;

    main.classList.add('fade-in');

    setTimeout(() => {
      main.classList.remove('fade-in'); // clean up
    }, 500);
  }, 500);
});

function generateInviteKey(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

const inviteKeyElem = document.getElementById('invite-key');
const createGroupForm = document.getElementById('create-group-form');

function showInviteKey() {
  const key = generateInviteKey();
  inviteKeyElem.textContent = key;
  inviteKeyElem.dataset.key = key;
}

showInviteKey();

createGroupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const groupName = document.getElementById('group-name-create').value.trim();
  const inviteKey = inviteKeyElem.dataset.key;

  if (!groupName) {
    alert('Podaj nazwę grupy.');
    return;
  }

  console.log('Tworzenie grupy:', { groupName, inviteKey });

  alert(`Grupa "${groupName}" została utworzona z kluczem: ${inviteKey}`);

});

const publicInviteForm = document.getElementById('public-invite-form');
const publicInviteCodeInput = document.getElementById('public-invite-code');

publicInviteForm.addEventListener('submit', (e) => {
  const code = publicInviteCodeInput.value.trim();

  if (code.length !== 10) {
    e.preventDefault();
    alert('Kod zaproszenia musi mieć dokładnie 10 znaków.');
    publicInviteCodeInput.focus();
  } else {

  }
});