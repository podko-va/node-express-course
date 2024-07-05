const fs = require("fs");
const my_path = './temporary/fileB.txt'

console.log("at start");

fs.writeFile(my_path, "This is line 1\n", (err) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened while line 1 printed: ", err);
  } else {
    fs.writeFile(my_path, "This is line 2\n", { flag: 'a' }, (err) => {
        console.log("at point 2");
        if (err) {
          console.log("This error happened while line 2 printed: ", err);
        } else {
          // Запись третьей строки
          fs.writeFile(my_path, "This is line 3\n", { flag: 'a' }, (err) => {
            console.log("at point 3");
            if (err) {
              console.log("This error happened while line 3 printed: ", err);
            } else {
              console.log("All lines in a file!");
            }
          });
        }
      });
    }
  });
  
  
console.log("at end");


