const fs = require("fs");
function cleanFileByRemovingExtraSpaces(filePath){
    fs.readFile(filePath , "utf-8" , (err, data) => {

        // Removing extra spaces using a regular expression
        const trimmedStr = data.replace(/\s+/g, ' ');
        fs.writeFile(filePath , trimmedStr , (err) => {
            if(err)
                console.log("Error occured in fileWrite: ", err);
            else
                console.log("Spaces removed successfully!");
        })
    });
}


cleanFileByRemovingExtraSpaces("file.txt");