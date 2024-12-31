document.getElementById('consultationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Form submitted'); // Debug log
    
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    console.log('Form data:', { name, email, message }); // Debug log

    if (!name || !email || !message) {
        formStatus.textContent = 'All fields are required.';
        formStatus.style.color = 'red';
        return;
    }

    try {
        console.log('Sending request...'); // Debug log
        const response = await fetch('/api/consultations', {  // Changed this line - removed hardcoded port
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        console.log('Response received:', response); // Debug log

        if (response.ok) {
            window.location.href = '/thank-you';
        } else {
            const error = await response.json();
            console.error('Error:', error); // Debug log
            formStatus.textContent = error.message || 'An error occurred.';
            formStatus.style.color = 'red';
        }
    } catch (err) {
        console.error('Request failed:', err); // Debug log
        formStatus.textContent = 'Failed to send your message. Try again later.';
        formStatus.style.color = 'red';
    }
});