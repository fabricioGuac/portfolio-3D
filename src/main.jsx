import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Error from './pages/Error.jsx';
import Navigation from './pages/Navigation.jsx';
import AboutMe from './pages/AboutMe.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Skills from './pages/Skills.jsx';


const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigation />,
      },
      {
        path: '/AboutMe',
        element: <AboutMe/>,
      },
      {
        path: '/projects',
        element:<Projects/>,
      },
      {
        path: '/contact',
        element: <Contact/>,
      },
      {
        path: '/skills',
        element:<Skills/>,
      },
    ]
  }
]);




createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
