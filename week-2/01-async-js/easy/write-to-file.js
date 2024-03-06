const fs = require("fs");
function writeToFile(filePath){
    fs.readFile(filePath , "utf-8", (err , data) => {
        const newData = data + "\nThis line is written via fileWrite!";
        console.log(newData);
        fs.writeFile(filePath , newData , (err) => {
            if(err)
                console.log("Error: ", err);
            else
                console.log("Data written successfully!");
        })
    });
}


console.log("Program execution starts");
writeToFile("file.txt");
console.log("Write to file called!");
