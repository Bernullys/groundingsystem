import { useRoutes, HashRouter, useLocation } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import GroundingResistancePage from "./Pages/GroundingResistancePage/GroundingResistancePage"
import BuriedPlate from "./Pages/BuriedPlate/BuriedPlate"

const AppRoutes = () => {
  let routes = useRoutes ([
    { path: "/", element: <HomePage/>},
    { path: "/grounding_resistance_page", element: <GroundingResistancePage/> },
    { path: "/grounding_resistance_page/buried_plates", element: <BuriedPlate/> }
  ])
  return (
    <>
      { routes }
    </>
  )
}

function App() {

  return (

    <HashRouter>
      <AppRoutes />
    </HashRouter>
  )
}

export default App
