import { useState } from "react"
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
        event.preventDefault()
        setResistance((resistivity/large).toFixed(2))
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
                        <input className={styles.grounding_rod_form_inp} type="number" id="resistivity" value={resistivity} onChange={handleResistivity} />
                    </div>
                    <div className={styles.grounding_rod_form_label_inp_container}>
                        <label className={styles.grounding_rod_form_label}  htmlFor="large">Largo [m]</label>
                        <input  className={styles.grounding_rod_form_inp}type="number" id="large" value={large} onChange={handleLarge}/>
                    </div>
                    <div>
                        <button  className={styles.grounding_rod_form_button}  type="submit">Calcular</button>
                    </div>
                </form>
                <p  className={styles.grounding_rod_result_paragraph} >La Resistencia de Puesta a Tierra es: {resistance} [Ohmios]</p>
            </section>
        </section>
    )
}

export default GroundingRod