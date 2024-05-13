import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { fetchJobs } from '../redux/jobs/jobSlice';
import { RootState } from '../redux/store';
import JobCard from './JobCard';

const pageSize = 10;

export default function JobList() {
  const [page, setPage] = useState(1);
  const { jobs, loading } = useSelector((state: RootState) => state.jobs);
  const dispatch = useAppDispatch();
  const fetchNextJobs = () => {
    dispatch(fetchJobs({ limit: page * pageSize, offset: 0 }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.document.documentElement.scrollTop;
      const viewHeight = window.innerHeight;

      if (scrollTop + viewHeight + 1 >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  useEffect(() => {
    if (page > 0) {
      fetchNextJobs();
    }
    // eslint-disable-next-line
  }, [page, dispatch]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {loading && <div>Loading...</div>}
      {/* Jobs List */}
      {jobs && (
        <div className='grid-container' style={{ maxWidth: '80vw' }}>
          {jobs.map((job) => (
            <Grid className='grid-item' style={{ minWidth: 275 }} item xs={12} sm={6} md={4} key={job.jdUid}>
              <JobCard jobData={job} />
            </Grid>
          ))}
        </div>
      )}
      {(jobs.length === 0 && !loading) && "Can't find any Jobs"}
    </div>
  );
}