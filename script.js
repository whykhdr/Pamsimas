const users = {
  'tirtakusuma': {
    password: 'suciani', 
    pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeNhpNqjhvrYxOOOyQzr2BzGIZC8zc6duN3nT2yVm3nF5xpuA/closedform', 
    nama: 'Tirta Kusuma', 
    logo: 'Logo/tirtakusuma.png'
  },
  'tirtajaya': {
    password: 'suparno', 
    pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSefK0cNmlpwbP2Eu-5JkbuJAdxplR0SUzSx8MqWZk2Yl5XysQ/viewform', 
    nama: 'Tirta Jaya', 
    logo: 'Logo/tirtajaya.png'
  },
  'margotirto': {
    password: 'giono', 
    pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc2kZjZ2dfdy8dVOy3bEEu6260B5P6FZ4RPJfqQEXpGwq8wqQ/viewform', 
    nama: 'Margo Tirto', 
    logo: 'Logo/margotirto.png'
  },
  'admin': {
    password: 'khodari22', 
    nama: 'Admin'
  }
};

const loginForm = document.getElementById('loginForm');
const menuContainer = document.getElementById('menuContainer');
const errorElement = document.getElementById('error');
const adminUnitOptionsDiv = document.getElementById('adminUnitOptions');
const userOptionsDiv = document.getElementById('userOptions');
const logoTextElement = document.querySelector('.container h2');
const topLogo = document.getElementById('topLogo');

// Ambil elemen input
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Fungsi login
function login() {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (users.hasOwnProperty(username) && users[username].password === password) {
    localStorage.setItem('loggedInUsername', username);
    loginForm.classList.add('hidden');
    menuContainer.classList.add('show');
    errorElement.classList.add('hidden');
    
    if (username === 'admin') {
      adminUnitOptionsDiv.classList.add('show');
    } else {
      userOptionsDiv.classList.add('show');
    }
    updateLogo(username);
  } else {
    errorElement.classList.remove('hidden');
  }
}

// Fungsi untuk memperbarui logo
function updateLogo(user) {
  logoTextElement.textContent = '';
  if (user && users[user]) {
    const img = document.createElement('img');
    img.src = users[user].logo;
    img.alt = users[user].nama;
    img.style.maxHeight = '100px';
    img.style.objectFit = 'contain';
    logoTextElement.appendChild(img);
  } else {
    logoTextElement.textContent = 'PAMSIMAS KUAMANG JAYA';
  }
}

// Fungsi untuk logout
function logout() {
  localStorage.removeItem('loggedInUsername');
  loginForm.classList.remove('hidden');
  menuContainer.classList.remove('show');
  errorElement.classList.add('hidden');
  logoTextElement.textContent = 'PAMSIMAS KUAMANG JAYA';
}

// Inisialisasi
let loggedInUsername = localStorage.getItem('loggedInUsername');
if (loggedInUsername) {
  loginForm.classList.add('hidden');
  menuContainer.classList.add('show');
  updateLogo(loggedInUsername);
  if (loggedInUsername === 'admin') {
    adminUnitOptionsDiv.classList.add('show');
  } else {
    userOptionsDiv.classList.add('show');
  }
} else {
  loginForm.classList.remove('hidden');
  menuContainer.classList.remove('show');
}
