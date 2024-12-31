document.getElementById('consultationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = 'Sending...';
    formStatus.style.color = 'blue';

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    try {
        const response = await fetch('/api/consultations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/thank-you.html';
        } else {
            formStatus.textContent = data.error || 'An error occurred';
            formStatus.style.color = 'red';
            console.error('Submission error:', data);
        }
    } catch (error) {
        formStatus.textContent = 'Failed to send message. Please try again.';
        formStatus.style.color = 'red';
        console.error('Request error:', error);
    }
});