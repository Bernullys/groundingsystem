import { useState } from "react"
import { NavLink } from "react-router-dom";
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
        if (resistivity > 0 && large > 0 && width > 0) {
            event.preventDefault(event);
            setResistance(Number((0.8*resistivity/(width*large)).toFixed(2)))
        } else {
            alert("Todos los valores deben ser mayor a cero.")
            setResistance("")
        }
    }

    return (
        <section id="buried_plates" className={styles.buried_plates_main_container}>
            <section className={styles.buried_plate_title_image_container}>
                <h2 className={styles.buried_plate_title}>Placa enterrada</h2>
                <img className={styles.buried_plate_image} src={buried_plate_image} alt="Buried plate" />
            </section>
            <section className={styles.buried_plate_form_main_container}>
                <form onSubmit={handleSubmit} className={styles.buried_plate_form}>
                    <div className={styles.buried_plate_form_label_inp_container}>
                        <label className={styles.buried_plate_form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                        <input className={styles.buried_plate_form_input} type="number" step="0.01" name="resistivity" id="resistivity" value={resistivity} onChange={handleResistivityChange}/>
                    </div>
                    <div className={styles.buried_plate_form_label_inp_container}>
                        <label className={styles.buried_plate_form_label} htmlFor="large">Largo [m]</label>
                        <input className={styles.buried_plate_form_input} type="number" step="0.01" id="large" value={large} onChange={handleLargeChange}/>
                    </div>
                    <div className={styles.buried_plate_form_label_inp_container}>
                        <label className={styles.buried_plate_form_label} htmlFor="width">Ancho [m]</label>
                        <input className={styles.buried_plate_form_input} type="number" step="0.01" id="width" value={width} onChange={handleWidthChange}/>
                    </div>
                    <div>
                        <button className={styles.buried_plate_form_button} type="submit">Calcular</button>
                    </div>
                </form>
                <h3>Resistencia de Puesta a Tierra: {resistance}</h3>
                <p type="button" className="back_button">
                    <NavLink to="/grounding_resistance_page">
                        Atras
                    </NavLink>
                </p>
            </section>
        </section>
    )
}

export default BuriedPlate