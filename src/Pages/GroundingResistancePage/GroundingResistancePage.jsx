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
                    <a href="">Placa superficial</a>
                </li>
                <li>
                    <a href="">Barra vertical</a>
                </li>
                <li>
                    <a href="">Conductor enterrado horizontalmente</a>
                </li>
                <li>
                    <a href="">Malla - Laurent + Niemann</a>
                </li>
                <li>
                    <a href="">Malla - Sverak</a>
                </li>
                <li>
                    <a href="">Malla - Schwarz</a>
                </li>
            </ul>
            <nav>

            </nav>
        </section>
    )
}

export default GroundingResistancePage