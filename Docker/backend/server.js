import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World');
});

app.get('/api/data', (req, res) => {
    const data = {
        message: 'This is some sample data from the API.',
        timestamp: new Date(),
    };
    res.json(data);
});
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;