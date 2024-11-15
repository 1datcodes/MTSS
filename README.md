# How to run locally

1. Install all dependancy using `npm i`
2. start backend server via `node backend/server.js`
3. type `npm run dev` on another terminal window
4. go to the localhost link

Important: Make sure to ask for the `.env` file to Kaicheng or Michi since it stores the API keys

# Version Update

- ## Version 0.1.0

  - WYSIWYG editor works using React TipTap and saves to local storage (storage on your browser)
  - Login system works by using MongoDB
  - Login persists through local storage (stays logged in even after closing browser)
  - ### **To do**:
    - Save changes on the content to a database so that it changes for all users _**(Implemented in V0.2.0)**_
    - Authorize access to editor for Admins and don't allow others _**(Implemented in V0.1.1)**_
    - Migrate user authentication to an authentication provider like Auth0 for more security
    - Add functionality to the editor like links, images, and videos _**(Implemented in V0.1.3)**_
    - Make the website pop out by styling the page _**(Implemented in V1.0.1)**_

- ## Version 0.1.1

  - Added Profile page where users can view their username and access type
  - Only users with admin permission can edit pages now (currently sheth shilpan)
  - ### **To do**:
    - Look for admin permission through database _**(Implemented in V0.1.2)**_

- ## Version 0.1.2

  - Implemented permissions in database rather than in localstorage
  - Added confirm password in sign up
  - ### To do:
    - Figure out how to host the database and website (through netlify maybe) _**(Implemented in V0.3.0)**_

- ## Version 0.1.3

  - Added the ability to add Hyperlinks, Images, and Videos from the editor
  - Typography is now supported
  - _Important_: Adding files requires a premium subscription to TipTap
  - ### **To do**:
    - Make the editing menu bar stay in place so that it's more accessible

- ## Version 0.2.0

  - Saved content to database, instead of localStorage

- ## Version 1.0.0

  - MTSS Web App successfully deployed and hosted
  - Frontend is hosted using Netlify [Production Link](https://gunn-mtss.netlify.app)
  - Backend is hosted using Render [Render Link](https://mtss.onrender.com)
    - Backend doesn't show anything so don't worry about the `Cannot GET /` error
  - ### **To do**:
    - Add a way to `Save changes` and `Discard changes` so it's safer to edit
    - Make the Nav bar editable
    - Make it possible to create new pages
    - Make it possible to divide a page into different segments

- ## Version 1.0.1

  - Added font selection
  - Stylized the editor menu button
  - Removed heading selection
  - **Bug**:
    - Website isn't properly hosted _**(Resolved in V1.1.0)**_
    - Mr. Paley will find us a mentor to do that
  - **Todo**:
    - Figure out a way to change text size or integrate headings
    - Make the prompt for video and image upload look better

- ## Version 1.1.0

  - Fixed Website hosting issue

- ## Version 1.1.1

  - Added Jesse's MTSS Logo

- ## Version 1.1.2

  - Removed Floating menu and Bubble menu, deemed unnecessary
  - Added Favicon
  - **Todo**:
    - Add font size _**(Implemented in V1.1.3)**_

- ## Version 1.1.3

  - Added font size
