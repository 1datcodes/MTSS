## How to run locally
1. Install all dependancy using "npm i"
2. start backend server via "node backend/server.js"
3. type "npm run dev" on another terminal window
4. go to the localhost link

Important: Make sure to ask for the .env file to Kaicheng or Michi since it stores the API keys

## Version Update
- Version 0.1.0
    - WYSIWYG editor works using React TipTap and saves to local storage (storage on your browser)
    - Log in system works by using MongoDB and login persists through local storage (stays logged in even after closing browser)
    - To do:
        - Save changes on the content to a database so that it changes for all users
        - Migrate user authentication to an authentication provider like Auth0 for more security
        - Add functionality to the editor like links, images, and videos
        - Make the website pop out by styling the page
