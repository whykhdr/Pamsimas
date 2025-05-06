const users = {
    'tirtakusuma': { 
        password: 'suciani', 
        pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeNhpNqjhvrYxOOOyQzr2BzGIZC8zc6duN3nT2yVm3nF5xpuA/closedform', 
        nama: 'Tirta Kusuma',
        logo: 'tirtakusuma.png' // Logo untuk unit Tirta Kusuma
    },
    'tirtajaya': { 
        password: 'suparno', 
        pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSefK0cNmlpwbP2Eu-5JkbuJAdxplR0SUzSx8MqWZk2Yl5XysQ/viewform', 
        nama: 'Tirta Jaya',
        logo: 'tirtajaya.png' // Logo untuk unit Tirta Jaya
    },
    'margotirto': { 
        password: 'giono', 
        pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc2kZjZ2dfdy8dVOy3bEEu6260B5P6FZ4RPJfqQEXpGwq8wqQ/viewform', 
        nama: 'Margo Tirto',
        logo: 'margotirto.png' // Logo untuk unit Margo Tirto
    },
    'admin': { 
        password: 'khodari22', 
        nama: 'Admin',
        logo: 'logo_admin.png' // Logo untuk admin
    }
    // Anda bisa menambahkan lebih banyak pengguna di sini
};

const loginForm = document.getElementById('loginForm');
const menuContainer = document.getElementById('menuContainer');
const errorElement = document.getElementById('error');
const comingSoonContainer = document.getElementById('comingSoonContainer');
const comingSoonTextElement = document.getElementById('comingSoonText');
const adminUnitOptionsDiv = document.getElementById('adminUnitOptions');
const adminOptionsDiv = document.getElementById('adminOptions');
const userOptionsDiv = document.getElementById('userOptions');
const logoTextElement = document.querySelector('.container h2'); // Dapatkan elemen h2 di dalam container

let loggedInUsername = localStorage.getItem('loggedInUsername');
let selectedUnit = localStorage.getItem('selectedUnit');

// Fungsi untuk memperbarui teks logo
function updateLogoText(namaUnit) {
logoTextElement.textContent = namaUnit;
}

// Cek status login saat halaman dimuat
if (loggedInUsername) {
loginForm.classList.add('hidden');
menuContainer.classList.add('show');
if (loggedInUsername === 'admin') {
adminUnitOptionsDiv.classList.add('show');
adminOptionsDiv.classList.remove('show');
userOptionsDiv.classList.remove('show');
updateLogoText('Pilih Unit'); // Teks awal untuk admin
} else {
adminUnitOptionsDiv.classList.remove('show');
adminOptionsDiv.classList.remove('show');
userOptionsDiv.classList.add('show');
updateLogoText(users[loggedInUsername].nama); // Tampilkan nama unit user
}
} else {
loginForm.classList.remove('hidden');
menuContainer.classList.remove('show');
adminUnitOptionsDiv.classList.remove('show');
adminOptionsDiv.classList.remove('show');
userOptionsDiv.classList.remove('show');
updateLogoText('PAMSIMAS KUJA'); // Teks default saat belum login
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

        // Ganti logo sesuai pengguna
        const logo = document.querySelector('.logo'); // Ambil elemen logo
        logo.src = users[username].logo; // Ganti dengan logo admin

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
        updateLogoText('PAMSIMAS KUJA'); // Kembalikan teks logo ke default
    }
}

function showAdminUnitOptions() {
adminUnitOptionsDiv.classList.add('show');
adminOptionsDiv.classList.remove('show');
userOptionsDiv.classList.remove('show');
comingSoonContainer.classList.remove('show');
localStorage.removeItem('selectedUnit');
selectedUnit = null;
updateLogoText('Pilih Unit');
}

function showAdminOptions(unit) {
    localStorage.setItem('selectedUnit', unit);
    selectedUnit = unit;
    adminUnitOptionsDiv.classList.remove('show');
    adminOptionsDiv.classList.add('show');
    userOptionsDiv.classList.remove('show');
    comingSoonContainer.classList.remove('show');
    
    const namaUnit = users[unit] ? users[unit].nama : 'Admin';
    updateLogoText(namaUnit);
    
    // Ganti logo sesuai unit
    const logo = document.querySelector('.logo'); // Ambil elemen logo
    logo.src = users[unit].logo; // Ganti dengan logo unit yang dipilih
}

function showUserOptions(unit) {
localStorage.setItem('selectedUnit', unit);
selectedUnit = unit;
adminUnitOptionsDiv.classList.remove('show');
adminOptionsDiv.classList.remove('show');
userOptionsDiv.classList.add('show');
comingSoonContainer.classList.remove('show');
updateLogoText(users[loggedInUsername].nama);
}

function goToPengecekan() {
if (loggedInUsername) {
let link = null;
if (loggedInUsername === 'admin' && selectedUnit) {
link = users[selectedUnit] ? users[selectedUnit].pengecekanLink : null;
} else if (loggedInUsername !== 'admin') {
link = users[loggedInUsername] ? users[loggedInUsername].pengecekanLink : null;
}

if (link) {
window.location.href = link;
} else {
alert('Link Input Data Penggunaan tidak ditemukan.');
}
} else {
alert('Anda belum login.');
}
}

function showComingSoon(feature) {
adminUnitOptionsDiv.classList.remove('show');
adminOptionsDiv.classList.remove('show');
userOptionsDiv.classList.remove('show');
comingSoonContainer.classList.add('show');
if (feature === 'standAwal') {
comingSoonTextElement.textContent = 'Fitur Lihat Stand Awal - Coming Soon';
} else if (feature === 'srBaru') {
comingSoonTextElement.textContent = 'Fitur Penambahan SR Baru - Coming Soon';
}
// Teks logo tetap sesuai unit yang dipilih
}

function hideComingSoon() {
comingSoonContainer.classList.remove('show');
if (loggedInUsername === 'admin') {
adminUnitOptionsDiv.classList.remove('show');
adminOptionsDiv.classList.add('show');
userOptionsDiv.classList.remove('show');
const namaUnit = users[selectedUnit] ? users[selectedUnit].nama : 'Admin';
updateLogoText(namaUnit);
} else {
adminUnitOptionsDiv.classList.remove('show');
adminOptionsDiv.classList.remove('show');
userOptionsDiv.classList.add('show');
updateLogoText(users[loggedInUsername].nama);
}
}

function logout() {
localStorage.removeItem('loggedInUsername');
localStorage.removeItem('selectedUnit');
loggedInUsername = null;
selectedUnit = null;
            menuContainer.classList.remove('show');
            menuContainer.classList.remove('show');
adminUnitOptionsDiv.classList.remove('show');
adminOptionsDiv.classList.remove('show');
userOptionsDiv.classList.remove('show');
comingSoonContainer.classList.remove('show');
loginForm.classList.remove('hidden');
document.getElementById('username').value = '';
document.getElementById('password').value = '';
updateLogoText('PAMSIMAS KUJA'); // Kembalikan teks logo ke default
}
