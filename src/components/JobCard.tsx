import { Box, Card, CardContent, Chip, Avatar, Typography } from '@mui/material';
import React from 'react'
import { Job } from '../redux/types';
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
    <Box className='card-wrapper'>
      <Card>
        <CardContent>
          <Chip size='small' label={`⏳ Posted ${Math.floor(Math.random()*100)/2} days ago`} />
          <Box style={{display: 'flex', gap: '2rem', marginTop: 10}}>
            <Box>
              <Avatar alt={companyName} src={logoUrl} />
            </Box>
            <Box>
              <Typography variant="h5">
                <a href={`${jdLink}`} target="_blank" rel="noopener noreferrer">
                  {companyName}
                </a>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {jobRole}
              </Typography>
             {minExp && maxExp && <Typography variant="body1" color="textSecondary" gutterBottom>
                {location} | Exp: {minExp} - {maxExp} years
              </Typography>}
            </Box>
          </Box>
          <h2 className='custom-header-v2' style={{marginTop: 10}}>
            Estimated Salary: {salaryCurrencyCode} {minJdSalary} - {maxJdSalary} LPA {'✅'}
          </h2>
          <h3 className='custom-header-v3' style={{marginTop: 10}}>About Company:</h3>
          <h2 className='custom-header-v2'>About Us:</h2>
          <FadedText text={jobDetailsFromCompany} redirectUri={jdLink}/>
          <Typography variant="h6" gutterBottom>
            About Role:
          </Typography>
          {jobRole && <Typography variant="body2" paragraph>
            Role: {jobRole}
          </Typography>}
          <Typography variant="body2" paragraph>
            Salary: {salaryCurrencyCode} {minJdSalary} - {maxJdSalary} per year
          </Typography>
          {location && <Typography variant="body2" paragraph>
            Location: {location}
          </Typography>}

          <div className='info-container poc-info-container'>
            <h3 style={{marginTop: 10}}>Skills</h3>
            <div className="hard-lang-container" style={{ margin: '0px'}}>
              <div style={{display: 'flex', gap: 10,}}>
                <CustomChip content={'Fullstack Engineer'}/>
                <CustomChip content={'NodeJS'}/>
                <CustomChip content={'React JS'}/>
              </div>
              <h3 className='custom-header-v3' style={{marginTop: 10}}>Minimum Experience</h3>
              <h2 className='custom-header-v2'>{minExp}+ years</h2>
            </div>
          </div>
          <button className='primary-button'> ⚡ Easy Apply </button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobCard
