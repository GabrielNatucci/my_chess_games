import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ChessGame from './pages/chess_game/ChessGame';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login_page/login_page';
import RegisterPage from './pages/register_page/register_page';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/game",
        element: <ChessGame debug_mode={false} />,
    },
    {
        path: "/register",
        element: <RegisterPage />
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
