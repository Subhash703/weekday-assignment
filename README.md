### Weekday Assignment
Visit [Weekday Assigment](https://subhash-weekday-assignment.netlify.app) to check deoloyed version of the application.

Feature implementation and explanation: 
1. Infinite Scrolling with useEffect and Event Listeners: To implement infinite scrolling, I'm using the useEffect hook to add and remove a scroll event listener. When the user scrolls near the bottom of the page, I'm dispatching the fetchJobsWithFilters action with an incremented limit to fetch the next batch of job listings.
2. Type Safety with TypeScript: Throughout the project, I have leveraged TypeScript to ensure type safety and catch potential type errors during development. We defined interfaces and types for job data, filter options, and Redux state, which helped maintain consistency and catch errors early.
3. Material-UI (MUI) for UI Components: I have used the Material-UI (MUI) library to create reusable UI components like the Select dropdowns (Multiple select and sinle select), and JobCard etc.
4. Redux Toolkit for State Management: I have used Redux Toolkit, which is a modern and simplified way of managing application state with Redux. It provides utilities like createSlice and createAsyncThunk that make it easier to write Redux logic.
5. Slices for Modular State Management: Instead of using a single monolithic Redux reducer, I have followed a modular approach by creating a separate slice for job-related data and actions. This slice (redux/jobSlice.ts) is responsible for managing the state and actions related to fetching and filtering jobs.
6. Asynchronous Actions with createAsyncThunk: To handle asynchronous operations like fetching job data from an API (now it's normal data fetch from a file), I used the createAsyncThunk utility from Redux Toolkit. This utility automatically generates action creators and actions for different lifecycle stages (pending, fulfilled, rejected) of the asynchronous operation.
7. Conditional Filtering in the fetchJobs Action Creator: I have implemented filtering logic inside the fetchJobsWithFilters action creator. When dispatching this action, I'm passing an optional filters object containing the selected filter options (roles, noOfEmployees, experience, workFromOptions, minBasePay, companyName). Inside the action creator, I have implemented the filtering logic based on the provided filter options before returning the filtered job data.

## Setup
To set up the project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:

```sh
npm install
npm start
```

This will start the application in development mode and open it in your default browser.

## Deployment
This project is currently deployed at Netlify.

To deploy the application, follow these steps:
1. Build the application.
```sh
npm run build // To check if there are any warning or errors as it will fail the build.
```

This command will create an optimized build in the build folder. Ensure there are no warnings or errors during the build process, as they may cause the deployment to fail.

2. Push your code to the GitHub repository.
3. Publish the application on Netlify by connecting your GitHub repository to Netlify.

Netlify will automatically deploy the application whenever you push changes to the connected GitHub repository.