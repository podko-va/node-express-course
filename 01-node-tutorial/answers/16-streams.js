const { createReadStream } = require('fs')

const stream = createReadStream('./content/big.txt',{
    encoding: 'utf8',
    highWaterMark: 200, // Adjust this value to test different chunk sizes
  });

stream.on('data', (result) => {
  console.log(result)
})

stream.on('error', (err) => {
    console.error('An error occurred:', err);
  });

