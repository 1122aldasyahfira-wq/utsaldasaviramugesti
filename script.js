window.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const welcomeHeading = document.getElementById("welcomeHeading");
    const allCards = document.querySelectorAll(".dashboard-card");

    const dashboardContainer = document.getElementById("dashboardContainer");
    const logoutScreen = document.getElementById("logoutScreen");
    const loginAgainBtn = document.getElementById("loginAgainBtn");
    const logoutUserName = document.getElementById("logoutUserName");

    // Elemen Settings
    const settingsModal = document.getElementById("settingsModal");
    const closeSettingsBtn = document.getElementById("closeSettingsBtn");
    const cancelSettingsBtn = document.getElementById("cancelSettingsBtn");
    const settingsForm = document.getElementById("settingsForm");
    const inputNama = document.getElementById("inputNama");
    const inputKelas = document.getElementById("inputKelas");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Data profil mahasiswa aktif (bisa diubah dari menu Settings)
    let studentName = "ALDA SAVIRA MUGESTI";
    let studentClass = "SI 3-E";

    const cardStatistik = document.getElementById("card-statistik");
    const cardKelas = document.getElementById("card-kelas");
    const cardAktifitas = document.getElementById("card-aktifitas");
    const cardDokumen = document.getElementById("card-dokumen");

    // 1. Aksi klik menu sidebar
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            const menuName = this.getAttribute("data-menu");

            // Menu Settings: buka popup pengaturan
            if (menuName === "Settings") {
                inputNama.value = studentName;
                inputKelas.value = studentClass;
                settingsModal.style.display = "flex";
                return;
            }

            // Menu Sign Out: konfirmasi keluar dashboard
            if (menuName === "Sign Out") {
                const yakinKeluar = confirm("Apakah Anda yakin ingin keluar dari Royal Dashboard?");
                if (yakinKeluar) {
                    logoutUserName.textContent = studentName;
                    dashboardContainer.style.display = "none";
                    logoutScreen.style.display = "flex";
                }
                return;
            }

            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            allCards.forEach(card => card.classList.remove("highlight-card"));

            if (menuName === "Home") {
                welcomeHeading.innerHTML = "Selamat Datang, Nama Mahasiswa<br>Kelas SI";
            } 
            else if (menuName === "Mahasiswa") {
                welcomeHeading.innerHTML = `Selamat Datang, ${studentName}<br>Kelas ${studentClass}`;
            } 
            else if (menuName === "Kelas") {
                if (cardKelas) cardKelas.classList.add("highlight-card");
            } 
            else if (menuName === "Aktifitas") {
                if (cardAktifitas) cardAktifitas.classList.add("highlight-card");
            } 
            else if (menuName === "Statistik") {
                if (cardStatistik) cardStatistik.classList.add("highlight-card");
            } 
            else if (menuName === "Dokumen") {
                if (cardDokumen) cardDokumen.classList.add("highlight-card");
            }
        });
    });

    // Tutup modal Settings
    function closeSettings() {
        settingsModal.style.display = "none";
    }

    if (closeSettingsBtn) closeSettingsBtn.addEventListener("click", closeSettings);
    if (cancelSettingsBtn) cancelSettingsBtn.addEventListener("click", closeSettings);

    // Simpan perubahan dari form Settings
    if (settingsForm) {
        settingsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newName = inputNama.value.trim();
            const newClass = inputKelas.value.trim();

            if (newName) studentName = newName;
            if (newClass) studentClass = newClass;

            // Terapkan mode gelap jika dicentang
            if (darkModeToggle.checked) {
                document.body.classList.add("dark-mode");
            } else {
                document.body.classList.remove("dark-mode");
            }

            // Langsung perbarui teks sambutan & pindahkan status aktif ke Mahasiswa
            welcomeHeading.innerHTML = `Selamat Datang, ${studentName}<br>Kelas ${studentClass}`;
            navLinks.forEach(item => {
                item.classList.remove("active");
                if (item.getAttribute("data-menu") === "Mahasiswa") {
                    item.classList.add("active");
                }
            });

            closeSettings();
        });
    }

    // Tombol Masuk Kembali dari halaman Sign Out
    if (loginAgainBtn) {
        loginAgainBtn.addEventListener("click", () => {
            logoutScreen.style.display = "none";
            dashboardContainer.style.display = "grid";

            navLinks.forEach(item => item.classList.remove("active"));
            navLinks[0].classList.add("active");
            allCards.forEach(card => card.classList.remove("highlight-card"));
            welcomeHeading.innerHTML = "Selamat Datang, Nama Mahasiswa<br>Kelas SI";
        });
    }

    // 2. Fitur Pencarian Header
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            const keyword = searchInput.value.toLowerCase().trim();

            allCards.forEach(card => card.classList.remove("highlight-card"));

            if (keyword === "") return;

            if (keyword.includes("kelas") || keyword.includes("matakuliah")) {
                if (cardKelas) cardKelas.classList.add("highlight-card");
            } 
            else if (keyword.includes("aktifitas") || keyword.includes("perkuliahan")) {
                if (cardAktifitas) cardAktifitas.classList.add("highlight-card");
            } 
            else if (keyword.includes("statistik")) {
                if (cardStatistik) cardStatistik.classList.add("highlight-card");
            } 
            else if (keyword.includes("dokumen") || keyword.includes("lampiran")) {
                if (cardDokumen) cardDokumen.classList.add("highlight-card");
            }
        });
    }

    // 3. Interaksi Lihat Dokumen
    const docLinks = document.querySelectorAll(".doc-link");
    docLinks.forEach(doc => {
        doc.addEventListener("click", (e) => {
            e.preventDefault();
            const docTitle = doc.getAttribute("data-doc");
            alert("Membuka pratinjau file: " + docTitle);
        });
    });
});