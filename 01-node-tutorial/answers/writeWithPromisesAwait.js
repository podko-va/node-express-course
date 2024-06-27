const { writeFile, readFile } = require("fs").promises;
const my_file = './temporary/temp.txt'


const myFunc = async () => {   
    try { 
        await writeFile(my_file, "Hello!\n",{flag: 'w'});
        await writeFile(my_file, "Hi!\n",{flag: 'a'});
        await writeFile(my_file, "Ola!\n",{flag: 'a'});
    } catch (err) {
        console.log("An error occurred in myFunc: ", err);
    }
}

const writer = async () => {
    try {
       await myFunc()       
    } catch(err) {
        console.log("An error occurred while writing: ", err)
    }
}

const reader = async () => {
    try {
       console.log(await readFile(my_file,'utf-8'));
    } catch(err) {
        console.log("An error occurred whole reading: ", err)
    }
}

const readWrite = async () => {
    await writer();
    await reader();
};

readWrite();