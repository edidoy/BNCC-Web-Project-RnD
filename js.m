
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

    console.log("Mengirim data:", formData);


});