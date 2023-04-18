import { createBrowserRouter } from 'react-router-dom';
import Chat from './pages/Chat';
import Root from './Root';
import Join from './pages/Join';
import Notfound from './pages/Notfound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Notfound />,
    children: [
      { index: true, path: '/', element: <Join /> },
      { path: '/chat', element: <Chat /> },
    ],
  },
]);
