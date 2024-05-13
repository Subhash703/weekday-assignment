import { getSampleJdJSON } from "../../data";
import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { Job } from "../types";

interface JobState {
    jobs: Job[],
    loading: boolean
}

const initialState: JobState = {
    jobs: [],
    loading: false
}

export const fetchJobs = createAsyncThunk(
    'job/fetchJobs',
    async (payload: { limit: number, offset: number }) => {
        const { limit, offset } = payload;
        try {
            const data: any = await getSampleJdJSON();
            return data.slice(offset, offset + limit);
        } catch (error) {
            throw error;
        }
    }
);


const jobSlice = createSlice({
    name: 'job',
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state) => {
                state.loading = false;
                // Handle error if needed
            });
    }

});

export const jobActions = {
    ...jobSlice.actions,
    fetchJobs
};

export default jobSlice.reducer;