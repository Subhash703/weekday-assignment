import { getSampleJdJSON } from "../../data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilterOptions, Job } from "../types";

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
            const data: any = getSampleJdJSON();
            return data.slice(offset, offset + limit);
        } catch (error) {
            throw error;
        }
    }
);

export const fetchJobsWithFilters = createAsyncThunk(
    'job/fetchJobsWithFilters',
    async (payload: { limit: number; offset: number; filters?: FilterOptions }) => {
      const { limit, offset, filters } = payload;
      try {
        let data: any = getSampleJdJSON();
  
        // Apply filters
        console.log("Filters ::", filters);
        if (filters) {
          const { roles, noOfEmployees, experience, workFromOptions, minBasePay, companyName } = filters;
          /**
           * Filter based on jobRole 
           * */ 
          if (roles && roles.length > 0) {
            data = data.filter((job: Job) => roles.includes(job.jobRole.toLowerCase()));
          }
          
          /**
           * Filter based on no of employees in the company.
           * noOfEmployees: a range of numbers in string, Eg : "1-10" 
           * Note :: Current API does not give any details about no of employees in the company, so this filter won't work.
           */
          if (noOfEmployees && noOfEmployees !== "") {
            // data = data.filter((job: Job) => job)
            // job.noOfEmployees falls in selected range by user.
          }          

          /**
           * Filter based on minExp (no of years of expericence)
           */
          if (experience && experience !== "" && !isNaN(parseInt(experience))) {
            data = data.filter((job: Job) => parseInt(experience) >= job.minExp)
          }

          /**
           * Filter based on workFromOptions, user can select multiple options (remote, in-office or hybrid)
           * Note :: Current API does not give any details about options.
           */
          if (workFromOptions && workFromOptions.length > 0) {
            data = data.filter((job: Job) => workFromOptions.includes(job.jobRole.toLowerCase()));
          }
          
          /**
           * Filter based on minBasePay salary,
           * Returns jobs whose maxJdSalary is more than selected value 
           */
          if (minBasePay && minBasePay !== "" && !isNaN(parseInt(minBasePay))) {
            data = data.filter((job: Job) => {
                return parseInt(minBasePay) <= (job?.maxJdSalary || 0)
            })
          }

          /**
           * Filter based on companyName.
           * Return all the jobs where companyName includes the value entered by the user.
           */
          if (companyName && companyName !== "") {
            data = data.filter((job: Job) => {
                return job?.companyName.includes(companyName)
            })
          }

        }
  
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
            .addCase(fetchJobsWithFilters.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobsWithFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobsWithFilters.rejected, (state) => {
                state.loading = false;
            });
    }

});

export const jobActions = {
    ...jobSlice.actions,
    fetchJobs,
    fetchJobsWithFilters
};

export default jobSlice.reducer;