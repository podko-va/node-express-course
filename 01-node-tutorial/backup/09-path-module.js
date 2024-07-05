const module_path = require("path");

const parts = ['Users', 'JohnSmith', 'node-express-course', '01-node-tutorial', 'answers'];

const fullPath = module_path.join(...parts);

console.log(`The full path is: ${fullPath}`);