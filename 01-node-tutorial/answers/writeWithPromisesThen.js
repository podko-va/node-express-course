const { writeFile, readFile } = require("fs").promises;
const my_file = './temporary/temp.txt'


console.log("Starting PromisesWithThen.js");

writeFile(my_file, "Start\n", { flag: 'w' })
    .then(() => {
        console.log("Wrote line 1");
        return writeFile(my_file, "Next\n", { flag: 'a' });
    })
    .then(() => {
        console.log("Wrote line 2");
        return writeFile(my_file, "One more\n", { flag: 'a' });
    })
    .then(() => {
        console.log("Wrote line 3");
        return readFile(my_file, 'utf-8');
    })
    .then((data) => {
        console.log("Reading:");
        console.log(data);
    })
    .catch((error) => {
        console.log("An error occurred: ", error);
    });

console.log("End");