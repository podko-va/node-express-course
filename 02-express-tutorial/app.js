const express = require('express');
const cookieParser = require('cookie-parser'); 
const app = express();

const host = '127.0.0.1';
const port = 3000;

const { products } = require("./data");
const peopleRouter = require("./routes/people");

const logger = (req, res, next) => {
  console.log('${req.method} ${req.url} - ${new Date().toISOString()}');
  next();
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/people', peopleRouter);

app.get('/', logger, (req, res) => {
  res.status(200).type('text/plain');
  res.send('Home page');
});

app.get('/api/v1/test', (req, res) => {
  res.status(200).type('application/json');
  res.json({ message: "It worked!" });
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
    res.status(404).json({ message: "That product was not found." });
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

  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }

  res.json(filteredProducts);
});

app.use(express.static("./public"));

const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};
//curl -X POST http://127.0.0.1:3000/logon -H "Content-Type: application/json" -d '{"name":"Katy"}'
app.post('/logon', (req, res) => {
  const { name } = req.body;
  if (name) {
    res.cookie('name', name);
    res.status(201).json({ message: `Hello, ${name}` });
  } else {
    res.status(400).json({ message: "Please provide a name" });
  }
});
//curl -X DELETE http://127.0.0.1:3000/logoff --cookie cookies.txt
//curl -X DELETE http://127.0.0.1:3000/logoff

app.delete('/logoff', (req, res) => {
  res.clearCookie('name');
  res.status(200).json({ message: "User logged off" });
});

//curl -X POST http://127.0.0.1:3000/logon -H "Content-Type: application/json" -d '{"name":"John"}' --cookie-jar cookies.txt
//curl -X GET http://127.0.0.1:3000/test --cookie cookies.txt
app.get('/test', auth, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user}` });
});

app.all('*', (req, res) => {
  res.status(404).type('text/plain');
  res.send('Page not found');
});

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});

