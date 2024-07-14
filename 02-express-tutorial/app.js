const express = require('express'); // Import the Express module
const app = express();

const host = '127.0.0.1';
const port = 3000;

const { products } = require("./data");

app.get('/api/v1/test', (req, res) => {
    res.status(200).type('application/json');
    res.json({ message: "It worked!" });
    res.send('Home page');
});

app.get('/html', (req, res) => {
    res.status(200).type('text/html');
    res.send('<html><body><h1>Hello, this is an HTML response</h1></body></html>');
});

app.get('/api/v1/products', (req, res) => {
    res.status(200).type('application/json');
    res.send(products);
});

app.get('/api/v1/products/:productID', (req, res) => {
    const productID = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === productID);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "That product was not found."});
    }
});

app.get('/api/v1/query', (req, res) => {
    const { search, limit, maxPrice, minPrice } = req.query;
    let filteredProducts = [...products];

    if (search) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().startsWith(search.toLowerCase())
        );
    }
//http://localhost:3000/api/v1/query?maxPrice=20
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price < parseFloat(maxPrice)
        );
    }

    if (minPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price >= parseFloat(minPrice)
        );
    }
//http://localhost:3000/api/v1/query?search=a&limit=2&maxPrice=20
    if (limit) {
        filteredProducts = filteredProducts.slice(0, Number(limit));
    }

    res.json(filteredProducts);
});
/*
app.post('/api/admin', (req, res) => {
    res.status(200).type('text/plain');
    res.send('Create admin request');
});

app.post('/api/user', (req, res) => {
    res.status(200).type('text/plain');
    res.send('Create user request');
});

*/

app.use(express.static("./public")) 

// 404 handler for all other routes
app.all('*', (req, res) => {
    res.status(404).type('text/plain');
    res.send('Page not found');
});

app.use((req, res, next) => {
    res.status(404).type('text/plain');
    res.send('Not found');
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});
