# MVP Project for Operation Level Up
Concept: Personalized bookmarks for RPG's.

## Describe your project in as much detail as possible:
RPG's are big nowadays. So when you look up information for them, you end up getting a plethora of results. Too many to sift through really. Therefore when you find an article you like, you can use this website as a quick reference to guide you to the knowledge you want.

The general idea of what the user can store on the site includes, game titles, a URL/bookmark for the site you're saving, and a description of what you were trying to find on the site.

Specifically, there'll be categories for game title, url, location/maps, characters, equipment, lore, online, multiplayer, easter eggs, achievements, video-guides, and website guides

## What are all the ways the User will interact with your application on the client side? What are the user inputs, (buttons, input boxes, etc) and what does the user get back?
The user must input a game title into a text box.
The user must input a url to the webstie.

The user can upload a description of what they were trying to find on the site.
The user can upload a map of the area they're in for the specified URL.
The user can specify from a drop-down menu whether or not the URL's contents are for a character, equipment, lore, online play, multiplayer play, achievements, video-guides, website guides, game mechanics, campaign, or other.

## As best as you can, list out what routes you will need to hangle in your Express server, and what data each route will send back.
I'll need a GET, POST, PUT/PATCH, and DELETE

### GET - Route paths
username from userid
gametitle from gameid

/ - prompts login for specific user
/username - once logged in they can decide to create new game bookmark or visit previously bookmarked material on the webpage
/username/gametitle/ - once selected the info should be displayed here for their specific game

### POST - Route paths
/username - adds username to the database
/username/gametitle - adds gametitle for username to the database
/username/gametitle/infoid - adds info for gametitle for username to the database

### PUT/PATCH - Route paths
/username - change username info
/username/gametitle - change game title
/username/gametitle/infoid - change url, description, map, or category information

### DELETE - Route paths
/username - deletes user (should be prompted before delete)
/username/gametitle - deletes gametitle for username
/username/gametitle/infoid - deletes info entry for gametitle

##  What tables will your database need, and what columns will be in each table?
I'll need a users table, games table, and info table

### User's Table
id (PK)
username
password
website title

### Game's Table
id (PK)
gametitle
userid (FK)

### Info Table
id (PK)
url
description
Map
Category
gameid (FK)
