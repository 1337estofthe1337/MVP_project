document.getElementById('createUserForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const websiteTitle = document.getElementById('websiteTitle').value;

    fetch('/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, website_title: websiteTitle }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error creating user');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = `/api/v1/users/${data.username}`;
    })
    .catch(error => {
        console.error('Error creating user:', error);
        alert('An error occured while creating the user. Please try again.');
    });
});
