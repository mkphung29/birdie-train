The content below is an example project proposal / requirements document. Replace the text below the lines marked "**TODO**" with details specific to your project. Remove the "TODO" lines.

# Birdie Train

## Overview

Attention all golfers! Do you want to improve your golf game but don't know where to start? That's where Birdie Train comes in!

Birdie Train is a web app that allows users to keep track of their golf stats for each round. Users can register and login. Once they're logged in, they can add a new round or view all of their previous rounds. For every round that they have, they can keep important statistics such as their score, the number of fairways or putts they've hit, and the course rating.

## Data Model
The application will store Users, Rounds, and Stats

- users can have multiple rounds (via references)
- each round can have multiple stats (by embedding)

An Example User:

```javascript
{
  username: "numberOneGolfer",
  hash: "<hashed_password>",// a password hash,
  rounds: ["<ObjectId of Round 1>", "<ObjectId of Round 2>"] // an array of references to Round documents
}
```

An Example Round with Embedded Items:

```javascript
{
  "user": "<ObjectId of numberOneGolfer>",
  "courseName": "Watters Creek Golf Course",
  "date": "2024-10-15",
  "score": 78,
  "yardage": 5800,
  "courseInfo": {
    "coursePar": 72,
    "courseRating": 71.5,
    "slopeRating": 125
  },
  "roundStats": {
    "fairways": 10,
    "GIRs": 12,
    "upAndDowns": 5,
    "putts": 30
  }
  createdAt: // timestamp
}
```

## [Link to Commented First Draft Schema](src/db.mjs)

(**TODO**: create a first draft of your Schemas in db.mjs and link to it)

## Wireframes

/ - initial page

![inital](documentation/inital-page.png)

/signup - user signup page

![signup](documentation/signup.png)

/login - user login page

![login](documentation/login.png)

/home - homepage showing list of all user rounds

![home](documentation/homepage.png)

/addRound - page for creating a new round

![add round](documentation/add-round.png)

/home/slug - page for showing specific round

![list](documentation/course.png)

## Site map

![site map](documentation/site-map.png)

## User Stories

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can add a new golf round
4. as a user, I can view all of the rounds I've played in a single list
5. as a user, I can update any statistics to an existing round
6. as a user, I can delete any round from my list

## Research Topics

(**TODO**: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

- (5 points) Integrate user authentication
  - I'm going to be using passport for user authentication
  - And account has been made for testing; I'll email you the password
  - see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
  - see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
- (4 points) Perform client side form validation using a JavaScript library
  - see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
  - if you put in a number that's greater than 5, an error message will appear in the dom
- (5 points) vue.js
  - used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (**\_TODO**: addtional points will **not** count for extra credit)

## [Link to Initial Main Project File](app.mjs)

(**TODO**: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(**TODO**: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)
