// Pastikan DOM sudah siap sebelum script jalan
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Variabel Selektor
    const ctaBtn = document.getElementById('cta-btn');
    const dataContainer = document.getElementById('data-container');

    // 2. Event Listeners
    ctaBtn.addEventListener('click', () => {
        alert('Tombol diklik! Fungsi backend bisa dipanggil di sini.');
    });

    // 3. Fungsi Fetch Data (Simulasi koneksi ke Backend)
    // Nanti URL diganti dengan API endpoint temanmu
    async function fetchData() {
        try {
            // Contoh: const response = await fetch('http://localhost:3000/api/data');
            // const data = await response.json();
            
            // Simulasi data dummy
            const data = [
                { title: "Artikel 1", desc: "Deskripsi dari backend" },
                { title: "Artikel 2", desc: "Deskripsi dari backend" }
            ];

            renderData(data);
        } catch (error) {
            console.error('Gagal mengambil data:', error);
            dataContainer.innerHTML = "<p>Gagal memuat data.</p>";
        }
    }

    // 4. Fungsi Render ke HTML
    function renderData(items) {
        dataContainer.innerHTML = ''; // Bersihkan loading text
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            `;
            dataContainer.appendChild(card);
        });
    }

    // Panggil fungsi saat halaman dimuat
    fetchData();
});