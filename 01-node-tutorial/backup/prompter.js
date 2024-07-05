const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

/////////
let randomNumber = Math.floor(Math.random() * 100) + 1;
let message = "Guess a number between 1 and 100.";
let attempts = 0;
/////////

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter something below.";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${message}</p>
  <form method="POST">
  <input name="guess" type="number" min="1" max="100"></input>
  <button type="submit">Submit</button>
  </form>
  <p>Attempts: ${attempts}</p>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      if (body["guess"]) {
        let guess = parseInt(body["guess"], 10);
        attempts++;
        if (guess < randomNumber) {
          message = "Low! Try again.";
        } else if (guess > randomNumber) {
          message = "High! Try again.";
        } else {
          message = `<span style="color: green; font-weight:bold;">Correct! The number was ${randomNumber}. You guessed it in ${attempts} attempts.</span>`;
          // Reset the game
          randomNumber = Math.floor(Math.random() * 100) + 1;
          attempts = 0;
        }
      } else {
        message = "Please enter a number between 1 and 100.";
      }
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");

setTimeout(() => {
  server.close(() => {
    console.log('Server stopped');
  });
}, 10000);