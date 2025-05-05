const users = {
    'tirtakusuma': { password: 'suciani', pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeNhpNqjhvrYxOOOyQzr2BzGIZC8zc6duN3nT2yVm3nF5xpuA/closedform', nama: 'Tirta Kusuma' },
    'tirtajaya': { password: 'suparno', pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSefK0cNmlpwbP2Eu-5JkbuJAdxplR0SUzSx8MqWZk2Yl5XysQ/viewform', nama: 'Tirta Jaya' },
    'margotirto': { password: 'samuji', pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc2kZjZ2dfdy8dVOy3bEEu6260B5P6FZ4RPJfqQEXpGwq8wqQ/viewform', nama: 'Margo Tirto' },
    'admin': { password: 'khodari22', nama: 'Admin' }
};

const loginForm = document.getElementById('loginForm');
const menuContainer = document.getElementById('menuContainer');
const errorElement = document.getElementById('error');
const comingSoonContainer = document.getElementById('comingSoonContainer');
const comingSoonTextElement = document.getElementById('comingSoonText');
const adminUnitOptionsDiv = document.getElementById('adminUnitOptions');
const adminOptionsDiv = document.getElementById('adminOptions');
const userOptionsDiv = document.getElementById('userOptions');
const logoTextElement = document.querySelector('.container h2');

let loggedInUsername = localStorage.getItem('loggedInUsername');
let selectedUnit = localStorage.getItem('selectedUnit');

function updateLogoText(namaUnit) {
    logoTextElement.textContent = namaUnit;
}

if (loggedInUsername) {
    loginForm.classList.add('hidden');
    menuContainer.classList.add('show');
    if (loggedInUsername === 'admin') {
        adminUnitOptionsDiv.classList.add('show');
        adminOptionsDiv.classList.remove('show');
        userOptionsDiv.classList.remove('show');
        updateLogoText('Pilih Unit');
    } else {
        adminUnitOptionsDiv.classList.remove('show');
        adminOptionsDiv.classList.remove('show');
        userOptionsDiv.classList.add('show');
        updateLogoText(users[loggedInUsername].nama);
    }
} else {
    loginForm.classList.remove('hidden');
    menuContainer.classList.remove('show');
    adminUnitOptionsDiv.classList.remove('show');
    adminOptionsDiv.classList.remove('show');
    userOptionsDiv.classList.remove('show');
    updateLogoText('PAMSIMAS KUJA');
}

function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (users.hasOwnProperty(username) && users[username].password === password) {
        localStorage.setItem('loggedInUsername', username);
        loggedInUsername = username;
        loginForm.classList.add('hidden');
        menuContainer.classList.add('show');
        errorElement.classList.add('hidden');
        if (username === 'admin') {
            adminUnitOptionsDiv.classList.add('show');
            adminOptionsDiv.classList.remove('show');
            userOptionsDiv.classList.remove('show');
            updateLogoText('Pilih Unit');
        } else {
            adminUnitOptionsDiv.classList.remove('show');
            adminOptionsDiv.classList.remove('show');
            userOptionsDiv.classList.add('show');
            updateLogoText(users[username].nama);
        }
        comingSoonContainer.classList.remove('show');
    } else {
        errorElement.classList.remove('hidden');
        adminUnitOptionsDiv.classList.remove('show');
        adminOptionsDiv.classList.remove('show');
        userOptionsDiv.classList.remove('show');
        menuContainer.classList.remove('show');
        comingSoonContainer.classList.remove('show');
        updateLogoText('PAMSIMAS KUJA');
    }
}

function showAdminUnitOptions() {
    adminUnitOptionsDiv.classList.add('show');
    adminOptionsDiv.classList.remove('show');
    userOptionsDiv.classList.remove('show');
    comingSoonContainer.classList.remove('show');
    localStorage.removeItem('selectedUnit
