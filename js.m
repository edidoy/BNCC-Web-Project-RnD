document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        eventName: document.getElementById('eventName').value,
        division: document.getElementById('division').value,
        rating: parseInt(document.getElementById('rating').value),
        comment: document.getElementById('comment').value,
        suggestion: document.getElementById('suggestion').value,
        status: "open", 
        createdAt: new Date().toISOString()
    };

    try {
        const response = await fetch('http://localhost:3000/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Feedback berhasil dikirim!');
            e.target.reset();
        } else {
            alert('Gagal mengirim feedback.');
        }
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan koneksi.');
    }
});