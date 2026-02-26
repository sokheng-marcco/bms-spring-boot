// Publishers Management

let allPublishers = [];

// Load data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPublishers();
});

// Load publishers from API
async function loadPublishers() {
    try {
        allPublishers = await fetchWithError(`${API_BASE_URL}/publishers`);
        displayPublishers(allPublishers);
    } catch (error) {
        showAlert('Failed to load publishers', 'error');
    }
}

// Display publishers in table
function displayPublishers(publishers) {
    const tbody = document.getElementById('publishersTable');
    tbody.innerHTML = '';

    if (publishers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;">No publishers found. Click "Add New Publisher" to create one.</td></tr>';
        return;
    }

    publishers.forEach(publisher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${publishers.indexOf(publisher) + 1}</td>
            <td>${publisher.name}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="editPublisher(${publisher.publisherId})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deletePublisher(${publisher.publisherId})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Open publisher modal
function openPublisherModal() {
    clearForm('publisherForm');
    document.getElementById('modalTitle').textContent = 'Add New Publisher';
    document.getElementById('publisherModal').classList.add('show');
}

// Close publisher modal
function closePublisherModal() {
    document.getElementById('publisherModal').classList.remove('show');
}

// Edit publisher
async function editPublisher(publisherId) {
    try {
        const publisher = await fetchWithError(`${API_BASE_URL}/publishers/${publisherId}`);

        document.getElementById('publisherId').value = publisher.publisherId;
        document.getElementById('publisherName').value = publisher.name;

        document.getElementById('modalTitle').textContent = 'Edit Publisher';
        document.getElementById('publisherModal').classList.add('show');
    } catch (error) {
        showAlert('Failed to load publisher details', 'error');
    }
}

// Save publisher (create or update)
async function savePublisher(event) {
    event.preventDefault();

    const publisherId = document.getElementById('publisherId').value;
    const publisher = {
        name: document.getElementById('publisherName').value
    };

    try {
        if (publisherId) {
            // Update existing publisher
            await fetchWithError(`${API_BASE_URL}/publishers/${publisherId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(publisher)
            });
            showAlert('Publisher updated successfully!', 'success');
        } else {
            // Create new publisher
            await fetchWithError(`${API_BASE_URL}/publishers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(publisher)
            });
            showAlert('Publisher created successfully!', 'success');
        }

        closePublisherModal();
        loadPublishers();
    } catch (error) {
        showAlert('Failed to save publisher', 'error');
    }
}

// Delete publisher
async function deletePublisher(publisherId) {
    if (!confirm('Are you sure you want to delete this publisher?')) {
        return;
    }

    try {
        await fetchWithError(`${API_BASE_URL}/publishers/${publisherId}`, {
            method: 'DELETE'
        });
        showAlert('Publisher deleted successfully!', 'success');
        loadPublishers();
    } catch (error) {
        showAlert('Failed to delete publisher', 'error');
    }
}
