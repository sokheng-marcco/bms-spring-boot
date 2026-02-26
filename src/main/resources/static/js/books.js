// Books Management

let allBooks = [];
let allCategories = [];
let allAuthors = [];
let allPublishers = [];

// Load data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    loadCategories();
    loadAuthors();
    loadPublishers();
});

// Load books from API
async function loadBooks() {
    try {
        allBooks = await fetchWithError(`${API_BASE_URL}/books`);
        displayBooks(allBooks);
    } catch (error) {
        showAlert('Failed to load books', 'error');
    }
}

// Load categories for dropdown
async function loadCategories() {
    try {
        allCategories = await fetchWithError(`${API_BASE_URL}/categories`);
        populateCategorySelect();
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
}

// Load authors for dropdown
async function loadAuthors() {
    try {
        allAuthors = await fetchWithError(`${API_BASE_URL}/authors`);
        populateAuthorsSelect();
    } catch (error) {
        console.error('Failed to load authors:', error);
    }
}

// Load publishers for dropdown
async function loadPublishers() {
    try {
        allPublishers = await fetchWithError(`${API_BASE_URL}/publishers`);
        populatePublisherSelect();
    } catch (error) {
        console.error('Failed to load publishers:', error);
    }
}

// Display books in table
function displayBooks(books) {
    const tbody = document.getElementById('booksTable');
    tbody.innerHTML = '';

    if (books.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">No books found. Click "Add New Book" to create one.</td></tr>';
        return;
    }

    books.forEach(book => {
        const row = document.createElement('tr');
        const authorsStr = book.authors ? book.authors.map(a => a.name).join(', ') : 'N/A';
        const categoryName = book.category ? book.category.categoryName : 'N/A';
        const publisherName = book.publisher ? book.publisher.name : 'N/A';

        row.innerHTML = `
            <td>${books.indexOf(book) + 1}</td>
            <td>${book.title}</td>
            <td>${book.publicationYear}</td>
            <td>${categoryName}</td>
            <td>${publisherName}</td>
            <td>${authorsStr}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="editBook(${book.bookId})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.bookId})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Populate category dropdown
function populateCategorySelect() {
    const select = document.getElementById('categorySelect');
    if (!select) return;

    select.innerHTML = '<option value="">Select a category</option>';
    allCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.categoryId;
        option.textContent = category.categoryName;
        select.appendChild(option);
    });
}

// Populate authors dropdown
function populateAuthorsSelect() {
    const select = document.getElementById('authorsSelect');
    if (!select) return;

    select.innerHTML = '<option value="">Select authors</option>';
    allAuthors.forEach(author => {
        const option = document.createElement('option');
        option.value = author.authorId;
        option.textContent = author.name;
        select.appendChild(option);
    });
}

// Populate publisher dropdown
function populatePublisherSelect() {
    const select = document.getElementById('publisherSelect');
    if (!select) return;

    select.innerHTML = '<option value="">Select a publisher</option>';
    allPublishers.forEach(publisher => {
        const option = document.createElement('option');
        option.value = publisher.publisherId;
        option.textContent = publisher.name;
        select.appendChild(option);
    });
}

// Open book modal
function openBookModal() {
    clearForm('bookForm');
    document.getElementById('modalTitle').textContent = 'Add New Book';
    document.getElementById('bookModal').classList.add('show');
}

// Close book modal
function closeBookModal() {
    document.getElementById('bookModal').classList.remove('show');
}

// Edit book
async function editBook(bookId) {
    try {
        const book = await fetchWithError(`${API_BASE_URL}/books/${bookId}`);

        document.getElementById('bookId').value = book.bookId;
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('publicationYear').value = book.publicationYear;
        document.getElementById('categorySelect').value = book.category ? book.category.categoryId : '';
        document.getElementById('publisherSelect').value = book.publisher ? book.publisher.publisherId : '';

        // Set selected authors
        const authorsSelect = document.getElementById('authorsSelect');
        Array.from(authorsSelect.options).forEach(option => {
            option.selected = book.authors && book.authors.some(a => a.authorId == option.value);
        });

        document.getElementById('modalTitle').textContent = 'Edit Book';
        document.getElementById('bookModal').classList.add('show');
    } catch (error) {
        showAlert('Failed to load book details', 'error');
    }
}

// Save book (create or update)
async function saveBook(event) {
    event.preventDefault();

    const bookId = document.getElementById('bookId').value;
    const authorsSelect = document.getElementById('authorsSelect');
    const selectedAuthors = Array.from(authorsSelect.selectedOptions).map(option => ({
        authorId: parseInt(option.value)
    }));

    const book = {
        title: document.getElementById('bookTitle').value,
        publicationYear: parseInt(document.getElementById('publicationYear').value),
        category: {
            categoryId: parseInt(document.getElementById('categorySelect').value)
        },
        publisher: {
            publisherId: parseInt(document.getElementById('publisherSelect').value)
        },
        authors: selectedAuthors
    };

    try {
        if (bookId) {
            // Update existing book
            await fetchWithError(`${API_BASE_URL}/books/${bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            });
            showAlert('Book updated successfully!', 'success');
        } else {
            // Create new book
            await fetchWithError(`${API_BASE_URL}/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            });
            showAlert('Book created successfully!', 'success');
        }

        closeBookModal();
        loadBooks();
    } catch (error) {
        showAlert('Failed to save book', 'error');
    }
}

// Delete book
async function deleteBook(bookId) {
    if (!confirm('Are you sure you want to delete this book?')) {
        return;
    }

    try {
        await fetchWithError(`${API_BASE_URL}/books/${bookId}`, {
            method: 'DELETE'
        });
        showAlert('Book deleted successfully!', 'success');
        loadBooks();
    } catch (error) {
        showAlert('Failed to delete book', 'error');
    }
}
