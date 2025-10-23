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
      menuContainer.classList.add('show');
      if (loggedInUsername === 'admin') {
        if (selectedUnit) {
          // Admin sudah memilih unit
          adminUnitOptionsDiv.classList.remove('show');
          adminOptionsDiv.classList.add('show');
          updateLogo(selectedUnit);
        } else {
          // Admin belum memilih unit
          adminUnitOptionsDiv.classList.add('show');
          updateLogo('admin');
        }
        userOptionsDiv.classList.remove('show');
      } else {
        // User biasa
        adminUnitOptionsDiv.classList.remove('show');
        adminOptionsDiv.classList.remove('show');
        userOptionsDiv.classList.add('show');
        updateLogo(loggedInUsername);
      }
    } else {
      loginForm.classList.remove('hidden');
      menuContainer.classList.remove('show');
      adminUnitOptionsDiv.classList.remove('show');
      adminOptionsDiv.classList.remove('show');
      userOptionsDiv.classList.remove('show');
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
        menuContainer.classList.add('show');
        errorElement.classList.add('hidden');
        
        if (username === 'admin') {
          adminUnitOptionsDiv.classList.add('show');
          adminOptionsDiv.classList.remove('show');
          userOptionsDiv.classList.remove('show');
          updateLogo('admin');
        } else {
          // Set selectedUnit untuk user non-admin agar bisa digunakan di goToCetakKwitansi
          localStorage.setItem('selectedUnit', username); 
          selectedUnit = username;
          adminUnitOptionsDiv.classList.remove('show');
          adminOptionsDiv.classList.remove('show');
          userOptionsDiv.classList.add('show');
          updateLogo(username);
        }
        comingSoonContainer.classList.remove('show');
      } else {
        errorElement.classList.remove('hidden');
        adminUnitOptionsDiv.classList.remove('show');
        adminOptionsDiv.classList.remove('show');
        userOptionsDiv.classList.remove('show');
        menuContainer.classList.remove('show');
        comingSoonContainer.classList.remove('show');
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
        // Nama file adalah unitKey itu sendiri (misal: 'tirtakusuma' -> tirtakusuma.html)
        window.location.href = `Kwitansi/${unitKey}.html`;
    } else {
        alert('Tidak dapat mengidentifikasi unit untuk Cetak Kwitansi. Silakan login kembali atau pilih unit (untuk Admin).');
    }
}
// ----------------------------------------------------------------------------------

    function showAdminUnitOptions() {
      adminUnitOptionsDiv.classList.add('show');
      adminOptionsDiv.classList.remove('show');
      userOptionsDiv.classList.remove('show');
      comingSoonContainer.classList.remove('show');
      localStorage.removeItem('selectedUnit');
      selectedUnit = null;
      updateLogo('admin');
    }

    function showAdminOptions(unit) {
      localStorage.setItem('selectedUnit', unit);
      selectedUnit = unit;
      adminUnitOptionsDiv.classList.remove('show');
      adminOptionsDiv.classList.add('show');
      userOptionsDiv.classList.remove('show');
      comingSoonContainer.classList.remove('show');
      updateLogo(unit);
    }

    function showUserOptions(unit) {
      // Fungsi ini sepertinya tidak dipanggil dari menu, tapi logikanya sudah benar
      localStorage.setItem('selectedUnit', unit);
      selectedUnit = unit;
      adminUnitOptionsDiv.classList.remove('show');
      adminOptionsDiv.classList.remove('show');
      userOptionsDiv.classList.add('show');
      comingSoonContainer.classList.remove('show');
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
      adminUnitOptionsDiv.classList.remove('show');
      adminOptionsDiv.classList.remove('show');
      userOptionsDiv.classList.remove('show');
      comingSoonContainer.classList.add('show');
      if (feature === 'standAwal') {
        comingSoonTextElement.textContent = 'Fitur Lihat Stand Awal - Coming Soon';
      } else if (feature === 'srBaru') {
        comingSoonTextElement.textContent = 'Fitur Penambahan SR Baru - Coming Soon';
      }
    }

    function hideComingSoon() {
      comingSoonContainer.classList.remove('show');
      if (loggedInUsername === 'admin') {
        if (selectedUnit) {
          adminUnitOptionsDiv.classList.remove('show');
          adminOptionsDiv.classList.add('show');
        } else {
          adminUnitOptionsDiv.classList.add('show');
          adminOptionsDiv.classList.remove('show');
        }
        userOptionsDiv.classList.remove('show');
        updateLogo(selectedUnit || 'admin');
      } else {
        adminUnitOptionsDiv.classList.remove('show');
        adminOptionsDiv.classList.remove('show');
        userOptionsDiv.classList.add('show');
        updateLogo(loggedInUsername);
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
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      updateLogo(null);
    }
