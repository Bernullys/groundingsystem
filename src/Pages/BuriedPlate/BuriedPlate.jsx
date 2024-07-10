import { useState } from "react"
import styles from "./BuriedPlate.module.css"

//Images//
import buried_plate_image from "../../assets/Images/placa_puesta_a_tierra.png"


function BuriedPlate () {

    const [resistivity, setResistivity] = useState();
    const [large, setLarge] = useState();
    const [width, setWidth] = useState();
    const [resistance, setResistance] = useState();



    const handleResistivityChange = (event) => {
        setResistivity(event.target.value);
    }

    const handleLargeChange = (event) => {
        setLarge(event.target.value);
    }

    const handleWidthChange = (event) => {
        setWidth(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(event);
        setResistance(0.8*resistivity/(width*large))
    }

    return (
        <section id="buried_plates" className={styles.buried_plates_main_container}>
            <section className={styles.buried_plate_title_image_container}>
                <h2>Placa enterrada</h2>
                <img src={buried_plate_image} alt="Buried plate" />
            </section>
            <section>
                <form onSubmit={handleSubmit} className={styles.buried_plate_form}>
                    <label htmlFor="resistivity">Resistividad</label>
                    <input type="number" name="resistivity" id="resistivity" placeholder="Resistividad en metros" value={resistivity} onChange={handleResistivityChange}/>
                    <label htmlFor="large">Largo</label>
                    <input type="number" id="large" placeholder="Largo de la placa en metros" value={large} onChange={handleLargeChange}/>
                    <label htmlFor="width">Ancho</label>
                    <input type="number" id="width" placeholder="Ancho de la placa en metros" value={width} onChange={handleWidthChange}/>
                    <button type="submit">Calcular</button>
                    <h3>Resistencia de Puesta a Tierra: {resistance}</h3>
                </form>
            </section>
        </section>
    )
}

export default BuriedPlate