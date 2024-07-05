const {firstname,secondname,residence} = require('./04-names.js');

console.log(`First name: ${firstname}`);
console.log(`Second name: ${secondname}`);
console.log(`live in: ${residence}`);

const your_class = require('./05-utils.js');
const altFlavor = require('./06-alternative-flavor');

const write_your_class = your_class('Horse');
console.log(write_your_class);

console.log(altFlavor.firstname);
console.log(altFlavor.surname);
console.log(altFlavor.fullname());

require('./07-mind-grenade');
require('./08-os-module');