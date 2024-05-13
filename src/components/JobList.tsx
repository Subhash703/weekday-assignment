import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

const pageSize = 10;

export default function JobList() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([{
    jdUid: "cfff35ac-053c-11ef-83d3-06301d0a7178-92010",
    jdLink: "https://weekday.works",
    jobDetailsFromCompany:
      "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
    maxJdSalary: 61,
    minJdSalary: null,
    salaryCurrencyCode: "USD",
    location: "delhi ncr",
    minExp: 3,
    maxExp: 6,
    jobRole: "frontend",
    companyName: "Dropbox",
    logoUrl: "https://logo.clearbit.com/dropbox.com",
  }]);

  console.log("Here : ", jobs)

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.addEventListener("scroll", () => {
        let scrollHeight = document.documentElement.scrollHeight;
        let scrollTop = window.document.documentElement.scrollTop;
        let viewHeight = window.innerHeight;
        if (scrollTop + viewHeight + 1 >= scrollHeight) {
          setPage(page + 1);
        }
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchJobs = () => {
    return [];
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {loading && <div>Loading...</div>}
      {/* Jobs List */}
      {jobs && (
        <Grid container spacing={2} style={{ maxWidth: '80vw' }} >
          {jobs.map((job) => (
            <Grid style={{ minWidth: 275 }} item xs={12} sm={6} md={4} key={job.jdUid} >
              <JobCard jobData={job} />
            </Grid>
          ))}
        </Grid>
      )}
      {(jobs.length == 0 && !loading) && "Can't find any Jobs"}
    </div>
  );
}