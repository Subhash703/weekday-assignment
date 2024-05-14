import { Box, Chip, Avatar, Typography } from '@mui/material';
import React from 'react'
import { Job } from '../redux/types';
import CustomButton from './CustomButton';
import CustomChip from './CustomChip';
import FadedText from './FadedText';

const JobCard: React.FC<{ jobData: Job }> = ({ jobData }) => {
  const {
    jdUid,
    jdLink,
    jobDetailsFromCompany,
    maxJdSalary,
    minJdSalary,
    salaryCurrencyCode,
    location,
    minExp,
    maxExp,
    jobRole,
    companyName,
    logoUrl,
  } = jobData;

  return (
    <div className="card-content">
      <Chip size='small' label={`⏳ Posted ${Math.floor(Math.random()*100)/2} days ago`} />
      <Box style={{display: 'flex', gap: '2rem', marginTop: 10}}>
        <Box className="company-logo-url">
          <Avatar alt={jdUid} src={logoUrl} />
        </Box>
        <Box>
          <Typography variant="h5">
            <a href={`${jdLink}`} target="_blank" rel="noreferrer">
              {companyName}
            </a>
          </Typography>
          <p className="custom-text paragraph">
            {jobRole}
          </p>
          {minExp && maxExp && <p className="custom-text paragraph">
            {location} | Exp: {minExp} - {maxExp} years
          </p>}
        </Box>
      </Box>
      <h2 className='custom-text header-v2' style={{marginTop: 10}}>
        Estimated Salary: {salaryCurrencyCode} {minJdSalary} - {maxJdSalary} LPA {'✅'}
      </h2>
      <h3 className='custom-text header-v3' style={{marginTop: 10}}>About Company:</h3>
      <h2 className='custom-text header-v2'>About Us:</h2>
      <FadedText text={jobDetailsFromCompany} redirectUri={jdLink}/>
      {jobRole && <p className="custom-text paragraph">
        Role: {jobRole}
      </p>}
      <p className="custom-text paragraph">
        Salary: {salaryCurrencyCode} {minJdSalary} - {maxJdSalary} per year
      </p>
      {location && <p className="custom-text paragraph">
        Location: {location}
      </p>}

      <div className='info-container poc-info-container'>
        <h6 className='custom-text header-v6'>Skills</h6>
        <div className="hard-lang-container" style={{ margin: '0px'}}>
          {/* Hardcoded as API does not give any Skils options */}
          <div style={{display: 'flex', gap: 10,}}>
            <CustomChip content={' EnFullstackgineer'}/>
            <CustomChip content={'NodeJS'}/>
            <CustomChip content={'React JS'}/>
          </div>
          {minExp && 
            <>
              <h3 className='custom-text header-v3' style={{marginTop: 10}}>Minimum Experience</h3>
              <h2 className='custom-text header-v2'>{minExp}+ years</h2>
            </>
            }
        </div>
      </div>
      <button className='button primary-btn mt-12'> ⚡ Easy Apply </button>
      <CustomButton title='Unlock referral asks'/>
    </div>
  );
};

export default JobCard
