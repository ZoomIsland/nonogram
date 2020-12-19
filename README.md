# Nono? Yaya!
A site for nonogram building and solving.

### What's a nonogram?
A nonogram is a sudoku-like puzzle that is a color image when complete.

## Sprints
To keep a solid focus throughout the holidays, Nono Yaya was built throughout the following sprints:

**Sprint One: Nonogram Creator**
Because I need data and the grid component will be useable later, I began with the Nonogram Creator. This meant that it's at the center of the design (not an afterthought), even though the future solving tools will be different.
Functionality includes:
* 8 distinct color options
* Color chooser (from react-color)
* Buttons to add columns and rows
*MVP completed on 12/18&*

**Sprint Two: Nonogram Database**
Utilizing Node/Express, this database will store the arrays created by the creator. It will also have login capability--which will not be turned on until at least Sprint 4.
Functionality includes:
* User Database
* Admin Database
* Readied Nonogram Database
* Full CRUD on Users and Nonograms (deletes connection, not full nonogram)
*Currently in progress*

**Sprint Three: Nonogram Puzzle Viewer**
This is how most users will approach the site. It is meant to be a simple and beautifully written viewer that allows for solving, searching, and scrolling.
Functionality includes:
* Nonogram solve page
* Search by size
* Nonogram index (5-10 total visible)

**Sprint Four: Beautification**
For all previous code, CSS will be heavily used in order to get a consistent theme and strong visibility on all current tools.
Changes include:
* Main color and branding implemented
* Streamlining of Nonogram viewer (both creator and solver)
* Adding right-click functionality for whitespace/X
* Decisions about nav functionality
* About pages

**This marks MVP.**

**Sprint Five: Admin/User updates**
I will continue iterating on Admin endpoints and create a front-end to review incoming Nonograms. User pages and endpoints will be updated, too.
Functionality includes:
* User Profile Page (which shows created and solved nonograms)
* Admin front-end (for nonogram review/approval)
* Updated User Model
* Updated Admin functionality for the API

**Sprint Six: Additional tools**
These are the tools I think would be great to have:
* Drag +/- row/column
* Different solve tools (row/column restricted, freeform)
* Review system
* Help system
* Automated Nonogram tester
* Nonogram Build visual (to show it being constructed before sent off)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Use `npm start` to boot in development mode, then open in [http://localhost:3000](http://localhost:3000)
## Available Scripts

