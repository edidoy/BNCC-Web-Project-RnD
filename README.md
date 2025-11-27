# 🚀 BNCC Event Feedback System (Frontend)

Website ini adalah aplikasi berbasis web untuk mengumpulkan dan mengelola feedback dari peserta acara BNCC. Proyek ini dibuat sebagai bagian dari seleksi aktivis BNCC (Backend & Frontend Collaboration).

Aplikasi ini memiliki dua antarmuka utama:
1.  **User Page:** Formulir untuk peserta memberikan rating dan masukan.
2.  **Admin Dashboard:** Panel admin untuk melihat, mengubah status, dan menghapus data feedback.

---

## ✨ Fitur Utama

### 👤 Halaman User (Feedback Form)
* **Modern UI:** Desain bersih menggunakan gaya *Modern Card* dan font *Poppins*.
* **Interactive Rating:** Input rating menggunakan tombol radio button kustom (bukan input angka biasa).
* **Toast Notification:** Notifikasi real-time (popup pojok kanan atas) saat data berhasil atau gagal dikirim.
* **Form Validation:** Validasi input HTML5 untuk memastikan data tidak kosong sebelum dikirim.
* **Responsive Design:** Tampilan tetap rapi di layar Desktop maupun Mobile.

### 🛡️ Halaman Admin (Dashboard)
* **Data Table:** Menampilkan seluruh feedback dalam tabel yang rapi.
* **Status Badges:** Penanda warna-warni untuk status (*Open, In Review, Resolved*).
* **CRUD Operations:**
    * **Read:** Mengambil data real-time dari API.
    * **Update:** Mengubah Status dan Rating melalui **Modal Pop-up**.
    * **Delete:** Menghapus data feedback dengan konfirmasi.

---

## 🛠️ Teknologi yang Digunakan

* **HTML5** - Struktur semantik halaman.
* **CSS3** - Styling responsif, Flexbox, CSS Variables, dan animasi.
* **JavaScript (Vanilla ES6+)** - Logika frontend, DOM Manipulation.
* **Fetch API** - Integrasi HTTP Request (GET, POST, PUT, DELETE) ke Backend.
* **Live Server** - Digunakan untuk development environment.

---

## 📂 Struktur Folder

```text
/ (Root Directory)
│
├── index.html        # Halaman Utama (Formulir User)
├── admin.html        # Halaman Dashboard Admin
├── style.css         # Styling global untuk User & Admin
├── README.md         # Dokumentasi Proyek
│
└── js/               # Folder Script JavaScript
    ├── form.js       # Logika untuk pengiriman data feedback
    └── admin.js      # Logika CRUD untuk dashboard admin
