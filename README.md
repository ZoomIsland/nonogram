# Nono? Yaya!
A site for nonogram building and solving.

### What's a nonogram?
A nonogram is a sudoku-like puzzle that is a color image when complete.

## Sprints
To keep a solid focus throughout the holidays, Nono Yaya was built throughout the following sprints:

**Sprint One: Nonogram Creator**

*MVP completed on 12/18*

Because I need data and the grid component will be useable later, I began with the Nonogram Creator. This meant that it's at the center of the design (not an afterthought), even though the future solving tools will be different.
Functionality includes:
* 8 distinct color options
* Color chooser (from react-color)
* Buttons to add columns and rows



**Sprint Two: Nonogram Database**

*MVP completed on 12/29*

Utilizing Node/Express, this database will store the arrays created by the creator. It will also have login capability--which will not be turned on until at least Sprint 4.
Functionality includes:
* Readied Nonogram Database
* Full CRUD on Nonograms (deletes connection, not full nonogram)

*** Early ERD ***
![ERD](/public/Nonogram-Early-ERD.png)


**Sprint Three: Nonogram Puzzle Viewer**

*Currently in progress*

This is how most users will approach the site. It is meant to be a simple and beautifully written viewer that allows for solving, searching, and scrolling.
Functionality includes:
* Nonogram solve page
* Clues auto-creating from solution
* Clues and gridBoxes auto-crossing off when correct
* Search by size
* Nonogram index (5-10 total visible)

*** Updated ERD ***

Updated to store date info, array (instead of string), and connect Users to Nonograms so "solved" data can be stored.

![UpdatedERD](/public/Jan2021ERD.png)

**Sprint Four: User/Admin tie-in**

Once the Nonograms are able to be created, indexed, and solved, I will begin to tie-in Users and Admin into the site. Users will now be able to login to save a "solved" Nonogram. Admin will be able to see and approve/delete nonograms before they're visible on the Index.
* User Database
* Admin Database
* User Profile pages on the front end
* Admin page on front end


**Sprint Five: Beautification**

For all previous code, CSS will be heavily used in order to get a consistent theme and strong visibility on all current tools.
Changes include:
* Main color and branding implemented
* Streamlining of Nonogram viewer (both creator and solver)
* Adding right-click functionality for whitespace/X
* Decisions about nav functionality
* About pages

**This marks MVP.**

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

