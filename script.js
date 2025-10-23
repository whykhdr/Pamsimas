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
        pengecekanLink: 'https://forms.gle/t9XHW61KJ3zJttby6', 
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
    const comingSoonContainer = document.getElementById('comingSoonContainer');
    const comingSoonTextElement = document.getElementById('comingSoonText');
    const adminUnitOptionsDiv = document.getElementById('adminUnitOptions');
    const adminOptionsDiv = document.getElementById('adminOptions');
    const userOptionsDiv = document.getElementById('userOptions');
    const logoTextElement = document.querySelector('.container h2');
    const topLogo = document.getElementById('topLogo');

    let loggedInUsername = localStorage.getItem('loggedInUsername');
    let selectedUnit = localStorage.getItem('selectedUnit');

function updateLogo(user) {
  if (loggedInUsername) {
    topLogo.style.display = 'none';
  } else {
    topLogo.style.display = 'block';
  }

  logoTextElement.textContent = '';

  if (user === 'admin') {
    logoTextElement.textContent = 'Pilih Unit';
  } else if (user && users[user]) {
    const img = document.createElement('img');
    img.src = users[user].logo; // Pastikan ini mengarah ke path yang benar
    img.alt = users[user].nama;
    img.style.maxHeight = '100px'; // Ukuran logo diperbesar
    img.style.objectFit = 'contain';
    logoTextElement.appendChild(img);
  } else {
    logoTextElement.textContent = 'PAMSIMAS KUAMANG JAYA';
  }
}


    if (loggedInUsername) {
      loginForm.classList.add('hidden');
      menuContainer.classList.remove('hidden'); // Mengubah 'show' menjadi 'hidden'/'remove'
      if (loggedInUsername === 'admin') {
        if (selectedUnit) {
          // Admin sudah memilih unit
          adminUnitOptionsDiv.classList.add('hidden');
          adminOptionsDiv.classList.remove('hidden');
          updateLogo(selectedUnit);
        } else {
          // Admin belum memilih unit
          adminUnitOptionsDiv.classList.remove('hidden');
          updateLogo('admin');
        }
        userOptionsDiv.classList.add('hidden');
      } else {
        // User biasa
        adminUnitOptionsDiv.classList.add('hidden');
        adminOptionsDiv.classList.add('hidden');
        userOptionsDiv.classList.remove('hidden');
        updateLogo(loggedInUsername);
      }
    } else {
      loginForm.classList.remove('hidden');
      menuContainer.classList.add('hidden');
      adminUnitOptionsDiv.classList.add('hidden');
      adminOptionsDiv.classList.add('hidden');
      userOptionsDiv.classList.add('hidden');
      updateLogo(null);
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
        menuContainer.classList.remove('hidden');
        errorElement.classList.add('hidden');
        
        if (username === 'admin') {
          adminUnitOptionsDiv.classList.remove('hidden');
          adminOptionsDiv.classList.add('hidden');
          userOptionsDiv.classList.add('hidden');
          updateLogo('admin');
        } else {
          // Set selectedUnit untuk user non-admin agar bisa digunakan di goToCetakKwitansi
          localStorage.setItem('selectedUnit', username); 
          selectedUnit = username;
          adminUnitOptionsDiv.classList.add('hidden');
          adminOptionsDiv.classList.add('hidden');
          userOptionsDiv.classList.remove('hidden');
          updateLogo(username);
        }
        comingSoonContainer.classList.add('hidden');
      } else {
        errorElement.classList.remove('hidden');
        adminUnitOptionsDiv.classList.add('hidden');
        adminOptionsDiv.classList.add('hidden');
        userOptionsDiv.classList.add('hidden');
        menuContainer.classList.add('hidden');
        comingSoonContainer.classList.add('hidden');
        updateLogo(null);
      }
    }

// ----------------------------------------------------------------------------------
// FUNGSI BARU UNTUK NAVIGASI CETAK KWITANSI DINAMIS
// ----------------------------------------------------------------------------------
function goToCetakKwitansi() {
    let unitKey = null;

    if (loggedInUsername === 'admin') {
        // Admin: Gunakan selectedUnit
        unitKey = selectedUnit;
    } else if (loggedInUsername) {
        // User Biasa: Gunakan loggedInUsername
        unitKey = loggedInUsername;
    }

    if (unitKey && users.hasOwnProperty(unitKey)) {
        // Tautan dinamis ke folder Kwitansi/ dengan nama unit yang sesuai
        window.location.href = `Kwitansi/${unitKey}.html`;
    } else {
        alert('Tidak dapat mengidentifikasi unit untuk Cetak Kwitansi. Silakan login kembali atau pilih unit (untuk Admin).');
    }
}
// ----------------------------------------------------------------------------------

    function showAdminUnitOptions() {
      adminUnitOptionsDiv.classList.remove('hidden');
      adminOptionsDiv.classList.add('hidden');
      userOptionsDiv.classList.add('hidden');
      comingSoonContainer.classList.add('hidden');
      localStorage.removeItem('selectedUnit');
      selectedUnit = null;
      updateLogo('admin');
    }

    function showAdminOptions(unit) {
      localStorage.setItem('selectedUnit', unit);
      selectedUnit = unit;
      adminUnitOptionsDiv.classList.add('hidden');
      adminOptionsDiv.classList.remove('hidden');
      userOptionsDiv.classList.add('hidden');
      comingSoonContainer.classList.add('hidden');
      updateLogo(unit);
    }

    function showUserOptions(unit) {
      // Fungsi ini mungkin tidak lagi diperlukan karena login langsung mengarahkan user
      localStorage.setItem('selectedUnit', unit);
      selectedUnit = unit;
      adminUnitOptionsDiv.classList.add('hidden');
      adminOptionsDiv.classList.add('hidden');
      userOptionsDiv.classList.remove('hidden');
      comingSoonContainer.classList.add('hidden');
      updateLogo(loggedInUsername);
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
      adminUnitOptionsDiv.classList.add('hidden');
      adminOptionsDiv.classList.add('hidden');
      userOptionsDiv.classList.add('hidden');
      comingSoonContainer.classList.remove('hidden');
      if (feature === 'standAwal') {
        comingSoonTextElement.textContent = 'Fitur Lihat Stand Awal - Coming Soon';
      } else if (feature === 'srBaru') {
        comingSoonTextElement.textContent = 'Fitur Penambahan SR Baru - Coming Soon';
      }
    }

    function hideComingSoon() {
      comingSoonContainer.classList.add('hidden');
      if (loggedInUsername === 'admin') {
        if (selectedUnit) {
          adminUnitOptionsDiv.classList.add('hidden');
          adminOptionsDiv.classList.remove('hidden');
        } else {
          adminUnitOptionsDiv.classList.remove('hidden');
          adminOptionsDiv.classList.add('hidden');
        }
        userOptionsDiv.classList.add('hidden');
        updateLogo(selectedUnit || 'admin');
      } else {
        adminUnitOptionsDiv.classList.add('hidden');
        adminOptionsDiv.classList.add('hidden');
        userOptionsDiv.classList.remove('hidden');
        updateLogo(loggedInUsername);
      }
    }

    function logout() {
      localStorage.removeItem('loggedInUsername');
      localStorage.removeItem('selectedUnit');
      loggedInUsername = null;
      selectedUnit = null;
      menuContainer.classList.add('hidden');
      adminUnitOptionsDiv.classList.add('hidden');
      adminOptionsDiv.classList.add('hidden');
      userOptionsDiv.classList.add('hidden');
      comingSoonContainer.classList.add('hidden');
      loginForm.classList.remove('hidden');
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      updateLogo(null);
    }
