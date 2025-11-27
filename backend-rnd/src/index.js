import express from 'express';
import 'dotenv/config'; 
import feedbackRoutes from './routes/feedback.js';
import db from './config/database.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
    res.send('Feedback API berjalan lancar.');
});

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`);
    console.log('Pastikan XAMPP dan database sudah siap!');
});