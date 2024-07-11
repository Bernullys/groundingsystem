import { useRoutes, HashRouter, useLocation } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import GroundingResistancePage from "./Pages/GroundingResistancePage/GroundingResistancePage"
import BuriedPlate from "./Pages/BuriedPlate/BuriedPlate"
import SuperficialPlate from "./Pages/SuperficialPlate/SuperficialPlate"

const AppRoutes = () => {
  let routes = useRoutes ([
    { path: "/", element: <HomePage/>},
    { path: "/grounding_resistance_page", element: <GroundingResistancePage/> },
    { path: "/grounding_resistance_page/buried_plates", element: <BuriedPlate/> },
    { path: "/grounding_resistance_page/superficial_plates", element: <SuperficialPlate/>}
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
