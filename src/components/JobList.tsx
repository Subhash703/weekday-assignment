import { Grid } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { fetchJobsWithFilters } from '../redux/jobs/jobSlice';
import { RootState } from '../redux/store';
import JobCard from './JobCard';
import FormMultiAutoComplete from './FormMultiAutoComplete';
import { empRanges, expOptions, minBasePayOptions, roles, workFromOptions } from '../data';
import FormSingleAutoComplete from './SingleSelectAutocompleteProps';
import CustomInputField from './CustomInputField';

const pageSize = 10;

export default function JobList() {
  const [page, setPage] = useState(1);
  const { jobs, loading } = useSelector((state: RootState) => state.jobs);
  const [filteredRoles, setFilteredRoles] = useState<any[]>([]);
  const [filteredNoOfEmps, setFilteredNoOfEmps] = useState<any>(null);
  const [filtredExp, setFilteredExp] = useState<any>(null);
  const [filteredWorkOptions, setFilteredWorkOptions] = useState<any[]>([]);
  const [filteredMinBasePay, setFilteredMinBasePay] = useState<any>(null);
  const [searchedCompany, setSelectedCompany] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const fetchNextJobs = () => {
    dispatch(fetchJobsWithFilters({ 
      limit: page * pageSize, 
      offset: 0, 
      filters: { 
        roles: filteredRoles,
        noOfEmployees: filteredNoOfEmps,
        experience: filtredExp,
        workFromOptions: filteredWorkOptions,
        minBasePay: filteredMinBasePay,
        companyName: searchedCompany ?? ""
      } 
    }));
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


  useEffect(() => {
    fetchNextJobs();
    // eslint-disable-next-line
  }, [filteredRoles, filteredNoOfEmps, filtredExp, filteredWorkOptions, filteredMinBasePay])

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchNextJobs();
    }, 600);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line
  }, [searchedCompany])

  const getCapitalizedValue = (text: string, postFix?: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1) + (postFix ? postFix : '');
  }

  const handleComapnySearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("handleComapnySearch", e.target.value);
    setSelectedCompany(e.target.value);
  }

  return (
    <div className='job-list-wrapper'>
      {(jobs.length === 0 && !loading) && "Can't find any Jobs"}
      {
        jobs &&
        <div className="filter-view">
          <div className="filter role-filter">
            <FormMultiAutoComplete
              id="role"
              label="Roles"
              options={roles}
              getOptionLabel={(item) => getCapitalizedValue(item)}
              onChange={(e, value) => setFilteredRoles(value)}
              onTextChange={() => { }}
              data={filteredRoles}
              className="w-full"
            />
          </div>
          <div className="filter role-filter">
            <FormSingleAutoComplete
              id="noOfEmpls"
              label="No of employees"
              options={empRanges}
              getOptionLabel={(item) => getCapitalizedValue(item)}
              onChange={(e, value) => setFilteredNoOfEmps(value)}
              onTextChange={() => { }}
              data={filteredNoOfEmps}
              className="w-full"
            />
          </div>
          <div className="filter role-filter">
            <FormSingleAutoComplete
              id="experience"
              label="Experience"
              options={expOptions}
              getOptionLabel={(item) => getCapitalizedValue(item)}
              onChange={(e, value) => setFilteredExp(value)}
              onTextChange={() => { }}
              data={filtredExp}
              className="w-full"
            />
          </div>
          <div className="filter role-filter">
            <FormMultiAutoComplete
              id="workoption"
              label="Working Options"
              options={workFromOptions}
              getOptionLabel={(item) => getCapitalizedValue(item)}
              onChange={(e, value) => setFilteredWorkOptions(value)}
              onTextChange={() => { }}
              data={filteredWorkOptions}
              className="w-full"
            />
          </div>
          <div className="filter role-filter">
            <FormSingleAutoComplete
              id="basepay"
              label="Minimum Base Pay Salary"
              options={minBasePayOptions}
              getOptionLabel={(item: string) => getCapitalizedValue(item, 'L')}
              onChange={(e, value) => setFilteredMinBasePay(value)}
              onTextChange={() => { }}
              data={filteredMinBasePay || ''}
              className="w-full mb-4"
            />
          </div>
          <div className="filter role-filter">
            <CustomInputField
              handleOnChange={handleComapnySearch}
              placeholder="Search Company Name"
              data={searchedCompany}
            />
          </div>
        </div>
      }
      {loading && <div>Loading...</div>}
      {/* Jobs List */}
      {jobs && (
        <div className='grid-container'>
          {jobs.map((job) => (
            <Grid className='grid-item' style={{ minWidth: 275 }} item xs={12} sm={6} md={4} key={job.jdUid}>
              <JobCard jobData={job} />
            </Grid>
          ))}
        </div>
      )}
    </div>
  );
}