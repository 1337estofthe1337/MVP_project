document.addEventListener('DOMContentLoaded', () => {
    const addBookmarkForm = document.getElementById('addBookmark');
    const bookmarkList = document.getElementById('bookmarkList');

    addBookmarkForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const gameTitleInput = document.getElementById('gameTitle');
        const urlInput = document.getElementById('url');
        const descriptionInput = document.getElementById('description');
        const categorySelect = document.getElementById('category');

        const gameTitle = gameTitleInput.value;
        const url = urlInput.value;
        const description = descriptionInput.value;
        const category = categorySelect.value;

        const success = await addBookmarkToServer(gameTitle, url, description, category);

        if (success) {
            const newBookmarkItem = createBookmarkItem(gameTitle, url, description, category);
            bookmarkList.appendChild(newBookmarkItem);

            gameTitleInput.value = '';
            urlInput.value = '';
            descriptionInput.value = '';
            categorySelect.value = 'location/maps';
        } else {
            alert('Failed to add bookmark. Please try again.');
        }
    });

    const bookmarks = await getBookmarksFromServer();

    bookmarks.forEach(bookmark => {
        const bookmarkItem = createBookmarkItem(bookmark.gameTitle, bookmark.url, bookmark.description, bookmark.category);
        bookmarkList.appendChild(bookmarkItem);
    });

    function createBookmarkItem(gameTitle, url, description, category) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${gameTitle}</strong><br>
            URL: <a href="${url}" target="_blank">${url}</a><br>
            Description: ${description}<br>
            Category: ${category}<br>
            <button class="delete-button">Delete</button>
        `;

        const deleteButton = listItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', async () => {
            const success = await deleteBookmarkFromServer(gameTitle);
            if (success) {
                listItem.remove();
            } else {
                alert('Failed to delete bookmark. Please try again.');
            }
        });

        return listItem;
    }

    async function addBookmarkToServer(gameTitle, url, description, category) {
        try {
            // Placeholder for sending data to the server (POST request)
            const response = await fetch(`/api/${username}/${gameTitle}/infoid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url,
                    description,
                    map: '', // Add map data if applicable
                    category,
                }),
            });

            const data = await response.json();
            return response.ok && data.success;
        } catch (error) {
            console.error('Error adding bookmark to the server:', error);
            return false;
        }
    }

    async function getBookmarksFromServer() {
        try {
            // Placeholder for retrieving bookmarks from the server (GET request)
            const response = await fetch(`/api/${username}`);
            const data = await response.json();
            return response.ok ? data.bookmarks : [];
        } catch (error) {
            console.error('Error retrieving bookmarks from the server:', error);
            return [];
        }
    }

    async function deleteBookmarkFromServer(gameTitle) {
        try {
            // Placeholder for sending data to the server (DELETE request)
            const response = await fetch(`/api/${username}/${gameTitle}/infoid`, {
                method: 'DELETE',
            });

            const data = await response.json();
            return response.ok && data.success;
        } catch (error) {
            console.error('Error deleting bookmark from the server:', error);
            return false;
        }
    }
});
