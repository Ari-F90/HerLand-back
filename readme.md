# HerLand Project

This is a full-stack SPA (Single-Page Application) that aims to shed light on the stories of inspiring women who have not been recognized throughout the history and who have made significant contributions to their respective domains.
The application allows users to filter these figures on specific categories such as sports, science, literature and more.
Happy exploring and learning about them!<br><br>

**_Desktop display_**:

<img width="893" alt="Captura de pantalla 2023-07-08 a las 12 13 50" src="https://github.com/Ari-F90/HerLand-back/assets/115626747/98d22e8b-4079-41b5-8958-1404ed2ddc99">

<br>

**_Mobile display_**:

<img width="684" alt="Captura de pantalla 2023-07-08 a las 12 07 27" src="https://github.com/Ari-F90/HerLand-back/assets/115626747/aa22fe44-dbd9-40e6-b125-71d4ae01351e">

<br>

## Technologies Used

The app uses the following technologies:

- Front-end:

  - React
  - Redux
  - Typescript
  - SASS modules

- Back-end:

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Firebase
  - Postman

## Getting started

To run the app locally, follow these steps:

- Clone this repository to your local machine.
- Install the dependencies using npm install in both the root directory and the client directory.
- Run the command "npm install" to install all the required dependencies.
- Start the app using "npm start". This will start both the back-end server and the front-end development server.

## Features

The app allows users to:

**User-friendly Interface**: The app provides an intuitive and visually appealing user interface that allows users to easily navigate and explore the list of women.

**Category Filtering**: Users can filter the list of women based on different categories, enabling them to focus on specific fields of interest such as history, music, poetry and more.

**Detailed Profiles**: Each woman in the list has a detailed profile where users can access additional information including her significant achievements, a memorable quote by her and a brief overview of her story.

**Back-End API Integration**: Herland is built with a back-end API that serves the necessary data for the application. The API provides endpoints to retrieve the list of women, filter by category, and fetch detailed profiles.

**Test Coverage**: Both the front-end and the back-end works, are thoroughly tested to ensure reliability and stability.

**Database**: The goal is to expand the database, adding more figures in the future.

All the read actions are performed via API calls to the back-end server.

## API Integration:

GET ➡️ .../figures

- Gets the list of all women.

GET ➡️ .../figures/:id

- Gets detailed information (name, image, birth and death dates, about a specific woman with the given ID.

GET ➡️ .../figures/?category

- Filters the list of women based on the specified category.

## Other interesting and related links

- Figma: https://www.figma.com/file/eiU1ie8x5Wht7UfT6LteVn/HerLand?type=design&node-id=0-1&mode=design&t=UFv8m0q94XAjSWmc-0
- Netlify:
  https://herland.netlify.app/
- Sonar:
  https://sonarcloud.io/summary/overall?id=Ari-F90_HerLand-back

  https://sonarcloud.io/summary/overall?id=Ari-F90_HerLand-front
