import React from 'react'
import { useRoutes } from 'react-router-dom'
import PrivateRoute from '@/components/private-route'
import Login from '@/views/login/index'
import NoMatch from '@/views/exception/404'
import MainEntry from '@/views/main'
import HomeIndex from '@/views/index'

export function MainRoutes() {
  const _Login = <PrivateRoute element={Login} meta={{
    title: '登录'
  }} />

  const elements = useRoutes([
    {
      path: '/',
      element: _Login
    },
    {
      path: '/login',
      element: _Login
    },
    {
      path: '/home',
      element: <MainEntry />,
      children: [
        {
          path: 'index',
          element: <PrivateRoute element={HomeIndex} meta={{
            requiresAuth: true,
            title: '后台首页'
          }} />,
        },
        {
          path: '*',
          element: <PrivateRoute element={NoMatch} meta={{
            requiresAuth: false,
            title: '404 Not Found'
          }} />
        },
      ]
    },
    {
      path: '*',
      element: <PrivateRoute element={NoMatch} meta={{
        requiresAuth: false,
        title: '404 Not Found'
      }} />
    },
  ])

  return elements
}
