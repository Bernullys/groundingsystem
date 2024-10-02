import { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "../StylesToAllResistanceCal.module.css"

import horizontalGroundConductor from "../../assets/Images/conductor_horizontal.png"

function HorizontalGroundingConductor () {

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
        event.preventDefault()
        if (resistivity > 0 && large > 0) {
            setResistance(Number((2*resistivity/large).toFixed(2)))
        } else {
            alert("Todos los valores deben ser mayor a cero.")
            setResistance("")
        }
    }

    return (
        <section className={styles.main_container}>
            <section className={styles.title_image_container}>
                <h2 className={styles.title}>Conductor desnudo enterrado horizontalmente</h2>
                <img className={styles.image} src={horizontalGroundConductor} alt="Grounding Rod" />
            </section>
            <section className={styles.form_main_container}>
                <form className={styles.form} onSubmit={resistanceValue}>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label} htmlFor="resistivity">Resistividad [Ohm*m]</label>
                        <input className={styles.form_input} type="number" step="0.01" id="resistivity" value={resistivity} onChange={handleResistivity} />
                    </div>
                    <div className={styles.form_label_inp_container}>
                        <label className={styles.form_label}  htmlFor="large">Largo [m]</label>
                        <input  className={styles.form_input} type="number" step="0.01" id="large" value={large} onChange={handleLarge}/>
                    </div>
                    <div>
                        <button  className={styles.form_button}  type="submit">Calcular</button>
                    </div>
                </form>
                <h3>La Resistencia de Puesta a Tierra es: {resistance} [Ohmios]</h3>
                <p type="button" className="back_button">
                    <NavLink to="/grounding_resistance_page">
                        Atras
                    </NavLink>
                </p>
            </section>
        </section>
    )
}

export default HorizontalGroundingConductor