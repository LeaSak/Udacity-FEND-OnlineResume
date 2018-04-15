# Frontend Nanodegree Resume

This is project four in Udacity's Front-End Web Development Nanodegree. The aim of the project was to develop an online resume based on this [project](https://github.com/udacity/frontend-nanodegree-resume/blob/master/README.md).

<p align="center">
  <img width="auto" height="auto" src="https://github.com/LeaSak/Udacity-FEND-OnlineResume/blob/master/screenshot-resume.png?raw=true" alt="Online Resume Screenshot">
</p>

## Getting started

First go to the master branch of the project and get a copy of the repository by either downloading the project files to your computer or via the command line.

`git clone https://github.com/LeaSak/Udacity-FEND-OnlineResume.git`

If you just want to view the built website, go to the project's **dist** directory, and open **index.html** in your browser.

To build the website, you need to first setup your development environment. If you have Bower and Gulp already installed, you can go to Step 2.

#### Step 1: Install node.js, npm, git, Gulp
- Make sure you have **node.js** and **npm**. For instructions on how to install these consult the following links: [node](https://nodejs.org/en/), [npm](https://docs.npmjs.com/getting-started/installing-node).
- You also need **git** setup to use **Bower**, see [git](https://git-scm.com/).
- You also need to install **Bower** as we'll use Bower to install **Bootstrap**, see [Bower](https://bower.io/).
- To install **gulp.js** see [gulp.js](http://gulpjs.com/).

*Note*: You do not need to create package.json, gulpfile.js, and bower.json files. They're already included.

#### Step 2: Install Gulp Dependencies
Make sure you're in your project directory. Now we'll install the project's development dependencies.
- To install **Bootstrap**, run `$ bower install`. You should see bootstrap-sass and Jquery folders appear in your directory.
- To install the **Gulp** dependencies, run `npm install`. You should now find these plugins in your node modules folder.

*Note*: The gulp plugin **gulp-responsive** uses the library **Sharp**. You need to have **Sharp** installed for this plugin to work. See [this link](http://sharp.dimens.io/en/stable/install/) for instructions.

#### Step 3: Build
- Run `gulp` if you want to play around with the site itself. The default gulp task includes a watch task to track the build process. See the gulpfile.js for further information.
- All HTML code needed to build the resume is stored in js/helper.js variables. The resumeBuilder.js file contains four objects that store the information needed for the website content.
- Run `gulp build` in the command line if you simply want to build the project.

*Note*: This project was built using **Sass**. To edit the stylesheets, edit the files found in the **src/scss/** directory. Do not edit the css output files found in the **dist/css** directory. For more information on **Sass**, visit [Sass](http://sass-lang.com/).

## Feedback

Feedback is very welcome.