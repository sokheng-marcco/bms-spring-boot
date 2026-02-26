// Common utility functions and configurations

const API_BASE_URL = '/api';

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const alertContainer = document.querySelector('main');
    alertContainer.insertBefore(alertDiv, alertContainer.firstChild);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
};

// Search/Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterTable);
    }
});

function filterTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const table = document.querySelector('table tbody');
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchInput) ? '' : 'none';
    });
}

// Fetch with error handling
async function fetchWithError(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        showAlert('Server error. Please try again.', 'error');
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }

    return null;
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Clear form fields
function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        form.querySelector('[type="hidden"]').value = '';
    }
}


