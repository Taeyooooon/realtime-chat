import { createBrowserRouter } from 'react-router-dom';
import Chat from './pages/Chat';
import Root from './Root';
import Join from './pages/Join';
import Notfound from './pages/Notfound';
import { io } from 'socket.io-client';

export const socket = io('ws://10.58.52.127:3000');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Notfound />,
    children: [
      { index: true, path: '/', element: <Join /> },
      { path: '/chat/:room', element: <Chat /> },
    ],
  },
]);
