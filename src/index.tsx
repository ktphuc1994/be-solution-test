import React from 'react';
import ReactDOM from 'react-dom/client';

// import local components
import App from './App';

// import local libraries
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import MUI compnents
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import theme from './theme/MuiTheme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      retry: (failureCount, error) => {
        if (typeof error === 'string' && error === 'Unauthorized. Please login to continue')
          return false;
        if (failureCount === 3) return false;
        return true;
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CssBaseline />
          <App />
        </LocalizationProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ToastContainer autoClose={2000} />
  </>
);
