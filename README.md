# Quiz App

This project was created to help me improve my understanding and skills in **_[ReactJS](https://reactjs.org/)_**. Upon watching multiple course in different educational websites like Udemy and Pluralsight, I think it is better to learn something if you are practicing it and creating projects with it.

This application were built with **_[ReactJS](https://reactjs.org/)_** with **_[Redux](https://redux-toolkit.js.org/)_** for managing state of the application. This applications maximizes the use of Redux as I used **_[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)_** which is a feature of redux for fetching or sending HTTP request from to the server or API. I chose to use RTK Query for the reason that I'm already using Redux. Initially, I planned to use **_[React Query](https://react-query-v3.tanstack.com/)_** for handling the communication of between the frontend and the backend because it makes sense to use this kind of library for the reason that it makes fetching data easier and more efficient than making my own.

This application has two roles for its users. It is the **_Quizzer_** and the **_Quizee_**.

## Installation Guide

This project is very simple to install in your local machine. Follow these instructions to get started:

- Be sure to have [NodeJs](https://nodejs.org/) installed on your local machine.

- The application uses React version 18+

- Clone the repository to your local machine.
  ```bash
  git clone https://github.com/dwrdvncntcvs/quiz-app.git
  ```
- Open the directory on your terminal and run the following commands:

  ```bash
  #Installing dependencies via NPM
  npm install

  #installing dependencies via Yarn
  yarn
  ```

- You should have cloned **_[quiz-app-api](https://github.com/dwrdvncntcvs/quiz-app-api)_** which is the backend for this application.

- After installing the dependencies and running the backend, you can now run the following commands:

  ```bash
  #To run or start the application
  yarn start

  #To build the application
  yarn build
  ```

> **_Note:_** _This is only a side project. I think there are still some minor bugs that I wasn't detected but if you have found one, you can tell me and I try to work on it._

> **_Note:_** _The application state is currently under development._
