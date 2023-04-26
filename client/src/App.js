import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

//importing components
import Username from "./components/Username"
import Password from "./components/Password"
import Register from "./components/Register"
import Profile from "./components/Profile"
import Recovery from "./components/Recovery"
import Reset from "./components/Reset"
import PageNotFound from "./components/PageNotFound"
import {Authorize,PasswordRoute} from './middleware/auth.js'

const router=createBrowserRouter([
  {
    path: '/',
    element : <Username></Username>
  },
  {
    path: '/register',
    element : <Register></Register>
  },
  {
    path: '/password',
    element : <PasswordRoute><Password/></PasswordRoute>
  },
  {
    path: '/profile',
    element : <Authorize><Profile/></Authorize>
  },
  {
    path: '/recovery',
    element : <Recovery></Recovery>
  },
  {
    path: '/reset',
    element : <Reset></Reset>
  },
  {
    path: '/*',
    element : <PageNotFound></PageNotFound>
  },
])

function App() {
  return (
    <main>
      <RouterProvider router={router} ></RouterProvider>
    </main>
  );
}

export default App;
