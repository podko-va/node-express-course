var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  const fileStream = fs.createReadStream('../content/big.txt', 'utf8');
  let startTime = Date.now(); 

  fileStream.on('data', (chunk) => {
    let elapsedTime = Date.now() - startTime;
    let logMessage = `[${elapsedTime} ms] Received ${chunk.length} bytes of data.\n`;   
    res.write(chunk);
    res.write(logMessage);    
    console.log(logMessage);
  });

  
  fileStream.on('error', (err) => {
      res.end(err)
    })      
}).listen(5000)

