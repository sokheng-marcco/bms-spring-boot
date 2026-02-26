// Authors Management

let allAuthors = [];

// Load data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadAuthors();
});

// Load authors from API
async function loadAuthors() {
    try {
        allAuthors = await fetchWithError(`${API_BASE_URL}/authors`);
        displayAuthors(allAuthors);
    } catch (error) {
        showAlert('Failed to load authors', 'error');
    }
}

// Display authors in table
function displayAuthors(authors) {
    const tbody = document.getElementById('authorsTable');
    tbody.innerHTML = '';

    if (authors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">No authors found. Click "Add New Author" to create one.</td></tr>';
        return;
    }

    authors.forEach(author => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${authors.indexOf(author) + 1}</td>
            <td>${author.name}</td>
            <td>${author.nationality}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="editAuthor(${author.authorId})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAuthor(${author.authorId})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Open author modal
function openAuthorModal() {
    clearForm('authorForm');
    document.getElementById('modalTitle').textContent = 'Add New Author';
    document.getElementById('authorModal').classList.add('show');
}

// Close author modal
function closeAuthorModal() {
    document.getElementById('authorModal').classList.remove('show');
}

// Edit author
async function editAuthor(authorId) {
    try {
        const author = await fetchWithError(`${API_BASE_URL}/authors/${authorId}`);

        document.getElementById('authorId').value = author.authorId;
        document.getElementById('authorName').value = author.name;
        document.getElementById('authorNationality').value = author.nationality;

        document.getElementById('modalTitle').textContent = 'Edit Author';
        document.getElementById('authorModal').classList.add('show');
    } catch (error) {
        showAlert('Failed to load author details', 'error');
    }
}

// Save author (create or update)
async function saveAuthor(event) {
    event.preventDefault();

    const authorId = document.getElementById('authorId').value;
    const author = {
        name: document.getElementById('authorName').value,
        nationality: document.getElementById('authorNationality').value
    };

    try {
        if (authorId) {
            // Update existing author
            await fetchWithError(`${API_BASE_URL}/authors/${authorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(author)
            });
            showAlert('Author updated successfully!', 'success');
        } else {
            // Create new author
            await fetchWithError(`${API_BASE_URL}/authors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(author)
            });
            showAlert('Author created successfully!', 'success');
        }

        closeAuthorModal();
        loadAuthors();
    } catch (error) {
        showAlert('Failed to save author', 'error');
    }
}

// Delete author
async function deleteAuthor(authorId) {
    if (!confirm('Are you sure you want to delete this author?')) {
        return;
    }

    try {
        await fetchWithError(`${API_BASE_URL}/authors/${authorId}`, {
            method: 'DELETE'
        });
        showAlert('Author deleted successfully!', 'success');
        loadAuthors();
    } catch (error) {
        showAlert('Failed to delete author', 'error');
    }
}
