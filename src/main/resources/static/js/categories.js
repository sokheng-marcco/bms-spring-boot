// Categories Management

let allCategories = [];

// Load data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
});

// Load categories from API
async function loadCategories() {
    try {
        allCategories = await fetchWithError(`${API_BASE_URL}/categories`);
        displayCategories(allCategories);
    } catch (error) {
        showAlert('Failed to load categories', 'error');
    }
}

// Display categories in table
function displayCategories(categories) {
    const tbody = document.getElementById('categoriesTable');
    tbody.innerHTML = '';

    if (categories.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">No categories found. Click "Add New Category" to create one.</td></tr>';
        return;
    }

    categories.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${categories.indexOf(category) + 1}</td>
            <td>${category.categoryName}</td>
            <td>${category.description || 'N/A'}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="editCategory(${category.categoryId})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory(${category.categoryId})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Open category modal
function openCategoryModal() {
    clearForm('categoryForm');
    document.getElementById('modalTitle').textContent = 'Add New Category';
    document.getElementById('categoryModal').classList.add('show');
}

// Close category modal
function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('show');
}

// Edit category
async function editCategory(categoryId) {
    try {
        const category = await fetchWithError(`${API_BASE_URL}/categories/${categoryId}`);

        document.getElementById('categoryId').value = category.categoryId;
        document.getElementById('categoryName').value = category.categoryName;
        document.getElementById('categoryDescription').value = category.description || '';

        document.getElementById('modalTitle').textContent = 'Edit Category';
        document.getElementById('categoryModal').classList.add('show');
    } catch (error) {
        showAlert('Failed to load category details', 'error');
    }
}

// Save category (create or update)
async function saveCategory(event) {
    event.preventDefault();

    const categoryId = document.getElementById('categoryId').value;
    const category = {
        categoryName: document.getElementById('categoryName').value,
        description: document.getElementById('categoryDescription').value
    };

    try {
        if (categoryId) {
            // Update existing category
            await fetchWithError(`${API_BASE_URL}/categories/${categoryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category)
            });
            showAlert('Category updated successfully!', 'success');
        } else {
            // Create new category
            await fetchWithError(`${API_BASE_URL}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category)
            });
            showAlert('Category created successfully!', 'success');
        }

        closeCategoryModal();
        loadCategories();
    } catch (error) {
        showAlert('Failed to save category', 'error');
    }
}

// Delete category
async function deleteCategory(categoryId) {
    if (!confirm('Are you sure you want to delete this category?')) {
        return;
    }

    try {
        await fetchWithError(`${API_BASE_URL}/categories/${categoryId}`, {
            method: 'DELETE'
        });
        showAlert('Category deleted successfully!', 'success');
        loadCategories();
    } catch (error) {
        showAlert('Failed to delete category', 'error');
    }
}
