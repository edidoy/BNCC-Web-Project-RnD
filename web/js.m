function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    
    toast.innerText = message;
    
    if (isError) {
        toast.classList.add("error");
    } else {
        toast.classList.remove("error");
    }

    toast.className = "show" + (isError ? " error" : "");

    
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        eventName: document.getElementById('eventName').value, 
        division: document.getElementById('division').value,
        rating: parseInt(document.querySelector('input[name="rating"]:checked').value),
        comment: document.getElementById('comment').value || "", 
        suggestion: document.getElementById('suggestion').value || ""
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
            
            showToast("✨ Feedback berhasil dikirim! Terima kasih.");
            
            
            setTimeout(() => {
                window.location.reload();
            }, 2000); 

        } else {
            showToast("❌ Gagal mengirim. Cek data kamu.", true);
            console.error(await response.json());
        }
    } catch (error) {
        showToast("⚠️ Server tidak merespon/mati.", true);
        console.error('Error:', error);
    }
});