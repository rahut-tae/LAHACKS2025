import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid as MuiGrid,
  Button,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

const Grid = MuiGrid as any; // Temporary type assertion to fix the linting issues

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  location: 'Los Angeles, CA',
  school: 'University of California, Los Angeles',
  major: 'Computer Science',
  graduationYear: '2025',
  linkedin: 'linkedin.com/in/johndoe',
  skills: ['Python', 'React', 'TypeScript', 'Machine Learning', 'UI/UX Design'],
  savedJobs: [
    {
      id: '1',
      title: 'Software Engineer Intern',
      company: 'Google',
      location: 'Mountain View, CA',
      status: 'Applied',
    },
    {
      id: '2',
      title: 'Product Design Intern',
      company: 'Apple',
      location: 'Cupertino, CA',
      status: 'Saved',
    },
  ],
};

const Profile = () => {
  const theme = useTheme();

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4}>
          {/* Profile Information */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: theme.palette.primary.main,
                      fontSize: '3rem',
                      mb: 2,
                    }}
                  >
                    {mockUser.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {mockUser.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {mockUser.major}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <SchoolIcon color="action" />
                    <Typography variant="body2">{mockUser.school}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationIcon color="action" />
                    <Typography variant="body2">{mockUser.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <EmailIcon color="action" />
                    <Typography variant="body2">{mockUser.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkedInIcon color="action" />
                    <Typography variant="body2">{mockUser.linkedin}</Typography>
                  </Box>
                </Box>

                <Button variant="contained" color="primary" fullWidth>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {mockUser.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      sx={{
                        bgcolor: theme.palette.primary.light,
                        color: 'white',
                        '&:hover': { bgcolor: theme.palette.primary.main },
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Saved Jobs */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Saved & Applied Jobs
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {mockUser.savedJobs.map((job, index) => (
                    <React.Fragment key={job.id}>
                      {index > 0 && <Divider sx={{ my: 2 }} />}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="subtitle1" gutterBottom>
                            {job.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <WorkIcon fontSize="small" />
                              <Typography variant="body2">{job.company}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationIcon fontSize="small" />
                              <Typography variant="body2">{job.location}</Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Chip
                          label={job.status}
                          color={job.status === 'Applied' ? 'primary' : 'default'}
                          size="small"
                        />
                      </Box>
                    </React.Fragment>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Profile; 