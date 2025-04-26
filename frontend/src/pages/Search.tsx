import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Grid as MuiGrid,
  useTheme,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Work as WorkIcon, LocationOn as LocationIcon, Business as BusinessIcon } from '@mui/icons-material';

const Grid = MuiGrid as any; // Temporary type assertion to fix the linting issues

interface JobResult {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  skills: string[];
  description: string;
}

const mockResults: JobResult[] = [
  {
    id: '1',
    title: 'Software Engineer Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'Internship',
    skills: ['Python', 'React', 'Machine Learning'],
    description: 'Join our team to work on cutting-edge AI projects...',
  },
  {
    id: '2',
    title: 'Product Design Intern',
    company: 'Apple',
    location: 'Cupertino, CA',
    type: 'Internship',
    skills: ['UI/UX', 'Figma', 'Prototyping'],
    description: 'Help design the next generation of Apple products...',
  },
  // Add more mock results as needed
];

const Search = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [results] = useState<JobResult[]>(mockResults);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Search Results
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {results.map((job) => (
            <Grid item xs={12} key={job.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          width: 56,
                          height: 56,
                        }}
                      >
                        <WorkIcon />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {job.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <BusinessIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {job.company}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {job.location}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {job.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          {job.skills.map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: theme.palette.primary.light,
                                color: 'white',
                                '&:hover': { bgcolor: theme.palette.primary.main },
                              }}
                            />
                          ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button variant="contained" color="primary">
                            Apply Now
                          </Button>
                          <Button variant="outlined" color="primary">
                            Save Job
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Search; 