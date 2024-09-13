import { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "./GroundingRod.module.css"

import groundRod from "../../assets/Images/barra_puesta_a_tierra.png"

function GroundingRod () {

    const[resistivity, setResistivity] = useState()
    const[large, setLarge] = useState()
    const[resistance, setResistance] = useState()

    const handleResistivity = (event) => {
        setResistivity(event.target.value)
    }

    const handleLarge = (event) => {
        setLarge(event.target.value)
    }

    const resistanceValue = (event) => {
        if( resistivity > 0 && large > 0) {
            event.preventDefault()
            setResistance(Number((resistivity/large).toFixed(2)))
        } else {
            alert("Todos los valores deben ser mayor a cero.")
            setResistance("")
        }
    }

    return (
        <section className={styles.grounding_rod_main_container}>
            <section className={styles.grounding_rod_title_image}>
                <h2 className={styles.grounding_rod_title}>Barra de Puesta a Tierra</h2>
                <img className={styles.grounding_rod_image} src={groundRod} alt="Grounding Rod" />
            </section>
            <section className={styles.grounding_rod_form_main_container}>
                <form className={styles.grounding_rod_form_container} onSubmit={resistanceValue}>
                    <div className={styles.grounding_rod_form_label_inp_container}>
                        <label className={styles.grounding_rod_form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                        <input className={styles.grounding_rod_form_inp} type="number" step="0.01" id="resistivity" value={resistivity} onChange={handleResistivity} />
                    </div>
                    <div className={styles.grounding_rod_form_label_inp_container}>
                        <label className={styles.grounding_rod_form_label}  htmlFor="large">Largo [m]</label>
                        <input  className={styles.grounding_rod_form_inp} type="number" step="0.01" id="large" value={large} onChange={handleLarge}/>
                    </div>
                    <div>
                        <button  className={styles.grounding_rod_form_button}  type="submit">Calcular</button>
                    </div>
                </form>
                <p  className={styles.grounding_rod_result_paragraph} >La Resistencia de Puesta a Tierra es: {resistance} [Ohmios]</p>
                <p type="button" className="back_button">
                    <NavLink to="/grounding_resistance_page">
                        Atras
                    </NavLink>
                </p>
            </section>
        </section>
    )
}

export default GroundingRod