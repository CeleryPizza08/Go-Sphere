import React from 'react'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Create, About, Login, MarketPlace, Root, Error, Cart, Profile, Settings, PostList, Message, Info, BodyRoot, Edit, PostDetail } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'Create',
        element: <BodyRoot />,
        children: [
          { path: 'info', element: <Info /> },
          { path: 'plan/:postID', element: <Create /> },
          { path: 'plan/:postID/edit/:day', element: <Edit /> },
        ],
      },
      {
        path: 'marketplace',
        element: <BodyRoot />,
        children: [
          { path: '', element: <MarketPlace /> },
          { path: 'detail/:postID', element: <PostDetail /> },
        ],
      },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      { path: 'cart', element: <Cart /> },
      {
        path: 'profile',
        element: <BodyRoot />,
        children: [
          { path: '', element: <Profile /> },
          { path: 'settings', element: <Settings /> },
          { path: 'message', element: <Message /> },
          { path: 'postList', element: <PostList /> },
        ]
      },
    ],
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )

}

export default App;