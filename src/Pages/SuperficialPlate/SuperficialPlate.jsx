import { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "../StylesToAllResistanceCal.module.css"

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
        if (resistivity > 0 && large > 0 && width > 0) {
            event.preventDefault()
            setResistance(Number((1.6*resistivity/(large*width)).toFixed(2)))
        } else {
            alert("Todos los valores deben ser mayor a cero.")
            setResistance("")
        }
    }

    return (
        <section className={styles.main_container}>
            <section className={styles.title_image_container}>
                <h2 className={styles.title}>Placa de Puesta a Tierra Superficial</h2>
                <img className={styles.image} src={grounding_plate_image} alt="Placa de puesta a tierra" />
            </section>
            <section className={styles.form_main_container}>
                <form className={styles.form} onSubmit={resistanceValue}>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label}htmlFor="">Resistividad</label>
                        <input className={styles.form_input} id="resistivity_id" type="number" step="0.01" value={resistivity} onChange={handleResistivity}/>
                    </div>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label} htmlFor="">Largo</label>
                        <input className={styles.form_input} id="large_id" type="number" step="0.01" value={large} onChange={handleLarge}/>
                    </div>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label} htmlFor="">Ancho</label>
                        <input className={styles.form_input} id="width_id" type="number" step="0.01" value={width} onChange={handleWidth}/>
                    </div>                    <div>
                        <button className={styles.form_button} type="submit">Calcular</button>
                    </div>
                </form>
                <h3>Resistencia de Puesta a Tierra [Ohm]: {resistance}</h3>
                <p type="button" className="back_button">
                    <NavLink to="/grounding_resistance_page">
                        Atras
                    </NavLink>
                </p>
            </section>

        </section>
    )
}

export default SuperficialPlate