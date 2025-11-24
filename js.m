// js/form.js
document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ambil data dari form
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        eventName: document.getElementById('eventName').value,
        division: document.getElementById('division').value,
        rating: parseInt(document.getElementById('rating').value),
        comment: document.getElementById('comment').value,
        suggestion: document.getElementById('suggestion').value,
        
        // Field tambahan sesuai request dokumen 
        status: "open", 
        createdAt: new Date().toISOString() // Format waktu ISO
    };

    console.log("Mengirim data:", formData);

    // Kodingan fetch ke Backend nanti ditaruh di sini
    // const response = await fetch('http://localhost:3000/api/feedback', { ... })
});