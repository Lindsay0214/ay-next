This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

Before starting, make sure you have installed everything on your machine, including our dependencies:

```bash
npm install
```

And first, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Second, test the function:

```bash 
npm test
```

### Introduction
The main languages and frameworks used include TypeScript, JavaScript, NPM, and React. 

This project includes several main components, including `CustomInputNumber`, `RoomAllocation`, and the `getDefaultRoomAllocation` function.

`CustomInputNumber` is a custom numeric input component that allows users to input numbers via buttons or the keyboard. This component ensures that the input number is within a specified range.  

`RoomAllocation` is a component for displaying and managing room allocation. It uses the getDefaultRoomAllocation function to calculate the optimal room allocation scheme and provides an interface for users to adjust the number of people allocated.  

`getDefaultRoomAllocation` is a function that calculates the optimal room allocation based on the provided room and guest information. This function prioritizes the price and capacity of the rooms to ensure the lowest total price and that all guests have a room.

### Demo
https://github.com/user-attachments/assets/8f1de610-5412-424a-84c5-ad0a976c1656

