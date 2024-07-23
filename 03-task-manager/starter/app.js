
const express = require('express');
const app = express();
const task = require('./routers/tasks');
const connectBD = require('./db/connect')
require('dotenv').config()
//middleware
app.use(express.json())
//routes
app.get('/hello',(req,res) => {
    res.send('Task Manager App')
})  

app.use('/api/v1/tasks',task);

const host = '127.0.0.1';
const port = 3000;

const start = async() => {
    try {
        await connectBD(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}.....`));

    } catch (error) {
        console.log(error)
    }
}
start()

app.all('*', (req, res) => {
    res.status(404).type('text/plain');
    res.send('Page not found');
  });
  
//   app.listen(port, host, function () {
//     console.log(`Server listens http://${host}:${port}`);
//   });
  
  