# Naimuri Tech Task

Had fun with this one. Probably took a little longer than planned - there're just so many considerations!

## Running locally

Download or clone the repository. Run `npm install` and run in development with `npm run dev`.

Or visit the hosted version at https://naimuri-tech-task.pages.dev

## Given more time, I would...
* Paginate results from the API
* Add validation around the username. Probably build a nice URL-username parser.
* Add tests around the data fetching (probably refactoring with custom React hooks)
* Utilise URL Params to hold state (userId, modal open, filters selected, etc).
* Utilise more typescript generics for data fetchers and DRY code
* handled error messages more gracefully.

## In the real world, this application would...
* Have all of the above
* Have more robust error handling and logging.
* have unit tests for all components and hooks, and integration tests
* use an access token to facilitate more read limits
* be styled properly

## My Approach

Started out by noting down the requirements. I then blitzed a quick wireframe in Excalidraw, drafting out the component tree in red (see below).

I then made action plan that looked something like:

**Action Plan**
1. Display basic list of repo names from a hardcoded user
2. Add the ability to search for a specific user
3. Improve repo list UI
   1. Links to author
   2. (e.g. stars, forks, likes, and issues, links)
4. Display Readme in Modal
5. Add some client-side search or filtering capabilities

And so I read up on the docs, fired up a new Vite React app and installed PicoCSS so I could focus on the functionality first as I knew I would get distracted with CSS.


## Thoughts
 - Get the User first, and then fetch their repos (to check if user exists/display their data somewhere). But in the interest of time I went straight to getting the repos.
 - Edited design - initial design had duplicate links. This is not ideal.
 - Getting the Readme! Ideally, I would like to pre-fetch readme’s from each repo so that the View Readme button was pre-populated with a link. I chose not to do this because seems a bit of of scope and would eat read requests without authentication.
 - Ran into some logical issues keeping track of which modal was open at any one time. I was sharing the isOpen state between all of them! But of course each button action needs to match the current repo id
 - Modal - I wanted to make sure that the dialog removes itself from the DOM when it’s closed. I think this is best achieved with a dom reference and useRef().
 - Problem: useEffect in the UserSearch woudln't retrigger because it was depending on a string. so I created an object with a query property, so that a new reference is made each time and the effect triggers anytime on submit.
 - Filtering - programming languages seemed most appropriate. Populate checkboxes with languages used across all repos, control the selected value and filter the repos by ones that have that language value.


## Images
<img width="695" height="304" alt="Screenshot 2025-10-10 at 16 15 55" src="https://github.com/user-attachments/assets/988e24c5-48fe-4267-9a13-fda7f7397277" />

<img width="1650" height="818" alt="Screenshot 2025-10-10 at 16 17 04" src="https://github.com/user-attachments/assets/d8fc3be1-29a3-43c5-8d36-c41c9545f812" />





