import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World shiovam how are you?');
});

app.get('/api/data', (req, res) => {
    const data = {
        message: 'This is some sample data from the API.',
        timestamp: new Date(),
    };
    res.json(data);
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ];
    res.json(users);
});
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Laptop', price: 999.99 },   
    ];
    res.json(products);
});

export default app;