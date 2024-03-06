const fs = require("fs");
fs.readFile("file.txt" , "utf-8" , (err , data) => {
    console.log(data);

});


console.log("Sum calculation started!");
let sum = 0;
for(let i = 1; i <= 1000000000 ; i++){
    sum += i;
}
console.log("Sum Calculation finished!");
console.log(`The sum is ${sum}`);