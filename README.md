## How to run locally

1. Install all dependancy using "npm i"
2. start backend server via "node backend/server.js"
3. type "npm run dev" on another terminal window
4. go to the localhost link

Important: Make sure to ask for the .env file to Kaicheng or Michi since it stores the API keys

## Version Update

- Version 0.1.0

  - WYSIWYG editor works using React TipTap and saves to local storage (storage on your browser)
  - Login system works by using MongoDB
  - Login persists through local storage (stays logged in even after closing browser)
  - To do:
    - Save changes on the content to a database so that it changes for all users
    - Authorize access to editor for Admins and don't allow others (Implemented in V0.1.1)
    - Migrate user authentication to an authentication provider like Auth0 for more security
    - Add functionality to the editor like links, images, and videos
    - Make the website pop out by styling the page

- Version 0.1.1

  - Added Profile page where users can view their username and access type
  - Only users with admin permission can edit pages now (currently sheth shilpan)
  - To do:
    - Look for admin permission through database (Implemented in V0.1.2)

- Version 0.1.2
  - Implemented permissions in database rather than in localstorage
  - Added confirm password in sign up
  - To do:
    - Figure out how to host the database and website (through netlify maybe)
