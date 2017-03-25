# Project 1: Swolemate
Make friends. Get swole.

## Live Link
- https://benjinchang.github.io/P1-Swolemate/

## Description on how to use the app
- Create an account
- Fill out profile
- Check out explorer page for activities and places to get swole
- Hangout in the chatroom to talk to other swollies

## Requirements
- Have at least two APIs
- Use AJAX to pull data
- Utilize at least one new library or technology that we haven’t discussed
- Have a polished frontend / UI
- Meet good quality coding standards (indentation, scoping, naming)
- No alerts, confirms, or prompts are allowed.
- Have some sort of repeating element (table, columns, etc)
- Use Bootstrap or Alternative CSS Framework
- Must be Deployed via Firebase
- Have User Input Validation 

## Technologies Used
- Bootstrap
- Jquery
- Event listeners
- API (Google Maps, Google Drawing, Google Places)
- AJAX

## Code Explaination
Authentication
- Using authorization methods to create a new user from firebase. Using an email address and password.
- Saves new user in the authentication tab.
- Create a new user object. Saves information under user ID. User ID is linked to their profile information.

Explorer Page
- Google maps and Google places API
- User Location specified and stored in firebase database.
- Google map API geocoder to convert zipcode to return lat/lng coordinates to manipulate on map
- We use zipcode in order to return to user # of users in his/her area. Seems like easiest way to organize users for the time being. 
- From user interest we have a checklist of individual activities. Which the user can select to display on the map

- After selection, the google places library will populate area around user location for selected interests. From here, users can grab an idea/gym/store to suggest to other swolemates.
- On Click, the user will be able to see details on the markers placed.

Swole Chat
- User will be able to chat to other swollies about varioues topics and ideas. The swole chat has multiple channels for various topics.
