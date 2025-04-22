import HomePage from "./pages/HomePage"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequiredAuth } from "./pages/Layout";
import ListPage from "./pages/ListPage";
import SinglePage from "./pages/SinglePage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";
import NewPostPage from "./pages/NewPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders.js";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path:'/list',
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path:'/:id',
          element:<SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: "/verify-token",
          element: <VerifyOTP />
        }
      ]
    },
    {
      path: '/',
      element: <RequiredAuth />,
      children: [
        {
          path:'/profile',
          element:<ProfilePage />,
          loader: profilePageLoader
        },
        {
          path:'/profile/update',
          element:<ProfileUpdatePage />
        },
        {
          path:'/add',
          element:<NewPostPage />
        },
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router}/>
      <ToastContainer />
    </div>
  )
}

export default App;
