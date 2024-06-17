const path = require("path");
const fs = require("fs");

const my_dir = "./temporary";
const my_file = path.join(my_dir,"fileA.txt");

if (!fs.existsSync(my_file)){
    fs.writeFileSync(my_file, "Hello!\n",{flag: 'w'});
    fs.writeFileSync(my_file, "Hi!\n",{flag: 'a'});
    fs.writeFileSync(my_file, "Ola!\n",{flag: 'a'});
}

console.log(fs.readFileSync(my_file,'utf-8'))