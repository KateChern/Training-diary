# Training Diary


## About 

Training Diary is an app that helps you track your workouts. It has a few diffirant programs with trainings and their description. You can choose a program to follow, complete trainings, and track your progress in your account. 

This project aims to demonstrate some of my Front end frogramming skills, such as:

- CRUD operations with firebase/displaying response data, 
- Authentication with firebase,
- React Lifecycle
- React Routing
- React Hooks and custom Hooks
- Error Handling

## Description

`A hosted version` of this Training Diary can be found at https://training-diary.netlify.app
<br>
Training Diary is responsive with a mobile first approach.
<br>

1. A new user lands on the login page / existing user - on the home page 
2. If user's profile is not complete, it will be suggested to create their profile
3. Next user can click on the programs icon and choose one of the programs or click on user icon and see/update profile details and password
4. After completeng a training user can find it by clicking on the calendar icon and choosing the day it was completed or by clicking on the user icon and choosing "my trainings"
5. User can update profile info 

## Setup

You will need Node.js version 16.13.2 or higher and npm version 8.1.2 installed before being able to run this project.

## Installation

To run this project you will need to clone this repository onto your local machine.
```
$ git clone https://github.com/KateChern/Training-diary.git
```

Navigate inside the folder and install all dependencies by entering the following commands on your terminal window:

```
$ cd Training-diary
$ npm install
```
Create your firebase database

Create .env file with the firebase details in it, such as: 
- REACT_APP_API_KEY
- REACT_APP_AUTH_DOMAIN
- REACT_APP_DATABASE_URL
- REACT_APP_PROJECT_ID
- REACT_APP_STORAGE_BUCKET
- REACT_APP_MESSAGING_SENDER
- REACT_APP_APP_ID


To run the application locally enter:

```
$ npm start
```

The application will run on http://localhost:3000.
