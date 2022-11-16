const inq = require("inquirer");
const fs = require("fs");

//prompt for info
inq.prompt([
//title
    {type: "input", name: "title", message: "What is the name of your repo?"},
//description
    {type: "input", name: "description", message: "Describe your project."},
//install instruction
    {type: "input", name: "installation", message: "How do you install it?"},
//usage information
    {type: "input", name: "usage", message: "How do you use it?"},
//license list
    {type: "list", name: "license", message: "Which license did you use?", choices: ["MIT", "ISC", "Unlicense"]},
//contrib guidelines
    {type: "input", name: "contribution", message: "How can you contribute?"},
//test instructions
    {type: "input", name: "testing", message: "How do you test it?"},
//github username
    {type: "input", name: "username", message: "What is your github username?"},
//email address
    {type: "input", name: "email", message: "What is your email address"},
//best contact instructions
    {type: "list", name: "contactpref", message: "How would you like to be contacted", choices: ["Email", "Github Issues", "Don't talk to me."]},
])
//then use that response
.then((data) => {
    // gathering the badge and link for the license.
    let licenseBadge = (data.license == "MIT")
        ? "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)" 
        : (data.license == "ISC")
        ? "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
        : "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
    let licenseLink = licenseBadge.split("]")[2];
    
//writing the file
fs.writeFile("README.md", 

// using a string literal for easy editing.
`
# ${data.title} ${licenseBadge}


${data.description}

| Table of Contents: | [Installation](#installation) | [Questions](#questions) | [Usage](#usage) | [License](#license) | [Contributing](#contributing) | [Tests](#tests) |

## Installation

${data.installation}

## Usage

${data.usage}

## License

This software is covered under the ${data.license} license. For more info, [click here.]${licenseLink}

## Contributing

${data.contribution}

## Tests

${data.testing}

## Questions

If you have questions, please reach out to me via ${data.contactpref}. My email is [${data.email}](mailto:${data.email}), and this is my [github profile.](www.github.com/${data.username})
`

// catching any errors and logging them or success.
, (err) => (err)? console.log(err) : console.log("README successfully created!"));
});