import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from '../context/UserProvider'

import { HomeRouter } from './HomeRouter'
import { LoginRouter } from './LoginRouter'

export const MainRouter = () => {
  return (
    <>
      <UserProvider>
        
        <Routes>
          <Route path="/*" element={<LoginRouter />} />
          <Route path="/home/*" element={<HomeRouter />} />
          

        </Routes>
      </UserProvider>
    </>
  )
}

