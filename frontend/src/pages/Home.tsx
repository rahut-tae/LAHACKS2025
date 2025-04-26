import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid as MuiGrid,
  useTheme,
  Paper,
  InputAdornment,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { School as SchoolIcon, Search as SearchIcon, Work as WorkIcon, Upload as UploadIcon } from '@mui/icons-material';

const Grid = MuiGrid as any; // Temporary type assertion to fix the linting issues

const Home = () => {
  const theme = useTheme();
  const [school, setSchool] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [personalization, setPersonalization] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching:', { school, searchQuery, personalization });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      p: 3,
      bgcolor: '#fff'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', maxWidth: '584px' }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '5rem',
              fontWeight: 400,
              color: '#4285F4',
              mb: 2,
              letterSpacing: '-0.05em',
            }}
          >
            JobSight
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 400,
              color: '#5f6368',
              mb: 4,
            }}
          >
            Find your perfect career match
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 2, 
            mb: 4,
            border: '1px solid #dfe1e5',
            '&:hover': {
              boxShadow: '0 1px 6px rgba(32,33,36,0.28)',
              borderColor: 'rgba(223,225,229,0)',
            }
          }}
        >
          <Grid container spacing={3}>
            {/* School Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your School"
                variant="outlined"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon sx={{ color: '#5f6368' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#dfe1e5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#dfe1e5',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4285F4',
                    },
                  },
                }}
              />
            </Grid>

            {/* Main Search Bar */}
            <Grid item xs={15}>
              <TextField
                fullWidth
                label="Search by skills, company, or role"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#5f6368' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#dfe1e5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#dfe1e5',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4285F4',
                    },
                  },
                }}
              />
            </Grid>

            {/* Personalization Box */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tell us about yourself or upload your resume"
                variant="outlined"
                value={personalization}
                onChange={(e) => setPersonalization(e.target.value)}
                multiline
                rows={4}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon sx={{ color: '#5f6368' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#dfe1e5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#dfe1e5',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4285F4',
                    },
                  },
                }}
              />
            </Grid>

            {/* Upload Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<UploadIcon />}
                sx={{ 
                  mb: 2,
                  color: '#5f6368',
                  borderColor: '#dfe1e5',
                  '&:hover': {
                    borderColor: '#4285F4',
                    backgroundColor: alpha('#4285F4', 0.04),
                  }
                }}
              >
                Upload Resume
              </Button>
            </Grid>

            {/* Search Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                sx={{ 
                  height: '44px',
                  backgroundColor: '#4285F4',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#3367d6',
                  },
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Find Matches
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Typography 
          variant="body2" 
          sx={{ 
            color: '#5f6368',
            textAlign: 'center',
            fontSize: '13px',
          }}
        >
          Powered by AI to help you find the perfect career opportunities
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Home; 