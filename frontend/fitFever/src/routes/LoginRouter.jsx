import { Route, Routes } from "react-router-dom"

import { NavBarLogin } from "./NavBarLogin"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { HomePage } from "../pages/HomePage"
import { PrivateRouterProfile } from "./PrivateRouter"
import { ProfilePage } from "../pages/ProfilePage"

export const LoginRouter = () => {
  return (
    <>

      <NavBarLogin />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/*" element={<HomePage />} />
        <Route element={<PrivateRouterProfile />} >
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>

  )
}

