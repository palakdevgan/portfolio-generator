const inquirer =require('inquirer');

const fs = require('fs');
const generatePage = require('./src/page-template');



const promptUser = () => {
    return inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'What is your name? (Required)',
        validate:nameInput => {
            if (nameInput) 
              {
                return true;
              } 
              else 
              {
                console.log('Please enter your name!');
                return false;
              }
        }
    },
    {
        type: 'input',
        name: 'github',
        message:'Enter your GitHub Username (Required)',
        validate: githubInput =>{
            if (githubInput) 
            {
              return true;
            } 
            else 
            {
              console.log('Please enter your GitHub Username!');
              return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
    {
        type: 'input',
        name: 'about',
        message:'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
            if (confirmAbout) 
            {
              return true;
            } 
            else 
            {
              return false;
            }
        }
    }
]);
};

const promptProject = portfolioData => {
console.log(`
=================
Add a New Project
==================
`);

if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

return inquirer.prompt([
{
    type:'input',
    name:'name',
    message:'What is the name of your project? (Required)',
    validate: projectNameInput =>{
        if(projectNameInput)
        {
            return true;
        }
        else
        {
            console.log('Please enter your Project Name!');
            return false;
        }
    }
},
{
    type:'input',
    name:'description',
    message:'Provide a description of the project (Required)',
    validate: projectDescriptionInput =>{
        if(projectDescriptionInput)
        {
            return true;
        }
        else
        {
            console.log('Please enter your Project Description!');
            return false;
        }
    }
},
{
    type:'checkbox',
    name:'languages',
    message:'What did you build this project with? (Check all that apply)',
    choices:['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
},
{
    type: 'input',
    name: 'link',
    message: 'Enter the GitHub link to your project. (Required)',
    validate: projectLinkInput =>{
        if(projectLinkInput)
        {
            return true;
        }
        else
        {
            console.log('Please enter your GitHub Project Link!');
            return false;
        }
    }
},
{
    type: 'confirm',
    name: 'feature',
    message: 'Would you like to feature this project?',
    default: false
},
{
    type: 'confirm',
    name: 'confirmAddProject',
    message: 'Would you like to enter another project?',
    default: false
}
]).then(projectData =>{
    portfolioData.projects.push(projectData); 
    if (projectData.confirmAddProject) 
      {
        return promptProject(portfolioData);
      } 
      else 
      {
        return portfolioData;
      }
});
};

const mockData = {
    name: 'Lernantino',
    github: 'lernantino',
    confirmAbout: true,
    about:
      'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
    projects: [
      {
        name: 'Run Buddy',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['HTML', 'CSS'],
        link: 'https://github.com/lernantino/run-buddy',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskinator',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://github.com/lernantino/taskinator',
        feature: true,
        confirmAddProject: true
      }
    ]
  };

  const pageHTML = generatePage(mockData);

// promptUser()
// .then(promptProject)
// .then(portfolioData => {
//     const pageHTML = generatePage(portfolioData);

 fs.writeFile('./index.html', pageHTML, err => {
   if (err) throw err;

   console.log('Portfolio complete! Check out index.html to see the output!');
});
// });