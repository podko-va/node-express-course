const os = require("os");

console.log(os.type());
console.log(os.platform());
const sec = os.uptime();
console.log(`My computer runs smoothly ${ Math.floor(sec / 3600)} hours, ${Math.floor((sec % 3600) / 60)} minutes, and ${Math.floor(sec % 60)} seconds`)  