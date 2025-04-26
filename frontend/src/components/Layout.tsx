import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Person as PersonIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                }}
              >
                JobSight AI
              </Typography>
            </motion.div>

            {isMobile ? (
              <IconButton
                size="large"
                edge="end"
                color="primary"
                aria-label="menu"
                sx={{ ml: 'auto' }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
                <Button
                  component={Link}
                  to="/search"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  Search
                </Button>
                <Button
                  component={Link}
                  to="/profile"
                  startIcon={<PersonIcon />}
                  variant="contained"
                  color="primary"
                >
                  Profile
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        component={motion.main}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        maxWidth="lg"
        sx={{ py: 4 }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 