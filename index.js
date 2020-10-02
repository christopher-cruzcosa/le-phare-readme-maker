const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer")

const writeFileAsync = util.promisify(fs.writeFile);
const licenses = {
    types: {
        MIT: "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
        ISC: "![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
        Apache: "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
        GNU: "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    }
}

function main() {
    promptUser()
        .then((answers) => {
            const html = generateHTML(answers);
            return writeFileAsync("readme.md", html);
        })
        .then(() => {
            console.log("Successfully created a new readme.md file");
        })
        .catch((err) => {
            console.log(err);
        });
}

function promptUser() {
    return inquirer.prompt([
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
            name: "install",
        },
        {
            type: "input",
            message: "Please provide usage information for the project:",
            name: "usage",
        },
        {
            type: "input",
            message: "Please provide testing information for the project:",
            name: "testing",
        },
        {
            type: "input",
            message: "Please provide credits for the project:",
            name: "credits",
        },
        {
            type: "list",
            message: "Please select a license type:",
            name: "license",
            choices: [
                "MIT",
                "ISC",
                "Apache",
                "GNU"
            ]
        },
        {
            type: "input",
            message: "What is your GitHub profile name?",
            name: "gitHub"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email",
        },
    ])
};


function generateHTML(answers) {
    let licenseBadge;
    let licenseText;
    let gitHubAddress = "https://github.com/" + answers.gitHub
    if(answers.license === "MIT"){
        licenseBadge = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
        licenseText = `Copyright (c) [2020] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
        
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
        
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

    } else if (answers.license === "ISC"){
        licenseBadge = "![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)";
        licenseText = `Copyright (c) [2020] [fullname]

Permission to use, copy, modify, and/or distribute this software for any purpose with or 
without fee is hereby granted, provided that the above copyright notice and this permission notice appear 
in all copies.
        
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE 
INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE 
FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM 
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, 
ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`;

    } else if (answers.license === "Apache"){
        licenseBadge = "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";
        licenseText = `Copyright [2020] [name of copyright owner]
     
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
     
    http://www.apache.org/licenses/LICENSE-2.0
     
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;

    } else {
        licenseBadge = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)";
        licenseText = `Copyright (C) <year>  <name of author>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
    
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
    
You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`;
    }

    return `# ${answers.name}

## Description 
${licenseBadge} 
${answers.desc}
          
## Table of Contents
          
* [Installation](#installation)
* [Usage](#usage)
* [Testing](#testing)
* [Credits](#credits)
* [License](#license)
* [Questions](#questions)
         
## Installation
${answers.install}
          
## Usage 
${answers.usage}

## Testing 
${answers.testing}
          
## Credits
${answers.credits}
          
## License
${licenseText}

## Questions
If you have any questions, reach me at: 
    - Email: ${answers.email}
    - GitHub Profile: ${gitHubAddress}`
          
}

main();