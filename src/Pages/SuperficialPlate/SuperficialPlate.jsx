import { useState } from "react"
import styles from "./SuperficalPlate.module.css"

import grounding_plate_image from "../../assets/Images/placa_puesta_a_tierra_2.png"

function SuperficialPlate () {

    const [resistivity, setResistivity] = useState()
    const [large, setLarge] = useState()
    const [width, setWidth] = useState()
    const [resistance, setResistance] = useState()

    const handleResistivity = (event) => {
        setResistivity(event.target.value)
    }

    const handleLarge = (event) => {
        setLarge(event.target.value)
    }

    const handleWidth = (event) => {
        setWidth(event.target.value)
    }

    const resistanceValue = (event) => {
        event.preventDefault()
        setResistance(1.6*resistivity/(large*width))
    }

    return (
        <section className={styles.superficial_plates_main_container}>
            <section>
                <h2>Placa de Puesta a Tierra Superficial</h2>
                <img src={grounding_plate_image} alt="Placa de puesta a tierra" />
            </section>
            <section>
                <form onSubmit={resistanceValue}>
                    <div>
                        <label htmlFor="">Resistividad</label>
                        <input id="resistivity_id" type="number" value={resistivity} onChange={handleResistivity}/>
                    </div>
                    <div>
                        <label htmlFor="">Largo</label>
                        <input id="large_id" type="number" value={large} onChange={handleLarge}/>
                    </div>
                    <div>
                        <label htmlFor="">Ancho</label>
                        <input id="width_id" type="number" value={width} onChange={handleWidth}/>
                    </div>                    <div>
                        <button type="submit">Calcular</button>
                    </div>
                    <p>Resistencia de Puesta a Tierra: {resistance}</p>
                </form>
            </section>

        </section>
    )
}

export default SuperficialPlate