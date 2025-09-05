# Testing Using Jest and React Testing Library (RTL)

## Overview

This repository demonstrates testing practices using Jest and React Testing Library (RTL) in a React application. The `04-09-25` branch focuses on various testing strategies, including frontend, backend, and JavaScript testing.

## Branch Highlights

- **`backend-testing`**: Contains tests related to backend functionalities.
- **`frontend-testing`**: Includes tests for frontend components and interactions.
- **`js-testing`**: Features JavaScript-specific tests, ensuring core logic functions correctly.

## JS Function Testing

- Using JEST for testing simple JavaScript functions.
- `toBe()` will test values by reference, so if we want to compare two strings with the same value the test case will fail because it compares both value **and** address. In this case, we need to use `toEqual()` because it compares variables by values.

## Frontend Testing

- Used VITEST + React Testing Library and created a simple counter app.
- This counter app can increment, decrement, set value to zero, and reverse the sign of the number.
- Tested all the above features.
- Used user-event to simulate the user events.

## Backend Testing

- Using JEST with SUPERTEST (to get access to the request object).
- Simulated a dummy request with the help of SUPERTEST and passed values; later, we compare the response or status codes.
- The approach here is to test based on the status codes.
- We can also get access to `content-type` with the help of the response. Basically, this response variable contains all the properties of the Express response object.

## QUESTIONS

- I read that JEST is still experimenting with ECMAScript features — so can we use this with TypeScript?
