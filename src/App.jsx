import { useRoutes, HashRouter, useLocation } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import GroundingResistancePage from "./Pages/GroundingResistancePage/GroundingResistancePage"
import BuriedPlate from "./Pages/BuriedPlate/BuriedPlate"
import SuperficialPlate from "./Pages/SuperficialPlate/SuperficialPlate"
import GroundingRod from "./Pages/GroundingRod/GroundingRod"
import HorizontalGroundingConductor from "./Pages/HorizontalGroundingConductor/HorizontalGroundingConductor"
import LaurentNiemann from "./Pages/LaurentNiemann/LaurentNiemann"
import Sverak from "./Pages/Sverak/Sverak"
import Schwarz from "./Pages/Schwarz/Schwarz"
import StepContactVoltage from "./Pages/StepContactVoltage/StepContactVoltage"

const AppRoutes = () => {
  let routes = useRoutes ([
    { path: "/", element: <HomePage/>},
    { path: "/grounding_resistance_page", element: <GroundingResistancePage/> },
    { path: "/grounding_resistance_page/buried_plates", element: <BuriedPlate/> },
    { path: "/grounding_resistance_page/superficial_plates", element: <SuperficialPlate/>},
    { path: "/grounding_resistance_page/grounding_rod", element: <GroundingRod/>},
    { path: "/grounding_resistance_page/horizontal_grounding_conductor", element: <HorizontalGroundingConductor/>},
    { path:"/grounding_resistance_page/laurent_niemann_grid", element:<LaurentNiemann/>},
    { path: "/grounding_resistance_page/sverak_grid", element:<Sverak/>},
    { path:"/grounding_resistance_page/schwarz_grid", element:<Schwarz/>},
    { path:"/step_contact_voltage_page", element: <StepContactVoltage/>}

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
