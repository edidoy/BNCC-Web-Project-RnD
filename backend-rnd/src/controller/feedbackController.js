import db from '../config/database.js';
import crypto from 'crypto'; 

const divisions = ['LnT', 'EEO', 'PR', 'HRD', 'RnD'];
const statuses = ['open', 'in-review', 'resolved'];

function validateFeedback(data, isUpdate = false) {
    const errors = [];
    
    if (!isUpdate || data.name) {
        if (!data.name || data.name.trim().length < 3) errors.push("Nama minimal 3 karakter.");
    }

    if (!isUpdate || data.rating) {
        const rating = parseInt(data.rating);
        if (isNaN(rating) || rating < 1 || rating > 5) errors.push("Rating harus angka 1-5.");
    }

    if (data.status && !statuses.includes(data.status)) {
        errors.push(`Status tidak valid. Pilihan: ${statuses.join(', ')}.`);
    }

    return errors;
}


export const createFeedback = async (req, res) => {
    const { name, email, eventName, division, rating, comment, suggestion } = req.body;
    const now = new Date();
    const createdAtISO = now.toISOString();
    const validationErrors = validateFeedback(req.body);
    if (validationErrors.length > 0) {
        return res.status(400).json({ message: "Data tidak lengkap/salah.", errors: validationErrors });
    }

    const id = crypto.randomBytes(16).toString('hex'); // Buat ID unik 
    const sql = `
        INSERT INTO feedback (id, name, email, eventName, division, rating, comment, suggestion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [id, name, email, eventName, division, parseInt(rating), comment || null, suggestion || null];

    try {
        await db.execute(sql, values);
        res.status(201).json({ 
            data: { 
                id: id, 
                name: name, 
                email: email, 
                eventName: eventName, 
                division: division, 
                rating: parseInt(rating), 
                comment: comment || "", 
                suggestion: suggestion || "", 
                createdAt: createdAtISO, 
                status: 'open' }
        });
    } catch (error) {
        console.error("Gagal buat feedback:", error);
        res.status(500).json({ message: "error di server saat menyimpan." });
    }
};

export const getFeedbackById = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM feedback WHERE id = ?';
    
    try {
        const [rows] = await db.execute(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: `Feedback dengan ID ${id} tidak ditemukan.` });
        }

        res.status(200).json({ 
            message: `Detail feedback ID ${id} berhasil diambil.`,
            data: rows[0] 
        });
    } catch (error) {
        console.error("Gagal mendapatkan feedback berdasarkan ID:", error);
        res.status(500).json({ message: "Terjadi kesalahan server saat mengambil data." });
    }
};


export const getAllFeedback = async (req, res) => {
    const { status, search } = req.query; 

    let sql = 'SELECT id, name, eventName, division, rating, status, createdAt FROM feedback';
    const values = [];
    const conditions = [];

    if (status && statuses.includes(status)) {
        conditions.push('status = ?');
        values.push(status);
    }
    if (search) {
        conditions.push('(name LIKE ? OR eventName LIKE ?)');
        values.push(`%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    
    sql += ' ORDER BY createdAt DESC';

    try {
        const [rows] = await db.execute(sql, values);
        res.status(200).json({ 
            count: rows.length, 
            data: rows 
        });
    } catch (error) {
        console.error("Gagal dapatkan feedback:", error);
        res.status(500).json({ message: "Oops, ada error di server saat ambil data." });
    }
};


export const updateFeedback = async (req, res) => {
    const { id } = req.params; 
    const updateFields = req.body; 

    const validationErrors = validateFeedback(updateFields, true);
    if (validationErrors.length > 0) {
        return res.status(400).json({ message: "Data update tidak valid.", errors: validationErrors });
    }

    const allowedFields = ['name', 'email', 'eventName', 'division', 'rating', 'comment', 'suggestion', 'status'];
    const fieldsToUpdate = {};
    for (const key of allowedFields) {
        if (updateFields[key] !== undefined) {
            fieldsToUpdate[key] = updateFields[key];
        }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({ message: "Tidak ada data yang valid untuk diubah." });
    }

    const setClauses = Object.keys(fieldsToUpdate).map(key => `${key} = ?`).join(', ');
    const values = Object.values(fieldsToUpdate);
    values.push(id); 

    const sql = `UPDATE feedback SET ${setClauses} WHERE id = ?`;

    try {
        const [result] = await db.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ID feedback tidak ditemukan atau tidak ada perubahan data." });
        }

        const [updatedRows] = await db.execute('SELECT * FROM feedback WHERE id = ?', [id]);

        res.status(200).json({ 
            message: "Feedback berhasil diperbarui", 
            data: updatedRows[0] 
        });
    } catch (error) {
        console.error("Gagal update feedback:", error);
        res.status(500).json({ message: "Oops, ada error di server saat update." });
    }
};


export const deleteFeedback = async (req, res) => {
    const { id } = req.params; 
    
    const sql = 'DELETE FROM feedback WHERE id = ?';

    try {
        const [result] = await db.execute(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ID feedback tidak ditemukan." });
        }

        res.status(200).json({ message: `Feedback ID ${id} berhasil dihapus.` });
    } catch (error) {
        console.error("Gagal hapus feedback:", error);
        res.status(500).json({ message: "Oops, ada error di server saat menghapus." });
    }
};