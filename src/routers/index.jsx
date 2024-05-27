import {createBrowserRouter } from "react-router-dom";
import Home from "../components/Home"
import Login from "../components/Login";
import Register from "../components/Register";
import Verification from "../components/Verification";
import Teknisi from "../components/Teknisi";
import Table from "../components/Table";
import Verificationadmin from "../components/Verificationadmin";



export const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home />
            },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/verification",
        element: <Verification />
    },
    {
        path: "/teknisi",
        element: <Teknisi />
    },
    {
        path: "/table",
        element: <Table />
    },
    {
        path: "/verificationadmin/:id",
        element: <Verificationadmin />
    }
])