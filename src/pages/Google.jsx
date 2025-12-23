import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Divider
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Google,
  Facebook,
  Email
} from '@mui/icons-material';

const GoogleForm = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true
  });
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setErrors({});
    setSubmitStatus({ type: '', message: '' });
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateSignup = () => {
    const newErrors = {};
    
    if (!signupData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!signupData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!signupData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!signupData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const validateLogin = () => {
    const newErrors = {};
    
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignup();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setSubmitStatus({ type: 'loading', message: 'Creating your account...' });
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send this data to your backend
      console.log('Signup data:', signupData);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Account created successfully! Please check your email to verify your account.' 
      });
      
      // Reset form
      setSignupData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        newsletter: true
      });
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to create account. Please try again.' 
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setSubmitStatus({ type: 'loading', message: 'Logging in...' });
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send this data to your backend
      console.log('Login data:', loginData);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Login successful! Redirecting...' 
      });
      
      // Reset form
      setLoginData({
        email: '',
        password: '',
        rememberMe: false
      });
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Invalid email or password. Please try again.' 
      });
    }
  };

  const handleSocialLogin = (provider) => {
    setSubmitStatus({ type: 'loading', message: `Connecting with ${provider}...` });
    
    // In a real app, you would implement OAuth flow here
    console.log(`Social login with ${provider}`);
    
    setTimeout(() => {
      setSubmitStatus({ 
        type: 'info', 
        message: `Redirecting to ${provider} authentication...` 
      });
    }, 1000);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        p: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 500,
          p: { xs: 2, sm: 4 },
          borderRadius: 2
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account or create a new one
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>

        {/* Status Messages */}
        {submitStatus.message && (
          <Alert 
            severity={submitStatus.type === 'loading' ? 'info' : submitStatus.type}
            sx={{ mb: 3 }}
          >
            {submitStatus.message}
          </Alert>
        )}

        {/* Login Form */}
        {tabValue === 0 && (
          <form onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleLoginChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={handleLoginChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 1,
              mb: 3
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link 
                component="button" 
                type="button"
                onClick={handleForgotPassword}
                sx={{ cursor: 'pointer' }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={submitStatus.type === 'loading'}
              sx={{ mb: 3, py: 1.2 }}
            >
              Sign In
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR CONTINUE WITH
              </Typography>
            </Divider>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => handleSocialLogin('Google')}
                disabled={submitStatus.type === 'loading'}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={() => handleSocialLogin('Facebook')}
                disabled={submitStatus.type === 'loading'}
              >
                Facebook
              </Button>
            </Box>

            <Typography variant="body2" align="center" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component="button"
                type="button"
                onClick={() => setTabValue(1)}
                sx={{ cursor: 'pointer' }}
              >
                Sign up
              </Link>
            </Typography>
          </form>
        )}

        {/* Signup Form */}
        {tabValue === 1 && (
          <form onSubmit={handleSignupSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={signupData.firstName}
                onChange={handleSignupChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={signupData.lastName}
                onChange={handleSignupChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={signupData.email}
              onChange={handleSignupChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={signupData.password}
              onChange={handleSignupChange}
              error={!!errors.password}
              helperText={errors.password || 'Must be at least 8 characters'}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mt: 2, mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    checked={signupData.acceptTerms}
                    onChange={handleSignupChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="#" target="_blank">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" target="_blank">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
              {errors.acceptTerms && (
                <Typography variant="caption" color="error">
                  {errors.acceptTerms}
                </Typography>
              )}
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  name="newsletter"
                  checked={signupData.newsletter}
                  onChange={handleSignupChange}
                  color="primary"
                />
              }
              label="Subscribe to our newsletter"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={submitStatus.type === 'loading'}
              sx={{ my: 3, py: 1.2 }}
            >
              Create Account
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR SIGN UP WITH
              </Typography>
            </Divider>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => handleSocialLogin('Google')}
                disabled={submitStatus.type === 'loading'}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={() => handleSocialLogin('Facebook')}
                disabled={submitStatus.type === 'loading'}
              >
                Facebook
              </Button>
            </Box>

            <Typography variant="body2" align="center" color="text.secondary">
              Already have an account?{' '}
              <Link
                component="button"
                type="button"
                onClick={() => setTabValue(0)}
                sx={{ cursor: 'pointer' }}
              >
                Sign in
              </Link>
            </Typography>
          </form>
        )}

        {/* Footer */}
        <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1 }}>
            Need help? <Link href="#">Contact Support</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default GoogleForm;