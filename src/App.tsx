import { FC } from 'react';
import './assets/styles/app.css';
import './assets/styles/app.scss';

// import react router dom
import { RouterProvider } from 'react-router-dom';
import router from './routes';

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
