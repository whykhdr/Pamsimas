Const users = {
    'tirtakusuma': { password: 'suciani', pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeNhpNqjhvrYxOOOyQzr2BzGIZC8zc6duN3nT2yVm3nF5xpuA/closedform', nama: 'Tirta Kusuma' },
    'tirtajaya': { password: 'suparno', pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSefK0cNmlpwbP2Eu-5JkbuJAdxplR0SUzSx8MqWZk2Yl5XysQ/viewform', nama: 'Tirta Jaya' },
    'margotirto': { password: 'samuji', pengecekanLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc2kZjZ2dfdy8dVOy3bEEu6260B5P6FZ4RPJfqQEXpGwq8wqQ/viewform', nama: 'Margo Tirto' },
    'admin': { password: 'khodari22', nama: 'Admin' }
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
const logoTextElement = document.querySelector('.logo-text'); // Dapatkan elemen h2 dengan kelas logo-text

let loggedInUsername = localStorage.getItem('loggedInUsername');
let selectedUnit = localStorage.getItem('selectedUnit');

// Fungsi untuk memperbarui teks logo
function updateLogoText(namaUnit) {
    logoTextElement.textContent = namaUnit;
}

// Cek status login saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
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
});

function login() {
    alert('Tombol Login Ditekan!'); // 1. Cek apakah fungsi login terpanggil

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (!usernameInput) {
        alert('Error: Elemen username tidak ditemukan!'); // 2. Cek keberadaan elemen username
        return;
    }
    if (!passwordInput) {
        alert('Error: Elemen password tidak ditemukan!'); // 3. Cek keberadaan elemen password
        return;
    }

    const username = usernameInput.value;
    const password = passwordInput.value;

    alert('Username yang dimasukkan: ' + username); // 4. Cek nilai username
    alert('Password yang dimasukkan: ' + password); // 5. Cek nilai password

    if (users.hasOwnProperty(username)) {
        alert('Username ditemukan dalam data pengguna.'); // 6. Cek apakah username ada di data
        if (users[username].password === password) {
            alert('Password cocok!'); // 7. Cek apakah password cocok
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
            alert('Password salah!'); // 8. Password tidak cocok
            errorElement.classList.remove('hidden');
            adminUnitOptionsDiv.classList.remove('show');
            adminOptionsDiv.classList.remove('show');
            userOptionsDiv.classList.remove('show');
            menuContainer.classList.remove('show');
            comingSoonContainer.classList.remove('show');
            updateLogoText('PAMSIMAS KUJA');
        }
    } else {
        alert('Username tidak ditemukan!'); // 9. Username tidak ada di data
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
    adminUnitOptionsDiv.classList.remove('show');
    adminOptionsDiv.classList.remove('show');
    userOptionsDiv.classList.remove('show');
    comingSoonContainer.classList.remove('show');
    loginForm.classList.remove('hidden');
    updateLogoText('PAMSIMAS KUJA');
}
