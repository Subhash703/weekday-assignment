import { configureStore } from "@reduxjs/toolkit";
import jobReducer from './jobs/jobSlice';

export const store = configureStore({
    reducer: {
        jobs: jobReducer
    }
})

// Export type of the state (as this is a typescript project)
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
