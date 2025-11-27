const API_URL = 'http://localhost:3000/api/feedback'; 

async function fetchData() {
    const tableBody = document.getElementById('feedbackTableBody');
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Memuat data...</td></tr>';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        tableBody.innerHTML = '';

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Belum ada data feedback.</td></tr>';
            return;
        }

        data.forEach(item => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${item.name} <br> <small style="color:#888;">${item.email}</small></td>
                <td>${item.eventName}</td>
                <td>${item.division}</td>
                <td>⭐ ${item.rating}</td>
                <td><span class="badge badge-${item.status}">${item.status}</span></td>
                <td>
                    <button class="btn-action btn-edit" onclick="openEditModal('${item.id}', '${item.eventName}', '${item.division}', '${item.status}')">Edit</button>
                    <button class="btn-action btn-delete" onclick="deleteFeedback('${item.id}')">Hapus</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error:', error);
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Gagal mengambil data dari server. Pastikan backend nyala!</td></tr>';
    }
}

async function deleteFeedback(id) {
    if (confirm('Yakin ingin menghapus data ini?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            alert('Data berhasil dihapus');
            fetchData(); 
        } catch (error) {
            alert('Gagal menghapus data');
        }
    }
}

function openEditModal(id, eventName, division, status) {
    document.getElementById('editId').value = id;
    document.getElementById('editEventName').value = eventName;
    document.getElementById('editDivision').value = division;
    document.getElementById('editStatus').value = status;
    
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const updatedData = {
        eventName: document.getElementById('editEventName').value,
        division: document.getElementById('editDivision').value,
        status: document.getElementById('editStatus').value
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert('Data berhasil diupdate!');
            closeModal();
            fetchData(); 
        } else {
            alert('Gagal update data.');
        }
    } catch (error) {
        alert('Terjadi kesalahan koneksi.');
    }
});

document.addEventListener('DOMContentLoaded', fetchData);