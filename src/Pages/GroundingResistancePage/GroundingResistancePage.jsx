import { NavLink } from "react-router-dom"
import styles from "./GroundingResistancePage.module.css"

function GroundingResistancePage () {
    return (
        <section id="grounding_resistance_page">
            <h1>Diferentes maneras de calcular el valor de resistencia de puesta a tierra</h1>
            <ul>
                <li>
                    <NavLink to="/grounding_resistance_page/buried_plates">Placa enterrada</NavLink>
                </li>
                <li>
                    <NavLink to="/grounding_resistance_page/superficial_plates">Placa superficial</NavLink>
                </li>
                <li>
                    <NavLink to="/grounding_resistance_page/grounding_rod">Barra vertical</NavLink>
                </li>
                <li>
                    <NavLink to="/grounding_resistance_page/horizontal_grounding_conductor">Conductor enterrado horizontalmente</NavLink>
                </li>
                <li>
                    <NavLink to="/grounding_resistance_page/laurent_niemann_grid">Malla - Laurent + Niemann</NavLink>
                </li>
                <li>
                    <NavLink to="/grounding_resistance_page/sverak_grid">Malla - Sverak</NavLink>
                </li>
                <li>
                    <NavLink to="/grounding_resistance_page/schwarz_grid" >Malla - Schwarz</NavLink>
                </li>
            </ul>
            <nav>

            </nav>
        </section>
    )
}

export default GroundingResistancePage