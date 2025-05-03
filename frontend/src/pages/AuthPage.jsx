import { useState } from 'react';
import { AlertCircle, Check, Loader } from 'lucide-react';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate inputs
      if (!loginForm.username || !loginForm.password) {
        throw new Error('All fields are required');
      }

      // This would normally be connecting to your backend API
      const response = await fetch(
        'https://landora-production.up.railway.app/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: loginForm.username,
            password: loginForm.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('authToken', data.token);
      setSuccess('Login successful! Redirecting...');

      // Redirect to dashboard or home
      setTimeout(() => {
        window.location.href = '/home';
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate inputs
      if (
        !registerForm.username ||
        !registerForm.email ||
        !registerForm.password
      ) {
        throw new Error('All fields are required');
      }

      if (registerForm.password !== registerForm.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // This would normally be connecting to your backend API
      const response = await fetch(
        'https://landora-production.up.railway.app/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: registerForm.username,
            email: registerForm.email,
            password: registerForm.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess('Registration successful! Please log in.');

      // Clear form and switch to login
      setRegisterForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        setActiveTab('login');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className='flex h-screen w-full items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dpdrfruja/image/upload/v1746290608/pinal-jain-x-XwnC7FgFM-unsplash_fsyduy.jpg')",
      }}
    >
      <div className='w-full max-w-md rounded-xl bg-white/20 backdrop-blur-xl backdrop-filter shadow-xl border border-white/30'>
        {/* Tabs */}
        <div className='flex w-full rounded-t-xl overflow-hidden'>
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'login'
                ? 'border-b-2 border-amber-500 text-white bg-white/10'
                : 'text-white hover:text-white hover:bg-white/10'
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === 'register'
                ? 'border-b-2 border-amber-500 text-white bg-white/10'
                : 'text-white hover:text-white hover:bg-white/10'
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <div className='p-6'>
            <div className='mb-6'>
              <h2 className='text-2xl font-bold text-white'>
                Log into your account
              </h2>
              <p className='mt-1 text-sm text-white/80'>
                Enter your credentials to access your account
              </p>
            </div>

            {/* Alert Messages */}
            {error && (
              <div className='mb-4 flex items-center gap-2 rounded-md bg-red-900/30 backdrop-blur-sm p-4 text-white border border-red-500/50'>
                <AlertCircle className='h-5 w-5' />
                <div>
                  <p className='font-medium'>Error</p>
                  <p className='text-sm'>{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className='mb-4 flex items-center gap-2 rounded-md bg-green-900/30 backdrop-blur-sm p-4 text-white border border-green-500/50'>
                <Check className='h-5 w-5' />
                <div>
                  <p className='font-medium'>Success</p>
                  <p className='text-sm'>{success}</p>
                </div>
              </div>
            )}

            {/* Username Field */}
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='mb-2 block text-sm font-medium text-white'
              >
                Username
              </label>
              <input
                id='username'
                type='text'
                placeholder='Enter your username'
                className='w-full rounded-md border border-white/30 bg-white/10 p-2 text-white placeholder-white/50 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
              />
            </div>

            {/* Password Field */}
            <div className='mb-6'>
              <div className='mb-2 flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-white'
                >
                  Password
                </label>
              </div>
              <input
                id='password'
                type='password'
                placeholder='••••••••'
                className='w-full rounded-md border border-white/30 bg-white/10 p-2 text-white placeholder-white/50 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogin();
                }}
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className='w-full rounded-md bg-amber-600/90 backdrop-blur-sm p-3 text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70'
            >
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <Loader className='mr-2 h-4 w-4 animate-spin' />
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </div>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <div className='p-6'>
            <div className='mb-6'>
              <h2 className='text-2xl font-bold text-white'>
                Create an account
              </h2>
              <p className='mt-1 text-sm text-white/80'>
                Enter your details to create a new account
              </p>
            </div>

            {/* Alert Messages */}
            {error && (
              <div className='mb-4 flex items-center gap-2 rounded-md bg-red-900/30 backdrop-blur-sm p-4 text-white border border-red-500/50'>
                <AlertCircle className='h-5 w-5' />
                <div>
                  <p className='font-medium'>Error</p>
                  <p className='text-sm'>{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className='mb-4 flex items-center gap-2 rounded-md bg-green-900/30 backdrop-blur-sm p-4 text-white border border-green-500/50'>
                <Check className='h-5 w-5' />
                <div>
                  <p className='font-medium'>Success</p>
                  <p className='text-sm'>{success}</p>
                </div>
              </div>
            )}

            {/* Username Field */}
            <div className='mb-4'>
              <label
                htmlFor='reg-username'
                className='mb-2 block text-sm font-medium text-white'
              >
                Username
              </label>
              <input
                id='reg-username'
                type='text'
                placeholder='Choose a username'
                className='w-full rounded-md border border-white/30 bg-white/10 p-2 text-white placeholder-white/50 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
                value={registerForm.username}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, username: e.target.value })
                }
              />
            </div>

            {/* Email Field */}
            <div className='mb-4'>
              <label
                htmlFor='reg-email'
                className='mb-2 block text-sm font-medium text-white'
              >
                Email
              </label>
              <input
                id='reg-email'
                type='email'
                placeholder='Enter your email'
                className='w-full rounded-md border border-white/30 bg-white/10 p-2 text-white placeholder-white/50 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
              />
            </div>

            {/* Password Field */}
            <div className='mb-4'>
              <label
                htmlFor='reg-password'
                className='mb-2 block text-sm font-medium text-white'
              >
                Password
              </label>
              <input
                id='reg-password'
                type='password'
                placeholder='Create a password'
                className='w-full rounded-md border border-white/30 bg-white/10 p-2 text-white placeholder-white/50 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
              />
            </div>

            {/* Confirm Password Field */}
            <div className='mb-6'>
              <label
                htmlFor='reg-confirm'
                className='mb-2 block text-sm font-medium text-white'
              >
                Confirm Password
              </label>
              <input
                id='reg-confirm'
                type='password'
                placeholder='Confirm your password'
                className='w-full rounded-md border border-white/30 bg-white/10 p-2 text-white placeholder-white/50 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500'
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    confirmPassword: e.target.value,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRegister();
                }}
              />
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className='w-full rounded-md bg-amber-600/90 backdrop-blur-sm p-3 text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70'
            >
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <Loader className='mr-2 h-4 w-4 animate-spin' />
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
