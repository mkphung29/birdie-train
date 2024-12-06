Milestone 04 - Final Project Documentation
===

NetID
---
mkp6075

Name
---
Madison Phung

Repository Link
---
[Repo Link](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29)

URL for deployed site 
---
- **URL for frontend**: [http://216.165.22.58:32057](http://216.165.22.58:32057)
- **URL for backend**: [http://linserv1.cims.nyu.edu:12190](http://linserv1.cims.nyu.edu:12190)

URL for form 1 (from previous milestone) 
---
- **Link to Add Round form**: [http://216.165.22.58:32057/addRound](http://216.165.22.58:32057/addRound)
- **Link to backend data**: [http://linserv1.cims.nyu.edu:12190/api/rounds](http://linserv1.cims.nyu.edu:12190/api/rounds)

Special Instructions for Form 1
---
You have to be signed in as a user in order to access this form. 

Click on **Add Round** to fill out the form. Save the Round, and the home screen should show all rounds.

URL for form 2 
---
From milestone 3, I implemented user signup and login pages. 

- **Link to Sign up form**: [http://216.165.22.58:32057/signup]
- **Link to Login form**: [http://216.165.22.58:32057/login]

Special Instructions for Form 2
---
Create a user profile and the home page should show the current user logged in. You can login with the same user credentials and it should show the same user.

URL for form 3 
---
- **Link to Prediction form**: [http://216.165.22.58:32057/prediction]

Special Instructions for Form 3
---
This feature allows users to keep track of their goals for their next round. Users fill out the form with the course's info, the score they want to shoot, and any comments explaining what they hope to accomplish in their next round. 

First link to github line number(s) for constructor, HOF, etc.
---
Used **map** to find the player's handicap in lines 227-230: [https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/app.mjs]

Second link to github line number(s) for constructor, HOF, etc.
---
Used **reduce** to find the player's scoring average in line 268: [https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/app.mjs]

Short description for links above
---
First link:
- map is used to transform the rounds array into an array of differentials by calculating the player's adjusted score based on the course rating and slope rating for each round.

Second link: 
- reduce is used to accumulate the total score from all rounds by summing the score from each round in the rounds array. 

Link to github line number(s) for schemas (db.js or models folder)
---
[Link to schemas](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/db.mjs)

Description of research topics above with points
---
- (6 points) React
  - React is used as the main frontend framework to build the golf stats management system. It manages the user interface and facilitates interactivity, creating a dynamic and responsive experience for users.
- (5 points) JSON Web Tokens, JWT
  - JWT is implemented for user authentication. The tokens enable secure login, round saving, and user profile management, ensuring that only authenticated users can access and modify their data. 
- (2 points) Tailwind CSS
  - Tailwind CSS is used to style the application, providing a utility-first approach for creating responsive and modern designs. This speeds up development by applying styles directly in JSX without the need for custom CSS files.
- (2 points) Client-Side Javascript Library: React Hook Form
  - React Hook Form is utilized to manage form state and validation. It simplifies handling forms for adding new rounds and updating stats, ensuring smooth user interaction and efficient input validation.

Links to github line number(s) for research topics described above (one link per line)
---
React, JWT Tokens, and Tailwind CSS is used throughout my entire application but I included one example for each. 

- **React code found in Home.jsx**: [https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/client/src/pages/Home.jsx]
- **JWT Tokens is implemented in app.mjs. Link to middleware for JWT in lines 81-98**: [https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/app.mjs]
- **Tailwind CSS in Home.jsx**: [https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/client/src/pages/Home.jsx]
- **React Hook Form found in AddRound.jsx, Login.jsx, Signup.jsx, and Prediction.jsx**: 
    - AddRound.jsx: [https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/client/src/pages/AddRound.jsx]
    - Login.jsx: [https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/client/src/pages/Login.jsx]
    - Signup.jsx: [https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/client/src/pages/Signup.jsx]
    - Prediction.jsx [https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-mkphung29/blob/master/src/client/src/pages/Prediction.jsx]

Optional project notes 
--- 
Use this sample username and login to see the handicap, scoring average, and pesonal best statistics. This user will already have rounds saved in order to calculate these stats, so the grader doesn't have to input info themselves.

username: golfer11
password: 123

Attributions
---

1. **[react.js docs](https://react.dev/learn)**  
   - Official React documentation for learning the basics and advanced concepts of React.

2. **[react w3 schools](https://www.w3schools.com/react/react_router.asp)**  
   - Tutorial on using React Router for navigation within a React app.

3. **[tailwindcss docs](https://v2.tailwindcss.com/docs)**  
   - Official Tailwind CSS documentation to understand utility classes and how to style applications.

4. **[react hook form docs](https://react-hook-form.com/get-started)**  
   - Documentation for React Hook Form, which helps with form validation and state management in React.

5. **[Youtube Tutorial for Building Fullstack MERN App](https://www.youtube.com/watch?v=xKs2IZZya7c&themeRefresh=1)**  
   - YouTube tutorial for building a full-stack MERN app, providing guidance on backend and frontend integration.

6. **[Youtube Tutorial Playlist for Tailwind CSS](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gpXORlEHjc5bgnIi5HEGhw)**  
   - YouTube playlist offering a series of videos on learning Tailwind CSS and applying it in projects.

7. **[React Scrimba Course](https://v2.scrimba.com/learn-react-c0e)**  
   - Interactive React course from Scrimba, covering fundamental and advanced React topics.

8. **[JWT documentation](https://jwt.io/introduction)**  
   - Official JWT documentation explaining how JSON Web Tokens work and how to implement them.

9. **[Youtube JWT Authentication Tutorial](https://www.youtube.com/watch?v=mbsmsi7l3r4)**  
   - YouTube tutorial on how to implement JWT-based authentication in a web app.

10. **[Youtube Full Stack Blinkit Clone used for reference](https://www.youtube.com/watch?v=sgJlE0utgHU)**  
   - YouTube tutorial on building a full-stack app with React, Node.js, and MongoDB, referenced for the project structure.

11. **[Youtube React Tinder Clone used for reference](https://www.youtube.com/watch?v=Q70IMS-Qnjk)**  
   - YouTube tutorial for building a React-based Tinder clone app, useful for UI design and logic.

12. **[Youtube Authentication in React with JWTs](https://www.youtube.com/watch?v=AcYF18oGn6Y)**  
   - YouTube tutorial on handling JWT authentication in React, covering token generation and validation.

13. **[How to Sign and Validate JSON Web Tokens](https://www.freecodecamp.org/news/how-to-sign-and-validate-json-web-tokens/)**  
   - FreeCodeCamp article explaining the process of signing and validating JWTs, useful for secure authentication.

14. **[Higher Order Functions in JavaScript – Explained with Practical Examples](https://www.freecodecamp.org/news/higher-order-functions-in-javascript-explained/)**  
   - FreeCodeCamp article with explanations and examples of higher-order functions in JavaScript, useful for functional programming.
