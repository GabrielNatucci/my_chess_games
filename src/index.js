import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ChessGame from './pages/chess_game';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home_page/home_page';

const router = createBrowserRouter([
    {
        path: "/game",
        element: <ChessGame debug_mode={false} />,
    },
    {
        path: "/",
        element: <HomePage />,
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
