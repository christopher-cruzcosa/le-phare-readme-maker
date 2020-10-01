const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer")

let nameText = ""
let descText = ""
let instText = ""
let usagText = ""
let credText = ""
let liscText = ""

const writeFileAsync = util.promisify(fs.writeFile);


inquirer
    .prompt([
        {
            type: "input",
            message: "Welcome to le Phare Corp's ReadMe Generator.  What is your project name?",
            name: "name",
        },
        {
            type: "input",
            message: "Please provide a description of the project:",
            name: "desc",
        },
        {
            type: "input",
            message: "Please provide installation instructions for the project:",
            name: "inst",
        },
        {
            type: "input",
            message: "Please provide usage information for the project:",
            name: "usag",
        },
        {
            type: "input",
            message: "Please provide credits for the project:",
            name: "cred",
        }
    ])
    .then((response) => {
        const { name } = response;
        nameText = name
        const { desc } = response;
        descText = desc
        const { inst } = response;
        instText = inst
        const { usag } = response;
        usagText = usag
        const { cred } = response;
        credText = cred
        console.log(nameText)

        let readmeFileText =

`# ${nameText}

## Description 
${descText}
  
## Table of Contents
  
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
 
## Installation
${instText}
  
## Usage 
${usagText}
  
## Credits
${credText}
  
## License
${liscText}
  
---
  
🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.
  
## Badges
  
![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)`

        writeFileAsync('readMe.md', readmeFileText);
    })
    .catch((err) => {
        console.log(err);
    });




// fs.writeFile('readMe.md', readmeFileText, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });


// inquirer
//   .prompt([
//     {
//       type: "input",
//       message: "Welcome to le Phare Corp's ReadMe Generator.  What is your project name?",
//       name: "name",
//     }
//   ])
//   .then(function (answers) {
//     // Inquirer passes an object which contains the users answers. Each key of
//     // of the object corresponds to the name property of the questions.
//     nameText = answers.name
// });

// async function main(){
//     try {
//       const response = await inquirer.prompt([
//         {
//           type: "input",
//           message: "Welcome to le Phare Corp's ReadMe Generator.  What is your project name?",
//           name: "name",
//         }
//       ]);
//       const {joke} = response.data;

//       await appendFileAsync("jokes.txt",joke + "\n");
//       const allJokes = await readFileAsync("jokes.txt", "utf8");
//       console.log(allJokes);

//     } catch (error) {
//       console.log(error)
//     }
//    };

//    main();