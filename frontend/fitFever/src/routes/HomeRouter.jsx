import { Route, Routes } from "react-router-dom"
import { NavBarHome } from "./NavBarHome"
import { PrivateRouter } from "./PrivateRouter"
import { StartPage } from "../pages/StartPage"
import { NutritionPage } from "../pages/NutritionPage"
import { RecipesPage } from "../pages/RecipesPage"
import { EntrenamientoPage } from "../pages/EntrenamientoPage"
export const HomeRouter = () => {
    return (
        <>
            <NavBarHome />
            <Routes>

                <Route element={<PrivateRouter />} >
                    <Route path="/home" element={<StartPage />} />
                    <Route path="/recetas" element={<RecipesPage />} />
                    <Route path="/nutricion" element={<NutritionPage />} />
                    <Route path="/entrenamiento" element={<EntrenamientoPage />} />
                    <Route path="/*" element={<StartPage />} />
                </Route>

            </Routes>

        </>
    )
}

